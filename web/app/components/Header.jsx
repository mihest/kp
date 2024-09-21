'use client'

import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from "react";
import render from "react-dom"
import axios from "@/app/lib/axios";
// import secureLocalStorage from  "react-secure-storage";
import Dropdown from "@/app/components/Dropdown";
import {redirect, useRouter} from "next/navigation"
import img from  "/public/logo.png"
import {signIn, useSession} from "next-auth/react";

const Header = () => {
    const [openLoginModal, setLoginModal] = useState(false);
    const [openRegisterModal, setRegisterModal] = useState(false);
    const router = useRouter();
    const {data: session}  = useSession();
    useEffect(() => {
        if(openLoginModal || openRegisterModal) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [openLoginModal, openRegisterModal]);


    const handleLoginModal = () => {
        setLoginModal(!openLoginModal)
    }

    const handleRegisterModal = () => {
        setRegisterModal(!openRegisterModal)
    }





    async function handleLoginSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const credentials = Object.fromEntries(formData);

        signIn("credentials", {...credentials, redirect: false}).then((res) => {
            if (res?.error) {
                console.log(res.error)
            } else {
                router.refresh()
            }
        })
    }
    async function handleRegisterSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const credentials = Object.fromEntries(formData);

        signIn("register", {...credentials, redirect: false}).then((res) => {
            if (res?.error) {
                console.log(res.error)
            } else {
                router.refresh()
            }
        })
    }

        // const res = await axios.post('http://localhost:8000/auth/login', {
        //     ...credentials
        // })
        // console.log(res.data)
        // if(res.status === 200) {
        //     secureLocalStorage.setItem('user', res.data.user)
        //     if (typeof setUser === 'function') {
        //         setUser(res.data.user);
        //     }
        // }


    return (
        <>
            <header className="h-[80px] bg-white z-50 fixed mx-auto w-full">
                <div className="flex items-center justify-between mx-auto h-full min-w-[1900px] max-w-[1980px]">
                    <Link href="/">
                        <Image
                            src={img}
                            alt="logo"
                            width={41}
                            height={60}
                            className="ms-3"
                        />
                    </Link>
                    <div className="flex gap-x-[25px] text-[15px] text-black">
                        <Link href="/#about">
                            О гостинице
                        </Link>
                        <Link href="/booking">
                            Бронирование
                        </Link>
                        <span>
                            Спецпредложения
                        </span>
                        <Link href="/#contacts">
                            Контакты
                        </Link>
                    </div>
                    {!session ? (
                        <div className="flex gap-[25px] me-3 text-[15px] font-bold">
                            <div>
                                <button type='button' onClick={handleLoginModal}>
                                    Вход
                                </button>
                                {openLoginModal &&
                                    <>
                                        <div
                                            className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur"
                                            onClick={(e) => {
                                                if (e.target === e.currentTarget) {
                                                    handleLoginModal();
                                                }
                                            }}
                                        >
                                            <div className="relative w-auto min-w-[400px] my-6 mx-auto max-w-3xl">
                                                {/*content*/}
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                                                        <h3 className="text-3xl font-semibold">
                                                            Вход
                                                        </h3>
                                                        <button
                                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                            onClick={handleLoginModal}
                                                        >
                                                            <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                              x
                                                            </span>
                                                        </button>
                                                    </div>
                                                    {/*body*/}
                                                    <div className="relative p-6 pt-4 flex-auto">
                                                        <form onSubmit={handleLoginSubmit}>
                                                            <label
                                                                htmlFor="email"
                                                                className="flex flex-col"
                                                            >
                                                                <span className="text-gray-900 font-medium">
                                                                    Электронная почта
                                                                </span>
                                                                <input
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm leading-sm focus:outline-none focus:border-blue-500 mt-1"
                                                                    id="email"
                                                                    type="email"
                                                                    name="email"
                                                                    placeholder="example@company.com"
                                                                />
                                                            </label>
                                                            <label
                                                                htmlFor="password"
                                                                className="flex flex-col mt-4"
                                                            >
                                                                <span className="text-gray-900 font-medium">
                                                                    Пароль
                                                                </span>
                                                                <input
                                                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm leading-sm focus:outline-none focus:border-blue-500"
                                                                    id="password"
                                                                    type="password"
                                                                    name="password"
                                                                    placeholder="••••••••"
                                                                />
                                                            </label>
                                                            <div className="flex items-center justify-between gap-x-[50px] mt-4">
                                                                <div className="flex items-start">
                                                                    <div className="flex items-center h-5">
                                                                        <input id="remember" type="checkbox" className="w-4 h-4 rounded focus:ring-3 focus:ring-blue-300" />
                                                                    </div>
                                                                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 select-none">Запомнить меня</label>
                                                                </div>
                                                                <a href="#" className="text-sm font-medium text-blue-500 hover:underline">Забыли пароль?</a>
                                                            </div>
                                                            <button
                                                                className="w-full mt-4 bg-blue-500 text-white active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                                                                type="submit"
                                                            >
                                                                Войти
                                                            </button>
                                                        </form>
                                                        <div className="text-sm font-medium text-gray-500 mt-2">
                                                            Не зарегестрированы?
                                                            <button
                                                                onClick={() => {
                                                                    handleLoginModal();
                                                                    handleRegisterModal();
                                                                }}
                                                                className="text-blue-700 hover:underline dark:text-blue-500 ml-1"
                                                            >Создать аккаунт</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                }
                            </div>
                            <div>
                                <button type='button' onClick={handleRegisterModal}>
                                    Регистрация
                                </button>

                                {openRegisterModal &&
                                    <>
                                        <div
                                            className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur"
                                            onClick={(e) => {
                                                if (e.target === e.currentTarget) {
                                                    handleRegisterModal();
                                                }
                                            }}
                                        >
                                            <div className="relative w-auto min-w-[400px] my-6 mx-auto max-w-3xl">
                                                {/*content*/}
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                                                        <h3 className="text-3xl font-semibold">
                                                            Регистрация
                                                        </h3>
                                                        <button
                                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                            onClick={handleRegisterModal}
                                                        >
                                                            <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                              x
                                                            </span>
                                                        </button>
                                                    </div>
                                                    {/*body*/}
                                                    <div className="relative p-6 pt-4 flex-auto">
                                                        <form onSubmit={handleRegisterSubmit}>
                                                            <label
                                                                htmlFor="email"
                                                                className="flex flex-col"
                                                            >
                                                                <span className="text-gray-900 font-medium">
                                                                    Логин
                                                                </span>
                                                                <input
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm leading-sm focus:outline-none focus:border-blue-500 mt-1"
                                                                    id="login"
                                                                    type="text"
                                                                    placeholder="name"
                                                                />
                                                            </label>
                                                            <label
                                                                htmlFor="email"
                                                                className="flex flex-col mt-4"
                                                            >
                                                                <span className="text-gray-900 font-medium">
                                                                    Электронная почта
                                                                </span>
                                                                <input
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm leading-sm focus:outline-none focus:border-blue-500 mt-1"
                                                                    id="email"
                                                                    type="email"
                                                                    placeholder="example@company.com"
                                                                />
                                                            </label>
                                                            <label
                                                                htmlFor="password_reg"
                                                                className="flex flex-col mt-4"
                                                            >
                                                                <span className="text-gray-900 font-medium">
                                                                    Пароль
                                                                </span>
                                                                <input
                                                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm leading-sm focus:outline-none focus:border-blue-500"
                                                                    id="password_reg"
                                                                    type="password"
                                                                    placeholder="••••••••"
                                                                />
                                                            </label>
                                                            <label
                                                                htmlFor="password"
                                                                className="flex flex-col mt-4"
                                                            >
                                                                <span className="text-gray-900 font-medium">
                                                                    Повтор пароля
                                                                </span>
                                                                <input
                                                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm leading-sm focus:outline-none focus:border-blue-500"
                                                                    id="password"
                                                                    type="password"
                                                                    placeholder="••••••••"
                                                                />
                                                            </label>
                                                            <button
                                                                className="w-full mt-5 bg-blue-500 text-white active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                                                                type="submit"
                                                            >
                                                                Зарегестрироваться
                                                            </button>
                                                        </form>
                                                        <div className="text-sm font-medium text-gray-500 mt-2">
                                                            Есть аккаунт?
                                                            <button
                                                                onClick={() => {
                                                                    handleLoginModal();
                                                                    handleRegisterModal();
                                                                }}
                                                                className="text-blue-700 hover:underline dark:text-blue-500 ml-1"
                                                            >Вход</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                }
                            </div>
                        </div>
                    ) :(
                        <div className="ms-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {session.user.login}

                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href='/profile'>Профиль</Dropdown.Link>
                                    {session.user.role === 'admin' && (
                                        <Dropdown.Link href='/admin'>Админ панель</Dropdown.Link>
                                    )}

                                    <Dropdown.Link onClick={(e) => {
                                        e.preventDefault()
                                        router.push('/');
                                        axios.post('http://localhost:8000/auth/logout', {
                                            headers: {
                                                'Content-Type': 'application/json',
                                                withCredentials: true
                                            }
                                        })
                                        setLoginModal(false)
                                        setRegisterModal(false)
                                    }} href="/logout" >
                                            <span className="text-red-600 font-bold">
                                                Выход
                                            </span>
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    )}
                </div>
            </header>
        </>
    )
}

export default Header;

