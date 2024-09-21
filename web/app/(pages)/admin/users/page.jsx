import ClientComponent from "@/app/(pages)/admin/users/ClientComponent";
import axios from "axios";
import {getServerSession} from "next-auth";
import {getSession} from "next-auth/react";
import {getToken} from "next-auth/jwt";

const getData = async ({req, res}) => {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET});
    console.log(session)
}

const Users = async () => {
    const users = await getServerSession()
    return (
        <>
            <ClientComponent users={users} />
        </>
    );
}

export default Users;