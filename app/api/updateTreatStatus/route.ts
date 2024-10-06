import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, hasTreated } = data;

        if (!id || hasTreated === undefined) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        const updatedPerformance = await prisma.performance.update({
            where: { id },
            data: { hasTreated },
        });

        return NextResponse.json({ success: true, updatedPerformance }, { status: 200 });
    } catch (error) {
        console.error('Error updating treat status:', error);
        return NextResponse.json({ error: 'Error updating treat status' }, { status: 500 });
    }
}
