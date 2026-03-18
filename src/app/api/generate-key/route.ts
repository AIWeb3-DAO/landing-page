import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/fbAdmin";
import * as admin from "firebase-admin";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const idToken = authHeader.split("Bearer ")[1];
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const uid = decodedToken.uid;

        // Generate a new API Key
        const apiKey = "sk_sanctuary_" + crypto.randomBytes(24).toString("hex");

        // Save to User's Firestore Document
        await adminDb.collection("users").doc(uid).update({
            apiKey: apiKey,
            updatedAt: new Date()
        });

        return NextResponse.json({ success: true, apiKey });
    } catch (error: any) {
        console.error("Generate API Key Error:", error);
        return NextResponse.json({ error: "Failed to generate API Key" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const idToken = authHeader.split("Bearer ")[1];
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const uid = decodedToken.uid;

        // Remove the API Key
        await adminDb.collection("users").doc(uid).update({
            apiKey: admin.firestore.FieldValue.delete(),
            updatedAt: new Date()
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Delete API Key Error:", error);
        return NextResponse.json({ error: "Failed to delete API Key" }, { status: 500 });
    }
}
