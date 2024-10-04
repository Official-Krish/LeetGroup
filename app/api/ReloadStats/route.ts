import calculateDailyPerformance from '@/lib/dailyPerformance';
import { NextRequest, NextResponse } from 'next/server';


export const POST = async (res : NextResponse, req : NextRequest) => {
    try{
        await calculateDailyPerformance();
        return NextResponse.json({ message: 'Stats reloaded' });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
    }
};
