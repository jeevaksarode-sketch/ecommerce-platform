import { NextResponse } from 'next/server';
import { prisma } from '../../../prisma/db';
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, image, category, stock } = body;
    
    const newProduct = await prisma.product.create({
      data: { name, description, price: parseFloat(price), image, category, stock: parseInt(stock) }
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}