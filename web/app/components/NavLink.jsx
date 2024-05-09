"use client"

import {usePathname} from "next/navigation";
import Link from "next/link";

const NavLink = ({children, href}) => {
    const router = usePathname();
    const style = router === href ? 'dark:text-gray-200 border-b dark:border-red-500' : 'dark:text-gray-300';
    return (
        <Link href={ href } className={style}>
            {children}
        </Link>
    );
}

export default NavLink;