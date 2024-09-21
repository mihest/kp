'use client'

import {signOut, useSession} from "next-auth/react";
import axios from "axios";
import {useRouter} from "next/navigation";

const Profile = () => {
    const {data: session, update}  = useSession();

    const router = useRouter();

    const profileUpdate = async (event) => {
        try{
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const credentials = Object.fromEntries(formData);
            const { data } = await axios.patch('http://127.0.0.1:8000/api/auth/user', {
                ...credentials
            }, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${session.accessToken}`
                }
            });
            await update(data.data)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteProfile = async () => {
        try {
            await axios.delete('http://127.0.0.1:8000/api/auth/user', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${session.accessToken}`
                }
            })
            router.push('/')
            signOut();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="flex-1 flex flex-col justify-center items-center py-10 md:mx-12 sm:mx-8 mx-2">
            <div className="flex flex-col gap-4">
                <div className="dark:bg-gray-800 rounded-xl px-12 pt-10 pb-6">
                    <h1 className="dark:text-gray-200 mb-1">Редактирование информации</h1>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Обновите информацию профиля вашей учетной записи и адрес электронной почты.
                    </span>
                    <form className="mt-6" onSubmit={profileUpdate}>
                        <div>
                            <label htmlFor="name"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Ваше имя
                            </label>
                            <input type="text" name="name" id="name"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Ivan" required
                                   defaultValue={session.user.login}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Ваша почта
                            </label>
                            <input type="email" name="email" id="email"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="name@company.com" required
                                   defaultValue="legen2a208@gmail.com"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button type="submit"
                                    className="mt-5 w-25 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Сохранить
                            </button>
                        </div>
                    </form>
                </div>
                <div className="dark:bg-gray-800 rounded-xl px-12 pt-10 pb-6">
                    <h1 className="dark:text-gray-200 mb-1">Обновить пароль</h1>
                    <div className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                        Чтобы обеспечить безопасность, в вашей учетной записи используется длинный случайный пароль.
                    </div>
                    <form className="mt-6" onSubmit={profileUpdate}>

                        <div>
                            <label htmlFor="current_password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Текущий пароль
                            </label>
                            <input type="password" name="current_password" id="current_password" placeholder="••••••••"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Новый пароль
                            </label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password_confirmation"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Подтвердите новый пароль
                            </label>
                            <input type="password" name="password_confirmation" id="password_confirmation" placeholder="••••••••"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required
                            />
                        </div>

                        <div className="flex justify-center">
                            <button type="submit"
                                    className="mt-5 w-25 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Сохранить
                            </button>
                        </div>
                    </form>
                </div>
                <div className="dark:bg-gray-800 rounded-xl px-8 py-6">
                    <h1 className="dark:text-gray-200 mb-1">Удалить аккаунт</h1>
                    <div className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                        После удаления вашей учетной записи все ее ресурсы и данные будут удалены без возможности восстановления. Прежде чем удалять свою учетную запись, загрузите все данные или информацию, которую вы хотите сохранить.
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="mt-5 text-white bg-red-600 hover:bg-red-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-800"
                            onClick={deleteProfile}
                        >
                            Удалить аккаунт
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;