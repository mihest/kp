'use client'

import Header from "@/app/components/Header";
import SliderC from "@/app/components/Slider";
import Calendar from "@/app/components/Calendar";
import {MenuButton, MenuItems, Menu, MenuItem} from "@headlessui/react";
import Dropdown from "@/app/components/Dropdown";
import {useState} from "react";
import dayjs from "dayjs";

const images = [
    {
        path: '/previe.jpg'
    },
    {
        path: '/previe.jpg'
    },
    {
        path: '/previe.jpg'
    },
    {
        path: '/previe.jpg'
    },
    {
        path: '/previe.jpg'
    },
    {
        path: '/previe.jpg'
    }
]

const RoomId = ({ room: data }) => {
    const [value_from, setValue_from] = useState(dayjs(new Date()));
    const [value_to, setValue_to] = useState(dayjs(new Date()).add(1, 'day'));

    const changeValue = (newValue) => {
        setValue_from(newValue);

        if(value_to.isBefore(newValue) || value_to.isSame(newValue)) {
            setValue_to(newValue.add(1, 'day'));
        }
    }

    const submitReservation = () => {
        console.log({
            date_from: dayjs(value_from).format('DD-MM-YYYY').toString(),
            date_to: dayjs(value_to).format('DD-MM-YYYY').toString()
        })
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
            <div className="lg:px-32 text-gray-300 md:px-24 sm:px-16 px-12">
                <div className="md:max-w-5xl mx-auto py-8">
                    <SliderC images={images} settings={settings}></SliderC>
                </div>
                <div className="flex max-lg:flex-wrap justify-center lg:justify-between gap-x-20 gap-y-8">
                    <div className="flex flex-col">
                        <span className="text-[25px] md:text-[30px] text-gray-800 dark:text-gray-200">{ data.title }</span>
                        <div className="flex flex-col mt-3">
                                <span className="text-gray-500 dark:text-gray-400 flex-wrap">
                                    { data.description }
                                </span>
                        </div>
                    </div>
                    <div>
                        <div className="border dark:border-gray-600 p-3 rounded-lg">
                            <div className="flex items-center justify-center gap-4 border-b pb-1 dark:border-gray-600">
                                <div className="bg-gray-700 dark:bg-gray-600 h-[2px] w-[3rem]"></div>
                                <span className="text-gray-700 dark:text-gray-300 text-[14px] md:text-[18px]">БРОНИРОВАНИЕ</span>
                                <div className="bg-gray-700 dark:bg-gray-600 h-[2px] w-[3rem]"></div>
                            </div>
                            <div className="flex justify-around mt-2 border-b pb-1 dark:border-gray-600">
                                <div className="flex flex-col">
                                    <Calendar
                                        align="right-center"
                                        value={value_from}
                                        setValue={changeValue}
                                        minDate={dayjs(new Date())}
                                    >
                                        <label htmlFor="date_from" className="text-gray-700 dark:text-gray-300 text-center">Дата заезда</label>
                                    </Calendar>
                                </div>
                                <div className="border-l border-gray-600"></div>
                                <div className="flex flex-col">
                                    <Calendar
                                        align="left-center"
                                        value={value_to}
                                        setValue={setValue_to}
                                        minDate={dayjs(value_from.add(1, 'day'))}
                                    >
                                        <span className="text-gray-700 dark:text-gray-300 text-center">Дата выезда</span>
                                    </Calendar>
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-2">
                                <button className="text-gray-700 dark:text-gray-300 bg-gray-600" onClick={submitReservation}>ЗАБРОНИРОВАТЬ</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <span className="text-[18px] sm:text-[22px]">В номере:</span>
                        <ul className="ps-8">

                            {JSON.parse(data.amenities).map((item) => (
                                <li className="list-disc text-gray-500 dark:text-gray-400 font-[Inter]" key={item}>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}


export default RoomId;