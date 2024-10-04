export const dynamic = 'force-dynamic';

import calculateDailyPerformance from '@/lib/dailyPerformance';
import { NextResponse } from 'next/server';

export const POST = async () => {
    try {
        await calculateDailyPerformance();
        return NextResponse.json({ message: 'Stats reloaded' });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
    }
};
