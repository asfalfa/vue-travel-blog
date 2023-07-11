import dbConnect from "../../../services/dbConnect";
import { NextResponse } from 'next/server';
import User from '../../../models/User';
const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashAsync(req) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.password, salt, async function(err, hash) {
                await User.create({
                    email: req.email,
                    password: hash,
                })
            });
        });
    })
}

function compareAsync(req, db) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(req, db, function(err, res) {
            if (err) {
                 reject(err);
            } else {
                 resolve(res);
            }
        });
    });
}

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
        const user = await User.findOne({ email: email });
        const compare = await compareAsync(request.password, user.password);

        console.log(compare);

        return NextResponse.json({ success: compare }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false }, { status: 400 })
    }
}

export async function PUT(req: Request) {
    const request = await req.json();
    const email = request.email;
    try {
        let user = await User.findOne({ email: email });
        if(!user){
            let hash = hashAsync(request);
            console.log(hash)
            return NextResponse.json({ success: true }, { status: 200 })
        } else{
            return NextResponse.json({ success: false, data: 'This email is already in use.' }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 })
    }
}