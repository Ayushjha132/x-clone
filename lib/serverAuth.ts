// import { getSession } from "next-auth/react";
// import prisma from "@/lib/prismadb";
// import { NextApiRequest } from "next";
//
// const serverAuth = async (req: NextApiRequest) => {
//
//     // getSession fetch from client side through cookies
//     // getServerSession fetch data from server regarding anything like permission, role, stored data
//     const session = await getSession({req});
//
//     if(!session?.user?.email){
//         throw new Error("Not signed in");
//     }
//
//     const currentUser = await prisma.user.findUnique({
//         where: {
//             email: session.user.email
//         }
//     });
//
//     if(!currentUser){
//         throw new Error("Not signed in");
//     }
//
//     return {currentUser};
// };
//
// export default serverAuth;

import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prismadb';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
        throw new Error('Not signed in');
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    if (!currentUser) {
        throw new Error('Not signed in');
    }

    return { currentUser };
};

export default serverAuth;