export const dynamic = 'force-dynamic';
import { fetchSolvedProblems } from '@/lib/dailyPerformance';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export const POST = async () => {
    try {
        const groups = await prisma.group.findMany({
            include: {
                members: true,
            },
        });
        
        for (const group of groups) {
            for (const member of group.members) {
            const solvedCount = await fetchSolvedProblems(member.leetcodeId); 
        
            await prisma.performance.upsert({
                where: {
                userId_groupId: {
                    userId: member.id,
                    groupId: group.groupId, 
                },
                },
                update: {
                solvedCount: solvedCount,
                createdAt: new Date(),
                },
                create: {
                userId: member.id,
                groupId: group.groupId, 
                solvedCount: solvedCount,
                },
            });
            }
        }
        return NextResponse.json({ message: 'Stats reloaded' });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
    }
};
