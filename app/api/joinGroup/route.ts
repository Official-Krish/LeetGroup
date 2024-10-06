import { fetchSolvedProblems } from '@/lib/dailyPerformance';
import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { email, groupId, leetCodeId } = await req.json();
    
    if (!email || !groupId || !leetCodeId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const group = await prisma.group.update({
      where: { groupId },
      data: {
        members: {
          connect: { email },
        },
      },
    });

    let totalSolved;
    try {
      totalSolved = await fetchSolvedProblems(leetCodeId);
    } catch (fetchError) {
      console.error('Failed to fetch solved problems:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch solved problems' }, { status: 500 });
    }

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
