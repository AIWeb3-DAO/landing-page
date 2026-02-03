import { NextRequest, NextResponse } from 'next/server';
import { adminStorage } from '@/lib/fbAdmin';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
        return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    try {
        const bucket = adminStorage.bucket();
        const file = bucket.file(path);

        // Generate a signed URL that expires in 1 hour
        const [signedUrl] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 60 * 60 * 1000, // 1 hour
        });

        return NextResponse.redirect(signedUrl);
    } catch (error: any) {
        console.error('Audio proxy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
