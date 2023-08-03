import jwt from "jsonwebtoken";
import { NextResponse , NextRequest } from "next/server";

export async function getDataFromToken (request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || "";
        const data:any = jwt.verify(token , process.env.TOKEN_SECRET!); 
        return data.id;
    } catch (error: any) {
        return NextResponse.json({error: error.message});
    }
}