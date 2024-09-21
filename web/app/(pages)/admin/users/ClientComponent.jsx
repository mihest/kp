'use client'

import {useState} from "react";
import Sidebar from "@/app/components/Sidebar";


const Users = ({ users }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
        </>
    );
}

export default Users;