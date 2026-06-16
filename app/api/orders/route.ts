import { NextResponse } from 'next/server';
import { prisma } from '../../../prisma/db';
export async function GET() {
  try {
    const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, address, total, items } = body;

    const newOrder = await prisma.order.create({
      data: { customerName, address, total, items, status: "Processing" }
    });
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}