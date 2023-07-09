import { remark } from 'remark';
import html from 'remark-html';
import { NextResponse } from 'next/server';
import dbConnect from "../../../services/dbConnect";
import Post from "../.././../models/Post";

export async function GET() {
  await dbConnect()
  try {
    const posts = await Post.find({}) /* find all the data in our database */
    return NextResponse.json({ success: true, data: posts }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function POST(req: Request) {
  const request = await req.json();
  const id = request.id;
  try {
    let post = await Post.findOne({ id: id }) /* find all the data in our database */
    const processedContent = await remark()
    .use(html)
    .process(post.content);
    const contentHtml = processedContent.toString();
    post.content = contentHtml;

    return NextResponse.json({ success: true, data: post }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}