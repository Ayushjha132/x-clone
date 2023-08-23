import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req:NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET"){
        console.log("error form current");
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req);
        return res.status(200).json(currentUser);
    } catch (error) {
        console.log(error, "error form current.ts");
        res.status(400).end();
    }
}