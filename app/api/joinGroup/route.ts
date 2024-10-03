import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    const { email, groupId }: { email: string; groupId: string } = await req.json();

    const group = await prisma.group.update({
        where: { groupId },
        data: {
          members: {
            connect: { email: email },
          },
        },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error('Failed to join group:', error);
    return NextResponse.json({ error: 'Failed to join group' }, { status: 500 });
  }
}

