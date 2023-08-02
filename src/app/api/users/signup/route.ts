import User from '@/models/userModel'
import { connect } from '@/dbConfig/dbConfig'

import { NextRequest , NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connect();

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const {username , email , password} = requestBody; 

        console.log(requestBody)

        // Check if user exists or not
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User already exists"} , {status: 400});
        }


        // Hash password
        const hashPassword = await bcryptjs.hash(password , await bcryptjs.genSalt(10));


        const newUser = new User({
            username,
            email,
            password: hashPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser)

        return NextResponse.json({
            message: "User Created Successfully",
            success: true,
            savedUser
        })
    } catch (error: any) {
        return NextResponse.json({error: error} , {status: 500});
    }
}   