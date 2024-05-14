'use client'

import {signIn} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";

const Login = () => {

    const searchParams = useSearchParams();

    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const credentials = Object.fromEntries(formData);
        const callbackUrl = searchParams.get("callbackUrl") || "/";
        signIn("credentials", {...credentials, redirect: false}).then((res) => {
            if (res?.error) {
                console.log(res.error)
            } else {
                router.replace(callbackUrl);
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
                            Войдите в свой аккаунт
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox"
                                               className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                               required=""/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                            Запомнить меня
                                        </label>
                                    </div>
                                </div>
                                <Link href="#"
                                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Забыли пароль?
                                </Link>
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Войти
                            </button>
                            <div className="text-sm font-light text-gray-500 dark:text-gray-400 flex items-center justify-between flex-wrap">
                                У вас еще нет учетной записи?
                                <Link href="/register"
                                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Зарегистрериваться
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login;