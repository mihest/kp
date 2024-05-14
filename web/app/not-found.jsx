import Link from 'next/link'

export const metadata = {
    title: 'Not Found',
}

export default function NotFound() {
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-red-600">404</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-gray-300">Not Found.</p>
                        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">К сожалению, мы не можем найти эту страницу. На главной странице вы найдете много интересного. </p>
                        <Link href="/" className="inline-flex text-gray-200 bg-red-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Вернуться на главную</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}