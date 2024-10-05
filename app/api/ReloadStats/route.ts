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
                const updatedSolvedCount = await fetchSolvedProblems(member.leetcodeId); 

                // Fetch the previous performance to get the previous solvedCount
                const prevPerformance = await prisma.performance.findUnique({
                    where: {
                        userId_groupId: {
                            userId: member.id,
                            groupId: group.groupId,
                        },
                    },
                });

                const prevSolvedCount = prevPerformance ? prevPerformance.solvedCount : 0;

                // Calculate the difference
                const solvedDiff = updatedSolvedCount - prevSolvedCount;

                // Upsert (update if exists, otherwise create) the performance record with the new count and diff
                await prisma.performance.upsert({
                    where: {
                        userId_groupId: {
                            userId: member.id,
                            groupId: group.groupId, 
                        },
                    },
                    update: {
                        solvedCount: updatedSolvedCount, 
                        solvedDiff: solvedDiff,          
                        createdAt: new Date(),
                    },
                    create: {
                        userId: member.id,
                        groupId: group.groupId, 
                        solvedCount: updatedSolvedCount,
                        solvedDiff: solvedDiff,          
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
