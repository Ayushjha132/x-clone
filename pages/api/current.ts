import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";


export default async function (req:NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET"){
        console.log("error form current");
        return res.status(405).end();
        
        
    }

    try {
        const { currentUser } = await serverAuth(req);
        return res.status(200).json(currentUser);
    } catch (error) {
        console.log("error form current catch");
        res.status(405).end();
    }
}