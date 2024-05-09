import Header from "@/app/components/Header";
import Link from "next/link";
import Image from 'next/image';
import img from "../previe.jpg";

const Rooms = () => {
    return (
        <>
            <Header/>
            <main className="mt-12">
                <div
                    className="lg:px-20 sm:px-12 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 justify-center sm:justify-start gap-10">
                    <Link href="/rooms/123" className="flex flex-col max-w-[360px]">
                        <Image src={img} alt="room"/>
                        <div
                            className="p-4 border border-t-0 dark:border-gray-600 border-gray-600 bg-white dark:bg-gray-800">
                            <span className="text-gray-800 dark:text-gray-300 text-[24px]">Люкс, 3-комнатная</span>
                            <div>
                                <span className="text-green-500 dark:text-green-300 text-2xl">12 000</span>
                                <span className="text-gray-800 dark:text-gray-300">₽ / день</span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 justify-between mt-2">
                                <div className="text-gray-500 dark:text-gray-400 text-[14px]">
                                    <div>
                                        <span>Площадь: </span>
                                        <span>16</span>
                                        <span> кв/м</span>
                                    </div>
                                    <div>
                                        <span>Спальные места: </span>
                                        <span>6</span>
                                    </div>
                                </div>
                                <div className="text-gray-500 dark:text-gray-400 text-[14px]">
                                    <div>
                                        <span>Кондиционер: </span>
                                        <span>есть</span>
                                    </div>
                                    <div>
                                        <span>Wi-fi: </span>
                                        <span>нет</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Link>
                    <Link href="#" className="flex flex-col max-w-[360px]">
                        <Image src={img} alt="room"/>
                        <div
                            className="p-4 border border-t-0 dark:border-gray-600 border-gray-600 bg-white dark:bg-gray-800">
                            <span className="text-gray-800 dark:text-gray-300 text-[24px]">Люкс, 3-комнатная</span>
                            <div>
                                <span className="text-green-500 dark:text-green-300 text-2xl">12 000</span>
                                <span className="text-gray-800 dark:text-gray-300">₽ / день</span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 justify-between mt-2">
                                <div className="text-gray-500 dark:text-gray-400 text-[14px]">
                                    <div>
                                        <span>Площадь: </span>
                                        <span>16</span>
                                        <span> кв/м</span>
                                    </div>
                                    <div>
                                        <span>Спальные места: </span>
                                        <span>6</span>
                                    </div>
                                </div>
                                <div className="text-gray-500 dark:text-gray-400 text-[14px]">
                                    <div>
                                        <span>Кондиционер: </span>
                                        <span>есть</span>
                                    </div>
                                    <div>
                                        <span>Wi-fi: </span>
                                        <span>нет</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Link>
                    <Link href="#" className="flex flex-col max-w-[360px]">
                        <Image src={img} alt="room"/>
                        <div
                            className="p-4 border border-t-0 dark:border-gray-600 border-gray-600 bg-white dark:bg-gray-800">
                            <span className="text-gray-800 dark:text-gray-300 text-[24px]">Люкс, 3-комнатная</span>
                            <div>
                                <span className="text-green-500 dark:text-green-300 text-2xl">12 000</span>
                                <span className="text-gray-800 dark:text-gray-300">₽ / день</span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 justify-between mt-2">
                                <div className="text-gray-500 dark:text-gray-400 text-[14px]">
                                    <div>
                                        <span>Площадь: </span>
                                        <span>16</span>
                                        <span> кв/м</span>
                                    </div>
                                    <div>
                                        <span>Спальные места: </span>
                                        <span>6</span>
                                    </div>
                                </div>
                                <div className="text-gray-500 dark:text-gray-400 text-[14px]">
                                    <div>
                                        <span>Кондиционер: </span>
                                        <span>есть</span>
                                    </div>
                                    <div>
                                        <span>Wi-fi: </span>
                                        <span>нет</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Link>
                    <Link href="#" className="flex flex-col max-w-[360px]">
                        <Image src={img} alt="room"/>
                        <div
                            className="p-4 border border-t-0 dark:border-gray-600 border-gray-600 bg-white dark:bg-gray-800">
                            <span className="text-gray-800 dark:text-gray-300 text-[24px]">Люкс, 3-комнатная</span>
                            <div>
                                <span className="text-green-500 dark:text-green-300 text-2xl">12 000</span>
                                <span className="text-gray-800 dark:text-gray-300">₽ / день</span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 justify-between mt-2">
                                <div className="text-gray-500 dark:text-gray-400 text-[14px]">
                                    <div>
                                        <span>Площадь: </span>
                                        <span>16</span>
                                        <span> кв/м</span>
                                    </div>
                                    <div>
                                        <span>Спальные места: </span>
                                        <span>6</span>
                                    </div>
                                </div>
                                <div className="text-gray-500 dark:text-gray-400 text-[14px]">
                                    <div>
                                        <span>Кондиционер: </span>
                                        <span>есть</span>
                                    </div>
                                    <div>
                                        <span>Wi-fi: </span>
                                        <span>нет</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Link>
                    <Link href="#" className="flex flex-col max-w-[360px]">
                        <Image src={img} alt="room"/>
                        <div
                            className="p-4 border border-t-0 dark:border-gray-600 border-gray-600 bg-white dark:bg-gray-800">
                            <span className="text-gray-800 dark:text-gray-300 text-[24px]">Люкс, 3-комнатная</span>
                            <div>
                                <span className="text-green-500 dark:text-green-300 text-2xl">12 000</span>
                                <span className="text-gray-800 dark:text-gray-300">₽ / день</span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 justify-between mt-2">
                                <div className="text-gray-500 dark:text-gray-400 text-[14px]">
                                    <div>
                                        <span>Площадь: </span>
                                        <span>16</span>
                                        <span> кв/м</span>
                                    </div>
                                    <div>
                                        <span>Спальные места: </span>
                                        <span>6</span>
                                    </div>
                                </div>
                                <div className="text-gray-500 dark:text-gray-400 text-[14px]">
                                    <div>
                                        <span>Кондиционер: </span>
                                        <span>есть</span>
                                    </div>
                                    <div>
                                        <span>Wi-fi: </span>
                                        <span>нет</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Link>
                </div>
            </main>
        </>
    );
}
export default Rooms;