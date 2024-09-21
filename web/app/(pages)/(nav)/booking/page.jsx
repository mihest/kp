import Card from "@/app/components/Card";
import Header from "@/app/components/Header";
import axios from "@/app/lib/axios";

const BookingPage = async () => {
    const { data } = await axios.get('http://localhost:8000/rooms');
    const rooms = data.rooms;
    return (
        <>
            <main className="">
                <div className="mt-[40px] grid grid-cols-4 gap-x-[29px] gap-y-[30px] max-w-[1500px] mx-auto">
                    {
                        rooms.map((room, index) => (
                            <Card key={index} room={room} />
                        ))
                    }
                </div>
            </main>
        </>
    )
}

export default BookingPage