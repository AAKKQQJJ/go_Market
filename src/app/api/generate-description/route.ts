'''
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 실제 API 키를 환경 변수로 설정해야 합니다.
});

export async function POST(req: NextRequest) {
  const { products } = await req.json();

  if (!products || products.length === 0) {
    return NextResponse.json({ error: '상품 목록이 비어있습니다.' }, { status: 400 });
  }

  try {
    const productNames = products.map((p: any) => p.name).join(', ');
    const prompt = `다음 상품들을 판매하는 점포의 소개글을 작성해주세요: ${productNames}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    const description = response.choices[0].message.content?.trim();

    return NextResponse.json({ description });
  } catch (error) {
    console.error('OpenAI API 호출 오류:', error);
    return NextResponse.json({ error: '소개글 생성에 실패했습니다.' }, { status: 500 });
  }
}
'''