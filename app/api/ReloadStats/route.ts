export const dynamic = 'force-dynamic';
import { fetchSolvedProblems, fetchStriverDetails } from '@/lib/dailyPerformance';
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
                const updateStriverDetails = await fetchStriverDetails(member.striver_id || ""); 

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
                        SDE : updateStriverDetails.sheet_sde,
                        AtoZ : updateStriverDetails.sheet_a2z,
                        sheet_79 : updateStriverDetails.sheet_79
                    },
                    create: {
                        userId: member.id,
                        groupId: group.groupId, 
                        solvedCount: updatedSolvedCount,
                        solvedDiff: solvedDiff,  
                        SDE : updateStriverDetails.sheet_sde,
                        AtoZ : updateStriverDetails.sheet_a2z,
                        sheet_79 : updateStriverDetails.sheet_79     
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
