import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';


export const GET = async (req : NextRequest) => {
    const { searchParams } = req.nextUrl;
    const groupId = searchParams.get('groupId'); 

    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    if (!groupId) {
        return NextResponse.json({ error: 'groupId is required' }, { status: 400 });
    }

    try {
        const pastWinners = await prisma.performance.findMany({
            where: {
                groupId: groupId,
                createdAt: {
                    gte: tenDaysAgo,
                },
            },
            orderBy: [
                {
                    createdAt: 'desc', 
                },
                {
                    solvedCount: 'desc', 
                },
            ],
            distinct: ['createdAt'], 
            include: {
                user: true,
            },
        });

        return NextResponse.json(pastWinners);
    } catch (error) {
        console.error('Error fetching past winners:', error);
        return NextResponse.json({ error: 'Failed to fetch past winners' }, { status: 500 });
    }
}
