// import {axios} from "@/libs/axios";
// import SliderComponent from "@/components/SliderComponent";
// import Header from "@/components/Header";
// import Calendar from "@/components/Calendar";
// import {useState} from "react";
// import dayjs from "dayjs";
//
//
// const images = [
//     {
//         path: '/previe.jpg'
//     },
//     {
//         path: '/previe.jpg'
//     },
//     {
//         path: '/previe.jpg'
//     },
//     {
//         path: '/previe.jpg'
//     },
//     {
//         path: '/previe.jpg'
//     },
//     {
//         path: '/previe.jpg'
//     }
// ]
//
// // export async function getStaticPaths (){
// //     // Call an external API endpoint to get posts
// //     const rooms = await axios.get('http://localhost:8000/rooms').then(res => {return res.data.rooms});
// //
// //
// //     // Get the paths we want to pre-render based on posts
// //     const paths = rooms.map((room) => ({
// //         params: { id: room.id.toString() },
// //     }))
// //
// //     // We'll pre-render only these paths at build time.
// //     // { fallback: false } means other routes should 404.
// //     return { paths, fallback: false }
// // }
// //
//
// export async function getServerSideProps ({ params }) {
//
//     const room_id = params.id
//     try {
//         const url = 'http://localhost:8000/rooms/' + room_id.toString()
//         const { data } = await axios.get(url);
//         return {
//             props: {
//                 data
//             }
//         };
//     }
//     catch (e) {
//         if (e.status === 404) return { notFound: true }
//
//     }
// }
//
//
// const RoomPage = ({ data }) => {
//     const today = dayjs();
//     const { room, bookings } = data
//     console.log(bookings)
//
//     const datesExcludingStart = bookings.flatMap(({ date_from, date_to }) => {
//         const start = dayjs(date_from).add(1, 'day'); // Начинаем со следующего дня после date_from
//         const end = dayjs(date_to);
//         const dates = [];
//
//         let current = start;
//         while (current.isBefore(end, 'day') || current.isSame(end, 'day')) {
//             dates.push(current);
//             current = current.add(1, 'day');
//         }
//
//         return dates;
//     });
//
// // Получаем все даты, исключая конечную дату
//     const datesExcludingEnd = bookings.flatMap(({ date_from, date_to }) => {
//         const start = dayjs(date_from);
//         const end = dayjs(date_to).subtract(1, 'day'); // Заканчиваем днем перед date_to
//         const dates = [];
//
//         let current = start;
//         while (current.isBefore(end, 'day') || current.isSame(end, 'day')) {
//             dates.push(current);
//             current = current.add(1, 'day');
//         }
//
//         return dates;
//     });
//
//     let min_date = today;
//     for (const disabledDate of datesExcludingEnd) {
//         if (disabledDate.isAfter(today, 'day')) {
//             min_date = disabledDate;
//             break;
//         }
//     }
//     console.log(bookings)
//     console.log({'date': min_date})
//     // Если не нашли дату после сегодняшнего дня, используем сегодняшнюю дату
//     if (min_date.isAfter(today, 'day')) {
//         min_date = today;
//     }
//     console.log(min_date)
//
//     const [value_from, setValue_from] = useState(min_date);
//     const [value_to, setValue_to] = useState(min_date.add(1, 'day'));
//
//
//     function shouldDisableDateExcludingStart(date) {
//         return datesExcludingStart.some(disabledDate => date.isSame(disabledDate, 'day'));
//     }
//
//     function shouldDisableDateExcludingEnd(date) {
//         return datesExcludingEnd.some(disabledDate => date.isSame(disabledDate, 'day'));
//     }
//
//
//     const changeValue = (newValue) => {
//         setValue_from(newValue);
//
//         if(value_to.isBefore(newValue) || value_to.isSame(newValue)) {
//             setValue_to(newValue.add(1, 'day'));
//         }
//     }
//
//     const submitReservation = () => {
//         console.log({
//             date_from: dayjs(value_from).format('DD-MM-YYYY').toString(),
//             date_to: dayjs(value_to).format('DD-MM-YYYY').toString(),
//             room_id: room.id,
//             price: room.price
//         })
//     }
//
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 400,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//     };
//     return (
//         <>
//             <Header />
//             <div className="lg:px-32 text-gray-300 md:px-24 sm:px-16 px-12 pt-[80px]">
//                 <div className="md:max-w-5xl mx-auto py-8">
//                     <SliderComponent images={images} settings={settings}></SliderComponent>
//                 </div>
//                 <div className="flex max-lg:flex-wrap justify-center lg:justify-between gap-x-20 gap-y-8">
//                     <div className="flex flex-col">
//                         <span className="text-[25px] md:text-[30px] text-gray-800 dark:text-gray-200">{ room.title }</span>
//                         <div className="flex flex-col mt-3">
//                                 <span className="text-gray-500 dark:text-gray-400 flex-wrap">
//                                     { room.description }
//                                 </span>
//                         </div>
//                     </div>
//                     <div>
//                         <div className="border dark:border-gray-600 p-3 rounded-lg">
//                             <div className="flex items-center justify-center gap-4 border-b pb-1 dark:border-gray-600">
//                                 <div className="bg-gray-700 dark:bg-gray-600 h-[2px] w-[3rem]"></div>
//                                 <span className="text-gray-700 dark:text-gray-300 text-[14px] md:text-[18px]">БРОНИРОВАНИЕ</span>
//                                 <div className="bg-gray-700 dark:bg-gray-600 h-[2px] w-[3rem]"></div>
//                             </div>
//                             <div className="flex justify-around mt-2 border-b pb-1 dark:border-gray-600">
//                                 <div className="flex flex-col">
//                                     <Calendar
//                                         align="right-center"
//                                         value={value_from}
//                                         setValue={changeValue}
//                                         minDate={min_date}
//                                         shouldDisableDate={shouldDisableDateExcludingEnd}
//                                     >
//                                         <label htmlFor="date_from" className="text-gray-700 dark:text-gray-300 text-center">Дата заезда</label>
//                                     </Calendar>
//                                 </div>
//                                 <div className="border-l border-gray-600"></div>
//                                 <div className="flex flex-col">
//                                     <Calendar
//                                         align="left-center"
//                                         value={value_to}
//                                         setValue={setValue_to}
//                                         minDate={dayjs(value_from.add(1, 'day'))}
//                                         shouldDisableDate={shouldDisableDateExcludingStart}
//                                     >
//                                         <span className="text-gray-700 dark:text-gray-300 text-center">Дата выезда</span>
//                                     </Calendar>
//                                 </div>
//                             </div>
//                             <div className="flex justify-center items-center mt-2">
//                                 <button className="text-gray-700 dark:text-gray-300 bg-gray-600" onClick={submitReservation}>ЗАБРОНИРОВАТЬ</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <div>
//                         <span className="text-[18px] sm:text-[22px]">В номере:</span>
//                         <ul className="ps-8">
//
//                             {room.amenities.map((item) => (
//
//                                 <li className="list-disc text-gray-500 dark:text-gray-400 font-[Inter]" key={item}>
//                                     <span>{item}</span>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//
//         </>
//     )
// }
//
// export default RoomPage;
'use client'
import axios from "@/app/lib/axios";
import SliderComponent from "@/app/components/SliderComponent";
import Header from "@/app/components/Header";
import Calendar from "@/app/components/Calendar";
import {useState} from "react";
import dayjs from "dayjs";

