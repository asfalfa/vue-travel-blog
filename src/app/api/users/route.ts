import dbConnect from "../../../services/dbConnect";
import { NextResponse } from 'next/server';
import User from '../../../models/User';
const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function GET() {
    await dbConnect()
    try {
      const users = await User.find({}) /* find all the data in our database */
      return NextResponse.json({ success: true, data: users }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ success: false }, { status: 400 })
    }
}

export async function POST(req: Request) {
    const request = await req.json();
    const email = request.email;
    try {
        let user = await User.findOne({ email: email });
        bcrypt.compare(request.password, user.password, async function(err, result) {
            if(result == true){
                return NextResponse.json({ success: true, data: user.username }, { status: 200 })
            } else{
                return NextResponse.json({ success: false, data: 'Invalid password.' }, { status: 400 })
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
}

export async function PUT(req: Request) {
    const request = await req.json();
    const email = request.email;
    try {
        let post = await User.findOne({ email: email });
        if(!post){
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(request.password, salt, async function(err, hash) {
                    post = await User.create({
                        email: request.email,
                        password: hash,
                    })
                });
            });
            return NextResponse.json({ success: true, data: post }, { status: 200 })
        } else{
            return NextResponse.json({ success: false, data: 'This email is already in use.' }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
}