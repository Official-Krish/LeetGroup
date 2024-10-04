import { fetchSolvedProblems } from '@/lib/dailyPerformance';
import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';


export const POST = async (req: NextRequest) => {
  try {
    const { name, email, groupId, leetCodeId } = await req.json();
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      throw new Error('User does not exist');
    }

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
    return NextResponse.json('Failed to create group', { status: 500 });
  }
};
