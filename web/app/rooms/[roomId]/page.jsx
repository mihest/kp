// import SliderC from "@/app/Components/Slider.jsx";
// import Header from "@/app/components/Header";
// import Calendar from "@/app/components/Calendar";
// import {
//     TEDropdown,
//     TEDropdownToggle,
//     TEDropdownMenu,
//     TEDropdownItem,
//     TERipple,
// } from "tw-elements-react";
import axios from "axios";
import {notFound} from "next/navigation";
import ClientComponent from "@/app/rooms/[roomId]/ClientComponent";

const getData = async (id) => {
    try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/rooms/${id}`, {
            headers: {
                Accept: 'application/json'
            }
        })

        return data;
    } catch (e) {
        return notFound()
    }

}

const Page = async ({ params }) => {
    const data = await getData(params.roomId);

    return <ClientComponent room={data} />
}

export default Page;