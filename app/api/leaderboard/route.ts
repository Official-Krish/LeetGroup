import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';


export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const groupId = searchParams.get('groupId'); 

  if (!groupId) {
    return NextResponse.json({ error: 'groupId is required' }, { status: 400 });
  }

  try {
    const groupPerformances = await prisma.performance.findMany({
      where: { groupId }, 
      orderBy: { solvedCount: 'desc' }, 
      include: {
        user: true,
        group: true,
      },
    });

    if (!groupPerformances.length) {
      return NextResponse.json({ error: 'No performances found for this group' }, { status: 404 });
    }

    return NextResponse.json(groupPerformances); 
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
};


