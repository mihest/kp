import Link from "next/link";
import Image from "next/image";


const Footer = () => {
    return (
        <footer className="mt-[100px] mb-[30px]">
            <div className="mx-auto border border-t-[1px] w-[1300px] border-gray-300"></div>
            <div className="flex justify-between w-[1300px] mx-auto mt-[30px]">
                <div className="flex flex-col gap-y-[10px]">
                    <Link href="#about">О гостинице</Link>
                    <Link href="/booking">Бронирование</Link>
                </div>
                <div className="flex flex-col items-center">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={41}
                            height={60}
                            className="ms-3"
                        />
                    </Link>
                    <span>Created by <a href="https://t.me/mihest" target="_blank" className="text-blue-500">@mihest</a> 2024</span>
                </div>
                <div className="flex flex-col gap-y-[10px]">
                    <span>Спецпредложения</span>
                    <Link href="#contacts">Контакты</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;