const images = [
    { path: '/previe.jpg' },
    { path: '/previe.jpg' },
    { path: '/previe.jpg' },
    { path: '/previe.jpg' },
    { path: '/previe.jpg' },
    { path: '/previe.jpg' }
];

const RoomPage = ({ data }) => {
    const today = dayjs();
    const { room, bookings } = data

    const datesExcludingStart = bookings.flatMap(({ date_from, date_to }) => {
        const start = dayjs(date_from).add(1, 'day'); // Начинаем со следующего дня после date_from
        const end = dayjs(date_to);
        const dates = [];

        let current = start;
        while (current.isBefore(end, 'day') || current.isSame(end, 'day')) {
            dates.push(current);
            current = current.add(1, 'day');
        }

        return dates;
    });

    const datesExcludingEnd = bookings.flatMap(({ date_from, date_to }) => {
        const start = dayjs(date_from);
        const end = dayjs(date_to).subtract(1, 'day'); // Заканчиваем днем перед date_to
        const dates = [];

        let current = start;
        while (current.isBefore(end, 'day') || current.isSame(end, 'day')) {
            dates.push(current);
            current = current.add(1, 'day');
        }

        return dates;
    });

    datesExcludingStart.sort((a, b) => a.valueOf() - b.valueOf());

    let min_date = today;
    for (const disabledDate of datesExcludingEnd) {
        if (disabledDate.isAfter(today, 'day')) {
            min_date = disabledDate;
            break;
        }
    }
    if (min_date.isAfter(today, 'day')) {
        min_date = today;
    }

    const [value_from, setValue_from] = useState(min_date);
    const [value_to, setValue_to] = useState(min_date.add(1, 'day'));

    const value_from_plus_one_day = value_from.add(1, 'day');

    const closestAvailableDate = datesExcludingStart.find(disabledDate => {
        console.log(disabledDate)
        return disabledDate.isAfter(value_from_plus_one_day, 'day')
    });
    console.log(datesExcludingStart)

    const maxDate = closestAvailableDate || null;

    function shouldDisableDateExcludingEnd(date) {
        return datesExcludingEnd.some(disabledDate => date.isSame(disabledDate, 'day'));
    }

    console.log(closestAvailableDate)

    function shouldDisableDateExcludingStart(date) {
        // return date.isBefore(value_from_plus_one_day, 'day') || date.isAfter(maxDate, 'day')
        if (date.isBefore(value_from_plus_one_day, 'day') ||
            (maxDate && date.isSame(maxDate, 'day'))) {
            return true;
        }
        // Если есть ближайшая доступная дата, блокируем даты после нее
        if (maxDate && date.isAfter(maxDate, 'day')) {
            return true;
        }
        return false;
    }

    const changeValue = (newValue) => {
        setValue_from(newValue);

        if (value_to.isBefore(newValue) || value_to.isSame(newValue)) {
            setValue_to(newValue.add(1, 'day'));
        }
    };

    const submitReservation = () => {
        console.log({
            date_from: dayjs(value_from).format('DD-MM-YYYY').toString(),
            date_to: dayjs(value_to).format('DD-MM-YYYY').toString(),
            room_id: room.id,
            price: room.price
        });
    };

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
                    <SliderComponent images={images} settings={settings}></SliderComponent>
                </div>
                <div className="flex max-lg:flex-wrap justify-center lg:justify-between gap-x-20 gap-y-8">
                    <div className="flex flex-col">
                        <span className="text-[25px] md:text-[30px] text-gray-800 dark:text-gray-200">{room.title}</span>
                        <div className="flex flex-col mt-3">
                            <span className="text-gray-500 dark:text-gray-400 flex-wrap">
                                {room.description}
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
                                        minDate={min_date}
                                        shouldDisableDate={shouldDisableDateExcludingEnd}
                                        onChange={() => setValue_to(value_from.add(1, 'day'))}
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
                                        minDate={value_from_plus_one_day}
                                        shouldDisableDate={shouldDisableDateExcludingStart}
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
                            {room.amenities.map((item) => (
                                <li className="list-disc text-gray-500 dark:text-gray-400 font-[Inter]" key={item}>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RoomPage;
