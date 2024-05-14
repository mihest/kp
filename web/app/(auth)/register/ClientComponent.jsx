'use client'

import {signIn} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import {useState} from "react";

const Register = () => {

    const searchParams = useSearchParams();

    const router = useRouter();

    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        setError('')
        const formData = new FormData(event.currentTarget);
        const credentials = Object.fromEntries(formData);
        const callbackUrl = searchParams.get("callbackUrl") || "/";
        signIn("register", {...credentials, redirect: false}).then((res) => {
            if (res?.error) {
                setError(res.error);
            } else {
                router.push(callbackUrl);
            }
        });
    }

    return (
        <section className="flex-1 flex">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto flex-1 lg:py-0">
                <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                         alt="logo"
                    />
                    Hostel
                </Link>
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
                >
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Зарегистрируйтесь
                        </h1>

                        {error && (

                            <div className="text-red-600 list-item ms-5">
                                {error}
                            </div>

                        )}

                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Ваше имя
                                </label>
                                <input type="text" name="name" id="name"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="Ivan" required
                                       defaultValue="Danil"
                                />
                            </div>
                            <div>
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
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Пароль
                                </label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required
                                       defaultValue="legen2a777"
                                />
                            </div>
                            <div>
                                <label htmlFor="password_confirmation"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Подтвердите пароль
                                </label>
                                <input type="password" name="password_confirmation" id="password_confirmation" placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required
                                       defaultValue="legen2a777"
                                />
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Зарегистрериваться
                            </button>
                            <div className="text-sm font-light text-gray-500 dark:text-gray-400 flex items-center justify-between flex-wrap">
                                Уже есть учетная запись?
                                <Link href="/register"
                                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Войти
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Register;