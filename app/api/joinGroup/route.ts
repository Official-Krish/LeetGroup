import { fetchSolvedProblems } from '@/lib/dailyPerformance';
import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { email, groupId, leetCodeId }: { email: string; groupId: string, leetCodeId : string } = await req.json();

    const group = await prisma.group.update({
        where: { groupId },
        data: {
          members: {
            connect: { email: email },
          },
        },
    });

    const totalSolved = await fetchSolvedProblems(leetCodeId);

    await prisma.performance.create({
      data: {
        solvedCount: totalSolved,
        user: {
          connect: { email },
        },
        group: {
          connect: { groupId },
        },
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error('Failed to join group:', error);
    return NextResponse.json({ error: 'Failed to join group' }, { status: 500 });
  }
}

