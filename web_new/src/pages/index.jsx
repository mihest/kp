'use client'

import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import MapSection from "@/components/YMaps";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useEffect} from "react";

// const imageLoader = ({ src, width, quality }) => {
//     return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`
// }

const IndexPage = () => {
    useEffect(() => {
        const originalWarn = console.error;

        console.warn = (...args) => {
            return
        };

        return () => {
            // console.warn = originalWarn; // Восстанавливаем оригинальный console.warn при размонтировании компонента
        };
    }, []);

    return (
        <>
            <Head>
                <title>О гостинице</title>
            </Head>
            <Header />
            <main className="grid justify-center pt-[80px]">
                <div className="mt-[60px]">
                    <div className="bg-[url('/main-previe.jpeg')] h-[550px] w-[1300px] bg-cover bg-center flex flex-col rounded-[15px]">
                        <span className="text-white text-[40px] mt-[65px] ms-[85px] w-[550px]">
                            Комфортное проживание в<br />гостинице <b>Havenview Hotel</b>
                        </span>
                        <Link href="/booking" className="flex text-[20px] text-white justify-center items-center bg-[#71A1C2] w-[250px] h-[45px] rounded-[15px] mt-[228px] ms-[525px]">
                            Посмотреть номера
                        </Link>
                    </div>
                    <div className="bg-[#E2EFF9] w-[1300px] h-[100px] rounded-[15px] mt-[40px] flex items-center justify-between">
                        <div className="flex flex-col ms-[15px]">
                            <span className="text-[24px]">
                                Бронирование номера
                            </span>
                            <span className="text-[18px] text-[#A4A6A7]">
                                Гарантия на заселение
                            </span>
                        </div>
                        <div className="flex gap-[20px]">
                            <div className="bg-white rounded-[8px] flex justify-between w-[250px] h-[42px] items-center">
                                <div className="flex flex-col ms-[15px]">
                                    <span className="text-[#A4A6A7] text-[13px]">
                                        Заезд
                                    </span>
                                    <span className="text[16px]">
                                        24.08.2024
                                    </span>
                                </div>
                                <div className="me-[15px]">
                                    <Image
                                        src="/calendar.svg"
                                        alt="calendar ico"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                            </div>
                            <div className="bg-white rounded-[8px] flex justify-between w-[250px] h-[42px] items-center">
                                <div className="flex flex-col ms-[15px]">
                                    <span className="text-[#A4A6A7] text-[13px]">
                                        Заезд
                                    </span>
                                    <span className="text[16px]">
                                        24.08.2024
                                    </span>
                                </div>
                                <div className="me-[15px]">
                                    <Image
                                        src="/calendar.svg"
                                        alt="calendar ico"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                            </div>
                        </div>
                        <Link href="/booking" className="bg-[#2EC59B] w-[135px] h-[40px] rounded-[8px] flex justify-center items-center text-white me-[15px]">
                            Найти номер
                        </Link>
                    </div>
                </div>
                <div className="flex relative" id="about">
                    <div className="flex flex-col mt-[90px]">
                        <h1 className="text-[35px] font-bold text-[#2EC59B]">О гостинице</h1>
                        <span className="text-[20px] mt-[40px]">Современная гостиница «Havenview Hotel» распалагается<br />в Ижевске, рядом с ИжГТУ</span>
                        <div className="mt-[40px] flex flex-col">
                            <span className="text-[20px]">В гостинице есть все необходимые удобства:</span>
                            <div className="flex gap-x-[25px] mt-[20px]">
                                <div className="flex justify-center items-center bg-[#87b7d8] rounded-full w-[50px] h-[50px]" id="pre">
                                    <div className="bg-[url('/iron.png')] mt-2 w-[35px] h-[35px] bg-cover bg-center"></div>
                                </div>
                                <div className="flex justify-center items-center bg-[#87b7d8] rounded-full w-[50px] h-[50px]" id="pre">
                                    <div className="bg-[url('/washer.png')] w-[35px] h-[35px] bg-cover bg-center"></div>
                                </div>
                                <div className="flex justify-center items-center bg-[#87b7d8] rounded-full w-[50px] h-[50px]" id="pre">
                                    <div className="bg-[url('/parking.png')] w-[35px] h-[35px] bg-cover bg-center"></div>
                                </div>
                                <div className="flex justify-center items-center bg-[#87b7d8] rounded-full w-[50px] h-[50px]" id="pre">
                                    <div className="bg-[url('/fried-egg.png')] w-[35px] h-[35px] bg-cover bg-center"></div>
                                </div>
                                <div className="flex justify-center items-center bg-[#87b7d8] rounded-full w-[50px] h-[50px]" id="pre">
                                    <div className="bg-[url('/desk-bell.png')] w-[35px] h-[35px] bg-cover bg-center"></div>
                                </div>
                            </div>
                        </div>
                        <span className="text-[20px] mt-[40px]">
                            Гостиница расположена на территорие студенческого городка ИжГТУ
                        </span>
                        <div className="grid grid-cols-2 gap-x-[20px] gap-y-[30px] mt-[40px]">
                            <div className="flex items-center">
                                <div className="flex justify-center items-center bg-[url('/5f082d92-584d-4acc-9.png')] bg-cover w-[80px] h-[80px]">
                                    <div className="bg-[url('/swim.png')] mb-2 w-[30px] h-[30px] bg-cover"></div>
                                </div>
                                <span className="text-[20px]">5 минут пешком до бассейна ИжГТУ</span>
                            </div>
                            <div className="flex items-center">
                                <div className="flex justify-center items-center bg-[url('/5f082d92-584d-4acc-9.png')] bg-cover w-[80px] h-[80px]">
                                    <div className="bg-[url('/colledj.png')] mb-2 w-[30px] h-[30px] bg-cover"></div>
                                </div>
                                <span className="text-[20px]">3 минуты пешком до<br />главного корпуса ИжГТУ</span>
                            </div>
                            <div className="flex items-center">
                                <div className="flex justify-center items-center bg-[url('/5f082d92-584d-4acc-9.png')] bg-cover w-[80px] h-[80px]">
                                    <div className="bg-[url('/stadion.png')] mb-2 w-[30px] h-[30px] bg-cover"></div>
                                </div>
                                <span className="text-[20px]">5 минут пешком до стадиона<br />Буревестник</span>
                            </div>
                            <div className="flex items-center">
                                <div className="flex justify-center items-center bg-[url('/5f082d92-584d-4acc-9.png')] bg-cover w-[80px] h-[80px]">
                                    <div className="bg-[url('/water.png')] mb-2 w-[30px] h-[30px] bg-cover"></div>
                                </div>
                                <span className="text-[20px]">10 минут на машине<br />до набережной</span>
                            </div>
                            <div className="flex items-center">
                                <div className="flex justify-center items-center bg-[url('/5f082d92-584d-4acc-9.png')] bg-cover w-[80px] h-[80px]">
                                    <div className="bg-[url('/gorila.png')] mb-2 w-[30px] h-[30px] bg-cover"></div>
                                </div>
                                <span className="text-[20px]">8 минут на машине до<br />Ижевского зоопарка</span>
                            </div>
                            <div className="flex items-center">
                                <div className="flex justify-center items-center bg-[url('/5f082d92-584d-4acc-9.png')] bg-cover w-[80px] h-[80px]">
                                    <div className="bg-[url('/park.png')] mb-2 w-[30px] h-[30px] bg-cover"></div>
                                </div>
                                <span className="text-[20px]">10 минут на машине до<br />парка Кирова</span>
                            </div>
                        </div>
                    </div>
                    <Image
                        src="/Standart-2-krovati-Anfiada_Stranitsa_2.jpg"
                        alt="hostel number"
                        width={200}
                        height={250}
                        className="object-cover w-[200px] h-[250px] absolute top-[100px] left-[900px] rounded-[20px] shadow-2xl"
                    />
                    <Image
                        src="/caption.jpg"
                        alt="hostel"
                        width={300}
                        height={150}
                        className="object-cover w-[300px] h-[150px] absolute left-[750px] top-[380px] rounded-[20px] shadow-2xl"
                    />
                    <Image
                        src="/asdg.jpg"
                        alt="hostel"
                        width={150}
                        height={250}
                        className="object-cover w-[150px] h-[250px] absolute left-[1100px] top-[360px] rounded-[20px] shadow-2xl"
                    />
                    <Image
                        src="/img_03.jpg"
                        alt="hostel"
                        width={250}
                        height={250}
                        className="object-cover object-right w-[250px] h-[220px] absolute left-[830px] top-[560px] rounded-[20px] shadow-2xl"
                    />
                </div>
                <div className="flex justify-between mt-[50px]" id="contacts">
                    <div className="flex flex-col mt-[40px] gap-y-[15px]">
                        <h1 className="text-[35px] font-bold text-[#2EC59B]">Контакты</h1>
                        <span className="mt-[40px] text-[22px] flex">
                            <Image
                                src="/122efd72-952d-426f-a.png"
                                alt="phone"
                                width={35}
                                height={35}
                                className="me-[10px]"
                            />
                            <a href="tel:+79999999999">+7 (999) 999-99-99</a>
                        </span>
                        <span className="text-[22px] flex">
                            <Image
                                src="/icons8-telegram.svg"
                                alt="phone"
                                width={35}
                                height={35}
                                className="me-[10px] h-auto"
                            />
                            <a href="https://t.me/mihest" target="_blank">@mihest</a>
                        </span>
                        <span className="text-[22px] flex">
                            <Image
                                src="/arroba.png"
                                alt="phone"
                                width={35}
                                height={35}
                                className="me-[10px]"
                            />
                            <a href="maito:example@gmail.com">example@gmail.com</a>
                        </span>
                        <span className="text-[22px] flex">
                            <Image
                                src="/location.png"
                                alt="phone"
                                width={35}
                                height={35}
                                className="me-[10px]"
                            />
                            <a href="https://yandex.ru/maps/44/izhevsk/?from=api-maps&ll=53.176797%2C56.871851&mode=poi&origin=jsapi_2_1_79&poi%5Bpoint%5D=53.176906%2C56.871574&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1111448660&z=17" target="_blank">Ижевск, Студенческая, 48А</a>
                        </span>
                    </div>
                    <div className="w-[700px] h-[285px] mt-[40px]">
                        <MapSection />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default  IndexPage;