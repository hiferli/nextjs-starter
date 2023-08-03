import User from '@/models/userModel'
import { connect } from '@/dbConfig/dbConfig'

import { NextRequest , NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect();

export async function POST(request:NextRequest) {
    try {
        const requestBody = await request.json()
        const {email , password} = requestBody;
        
        console.log(requestBody);

        // Check if user exists or not
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User Doesn't Exists!"} , {status: 400});
        }

        const validPassword = await bcryptjs.compare(password , user.password);
        if(!validPassword){
            return NextResponse.json({error: "Incorrect Password"} , {status: 400});
        }

        // Create token data
        const tokenData = {
            id: user._id,
            usernama: user.username,
            email: user.email,
        }

        // Creating Token
        const token = await jwt.sign(tokenData , process.env.TOKEN_SECRET! , {expiresIn: "1d"});

        // Storing in user cookies
        const response = NextResponse.json({
            message: "Login Successful!",
            success: true,
        })

        response.cookies.set("token" , token , {
            httpOnly: true,
        })

        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message} , {status: 500});
    }
}