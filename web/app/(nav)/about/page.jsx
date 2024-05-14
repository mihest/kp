import Header from "@/app/components/Header";
import MyMap from "@/app/components/map";

export const metadata = {
    title: 'About',
}

const Dashboard = () => {
    return (
        <>
            <div>

                <div className="dark:text-gray-400 text-xl px-36">
                    <p>Бронирование номеров в гостинице <br/> <span className="font-bold text-2xl">Ижевск</span></p>
                    <p className="mb-7 mt-7 w-1/3">Вы можете забронировать номер круглосуточно, позвонив нам по телефону
                        или написав на электронную почту</p>

                    <p>Мы открыты <span className="font-bold">КРУГЛОСУТОЧНО!!!</span></p>

                    <div className="flex flex-col mt-7 gap-y-4">
                        <div>
                            <p>Студенческая улица, 46</p>
                        </div>
                        <div>
                            <a href="tel:+79508118499">+7(950)-811-84-99</a>
                        </div>
                        <div>
                            <a href="tel:+73412776055">+7(341)-277-60-55</a>
                        </div>
                        <div>
                            <a href="mailto:info@istu.ru">info@istu.ru</a>
                        </div>
                    </div>

                </div>
                <div>
                    <MyMap/>
                </div>
            </div>
        </>
    )
}
export default Dashboard;