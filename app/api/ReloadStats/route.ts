import calculateDailyPerformance from '@/lib/dailyPerformance';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
    try{
        await calculateDailyPerformance();
        return NextResponse.json({ message: 'Stats reloaded' });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
    }
};
