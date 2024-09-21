import Image from "next/image";
import Link from "next/link";


const Card = ({ room }) => {
    return (
        <>
            <Link href={"/booking/" + room.id} className="flex flex-col max-w-[360px] shadow-2xl">
                <Image src="/previe.jpg" width={360} height={203} alt="previe" />
                <div
                    className="p-4 border border-t-0  border-gray-600 bg-white "
                >
                    <span className="text-gray-800 text-[24px]">{room.title}</span>
                    <div>
                        <span className="text-green-500 dark:text-green-300 text-2xl">{room.price.toLocaleString('ru-RU')}</span>
                        <span className="text-gray-800 ">₽ / день</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 justify-between mt-2">
                        <div className="text-gray-500 text-[14px]">
                            <div>
                                <span>Площадь: </span>
                                <span>{room.square}</span>
                                <span> кв/м</span>
                            </div>
                            <div>
                                <span>Спальные места: </span>
                                <span>{room.sleeping_places}</span>
                            </div>
                        </div>
                        <div className="text-gray-500 text-[14px]">
                            <div>
                                <span>Кондиционер: </span>
                                <span>{room.conditioner ? 'есть' : 'нет'}</span>
                            </div>
                            <div>
                                <span>Wi-fi: </span>
                                <span>{room.wi_fi ? 'есть' : 'нет'}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </Link>
        </>
    )
}

export default Card;