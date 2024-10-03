import { fetchSolvedProblems } from '@/lib/dailyPerformance';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, groupId, leetCodeId}: { name: string; email: string; groupId: string, leetCodeId : string } = await req.json();

    const group = await prisma.group.create({
      data: {
        name,
        groupId,
        members: {
          connect: { email: email },
        },
      },
    });

    const solvedCount = await fetchSolvedProblems(leetCodeId);
    await prisma.performance.create({
      data: {
        solvedCount,
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
    console.error('Failed to create group:', error);
    return NextResponse.json({ error: 'Failed to create group' }, { status: 500 });
  }
}
