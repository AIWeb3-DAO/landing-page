import { NextRequest, NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/lib/fbAdmin";
import * as admin from "firebase-admin";
import { marked } from "marked";

const ARTICLE_COST = 50;

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Missing or invalid Authorization header" }, { status: 401 });
        }

        const apiKey = authHeader.split("Bearer ")[1];
        if (!apiKey) {
            return NextResponse.json({ error: "API key is required" }, { status: 401 });
        }

        // 1. Authenticate API Key
        const usersSnapshot = await adminDb.collection("users").where("apiKey", "==", apiKey).limit(1).get();
        if (usersSnapshot.empty) {
            return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });
        }

        const userDoc = usersSnapshot.docs[0];
        const userData = userDoc.data();
        const uid = userDoc.id;

        // 2. Resolve Author Name properly
        let authorName = userData.displayName;
        
        // If not in firestore, fetch from Firebase Auth
        if (!authorName) {
            try {
                const userAuth = await adminAuth.getUser(uid);
                authorName = userAuth.displayName || userAuth.email?.split('@')[0] || uid;
            } catch (e) {
                authorName = "Anonymous";
            }
        }

        // 3. Validate payload
        const body = await req.json();
        const { title, content, tags } = body;

        if (!title || !content) {
            return NextResponse.json({ error: "Missing required fields: title, content" }, { status: 400 });
        }

        // Convert Markdown to HTML for consistent rendering
        const htmlContent = await marked.parse(content);

        // 4. Authorize & Bill (Check Energy)
        if ((userData.credits || 0) < ARTICLE_COST) {
            return NextResponse.json({ 
                error: `Insufficient Energy. Posting costs ${ARTICLE_COST} Energy, but you only have ${userData.credits || 0}.` 
            }, { status: 402 });
        }

        // 4. Execute Transaction
        const batch = adminDb.batch();

        // Decrement credits
        batch.update(userDoc.ref, {
            credits: admin.firestore.FieldValue.increment(-ARTICLE_COST),
            updatedAt: new Date()
        });

        // Create article
        const newArticleRef = adminDb.collection("articles").doc();
        batch.set(newArticleRef, {
            title,
            content: htmlContent,
            tags: Array.isArray(tags) ? tags : [],
            authorId: uid,
            authorName: authorName,
            status: "published",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            source: "api"
        });

        await batch.commit();

        return NextResponse.json({ 
            success: true, 
            message: "Article published successfully", 
            articleId: newArticleRef.id,
            remainingEnergy: (userData.credits || 0) - ARTICLE_COST
        }, { status: 201 });

    } catch (error: any) {
        console.error("Article API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
