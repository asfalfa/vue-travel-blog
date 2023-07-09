import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../services/dbConnect";
import Post from "../../.././../models/Post";

export async function GET() {
    await dbConnect()
    try {
        const posts = await Post.find({}) /* find all the data in our database */
        return NextResponse.json({ success: true, data: posts }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
}

export async function POST(req: NextRequest) {
    await dbConnect()
    const request = await req.json();
    console.log(request)
    try {
        const post = await Post.create(request) /* create a new model in the database */
        return NextResponse.json({ success: true, data: post }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, error: error , data: request}, { status: 400 })
    }
}