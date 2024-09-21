import './globals.css'
import { Inter } from "next/font/google";
import SessionProvider from "@/app/components/SessionProvider";
import {authOptions} from "@/app/lib/auth";
import Header from "@/app/components/Header";
import {getServerSession} from "next-auth";

export const metadata = {
    title: 'Курсач',
}

const inter = Inter({subsets: ['latin']})

export default async function RootLayout({children}) {
    // const session = await getServerSession(authOptions)
    return (
        <html lang="en" className="scroll-smooth">
            <body className={inter.className + ' min-h-screen'}>
                <SessionProvider>
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <div className="pt-[80px]">
                            {children}
                        </div>
                    </div>
                </SessionProvider>
            </body>
        </html>
    )
}
