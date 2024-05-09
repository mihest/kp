import Link from "next/link";
import NavLink from "@/app/components/NavLink";

const navItems = [

    {
        title: 'О нас',
        path: '/dashboard'
    },
    {
        title: 'Номера',
        path: '/rooms'
    },
    {
        title: 'Ресторан',
        path: '/restaurant'
    },
    {
        title: 'Контакты',
        path: '/login'
    },
    {
        title: 'Где нас найти',
        path: '/where',
    }
];

const Header = ({children}) => {
    return (
        <header
            className="flex justify-between w-full px-4 sm:px-6 lg:px-8 dark:bg-gray-800 h-16 items-center border-b dark:border-gray-700">
            <Link className="dark:text-gray-200" href="/">Logo</Link>
            <div className="hidden gap-8 sm:-my-px sm:flex">
                {navItems.map((cat) => {
                    return (
                        <NavLink key={cat.title} href={cat.path}>
                            {cat.title}
                        </NavLink>
                    );
                })}
            </div>
            <div>
                <span className="inline-flex rounded-md">
                    <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                    >
                        МАДИНА

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
            </div>
        </header>
    );
}

export default Header;