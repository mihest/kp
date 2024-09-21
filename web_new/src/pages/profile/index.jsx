"use client"

import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import secureLocalStorage from "react-secure-storage";
import Link from "next/link";

const ProfilePage = ({user, setUser}) => {
    const router = useRouter()

    return (
        <div className="pt-[80px]">
            <div className="header h-[30px] w-full flex justify-center gap-x-5">
                <Link href="/profile" className={`text-[16px] ${router.pathname === '/profile' ? 'border-b-2 border-[#2EC59B]' : ''}`}>Профиль</Link>
                <Link href={`profile/bookings ${router.pathname === '/profile' ? 'underline' : ''}`} className="text-[16px]">Бронирования</Link>
            </div>
        </div>
    )
}

export default ProfilePage;