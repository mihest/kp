'use client'

import {useState} from "react";
import Sidebar from "@/app/components/Sidebar";


const Rooms = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
        </>
    );
}

export default Rooms;