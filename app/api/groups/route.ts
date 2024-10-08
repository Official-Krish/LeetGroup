export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
  try {
    const email = req.nextUrl.searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: { email: email },
        },
      },
      include : {
        members: true
      }
    });

    return NextResponse.json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    return NextResponse.json({ error: "Failed to fetch groups" }, { status: 500 });
  }
};
