"use client"

import SliderC from "@/app/Components/Slider.jsx";
import img from "../../previe.jpg";
import Header from "@/app/components/Header";
import Calendar from "@/app/components/Calendar";
import DatePickerValue from "@/app/components/Calendar";
import {
    TEDropdown,
    TEDropdownToggle,
    TEDropdownMenu,
    TEDropdownItem,
    TERipple,
} from "tw-elements-react";

const images = [
    //{
    //    path: '../previe.jpg'
    //}
    // },
    {
        path: img
    },
    {
        path: img
    },
    {
        path: img
    },
    {
        path: img
    },
]
const RoomId = ({roomId}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
            <Header/>
            <div className="xl:max-w-5xl lg:max-w-3xl md:max-w-2xl sm:max-w-xl max-w-[70%] mx-auto py-8">
                <SliderC images={images} settings={settings} />
            </div>
            <div className="flex px-16">
                <div>
                    <div className="dark:text-gray-300">
                        <p className="dark:text-gray-200 text-2xl mb-5">Люкс, 3-комнатная</p>
                        <p>Погрузитесь в уют и комфорт в нашем просторном двухместном номере с потрясающим видом на окружающие горы.
                            Здесь вы найдете идеальное пристанище для уединенного отдыха в окружении величественной природы.
                            Этот номер создан для пары, желающей проникнуться романтикой и уединением, а также для индивидуального путешественника,
                            который ценит спокойствие и гармонию с собой и миром.</p>
                    </div>
                    <div className="dark:text-gray-300 mt-4">
                        <p className="dark:text-gray-200 text-2xl">В номере: </p>
                        <ul className="list-disc px-7">
                            <li>Вот это сервис!!!</li>
                            <li>Вот это сервис!!!</li>
                            <li>Вот это сервис!!!</li>
                            <li>Вот это сервис!!!</li>
                            <li>Вот это сервис!!!</li>
                            <li>Вот это сервис!!!</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <TEDropdown className="flex justify-center">
                        <TERipple rippleColor="light">
                            <TEDropdownToggle className="flex items-center whitespace-nowrap rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                Dropdown button
                            </TEDropdownToggle>
                        </TERipple>

                        <TEDropdownMenu>
                            <TEDropdownItem>
                                <Calendar/>
                            </TEDropdownItem>
                        </TEDropdownMenu>
                    </TEDropdown>
                </div>
            </div>

        </>
    )
}
export default RoomId;