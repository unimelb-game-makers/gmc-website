import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
        return new NextResponse("Missing url parameter", { status: 400 });
    }

    // Only allow fetching from Notion's S3 domains
    let parsedUrl: URL;
    try {
        parsedUrl = new URL(imageUrl);
    } catch {
        return new NextResponse("Invalid url parameter", { status: 400 });
    }

    const allowedHosts = [
        "prod-files-secure.s3.us-west-2.amazonaws.com",
        "s3.us-west-2.amazonaws.com",
        "www.notion.so",
        "notion.so",
        "file.notion.so",
    ];

    const isAllowed =
        allowedHosts.includes(parsedUrl.hostname) ||
        parsedUrl.hostname.endsWith(".notion.so") ||
        parsedUrl.hostname.endsWith(".s3.us-west-2.amazonaws.com") ||
        parsedUrl.hostname.endsWith(".amazonaws.com");

    if (!isAllowed) {
        return new NextResponse("Disallowed image host", { status: 403 });
    }

    try {
        const imageRes = await fetch(imageUrl, {
            cache: "force-cache",
        });

        if (!imageRes.ok) {
            return new NextResponse("Failed to fetch image from source", {
                status: imageRes.status,
            });
        }

        const contentType = imageRes.headers.get("content-type") ?? "image/jpeg";
        const imageBuffer = await imageRes.arrayBuffer();

        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                // Cache
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch {
        return new NextResponse("Error fetching image", { status: 500 });
    }
}
