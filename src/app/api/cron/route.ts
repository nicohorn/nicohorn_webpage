import { generateRssFeed } from '@/utils/generateEnglishRSSfeed';
import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    generateRssFeed();

    return Response.json({ success: true });
}