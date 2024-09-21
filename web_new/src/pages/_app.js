'use server'

import "@/styles/globals.css";
import Header from "@/components/Header";
import SessionProvider from "@/components/SessionProvider";
import {authOptions} from "../../../web/app/lib/auth";
import {getServerSession} from "next-auth";

export default async function App({ Component, pageProps }) {
    const session = await getServerSession(authOptions)
    // const [user, setUser] = useState(null)
    // const [isLoading, setLoading] = useState(true)
    //
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             if (secureLocalStorage.getItem('user')) {
    //                 setUser(secureLocalStorage.getItem('user'));
    //
    //                 try {
    //                     let response = await axios.get('http://localhost:8000/auth/user', { withCredentials: true });
    //                     setUser(response.data);
    //                 } catch (e) {
    //                     if (e.response?.status === 401 && e.response.data.detail === 'Token has expired.') {
    //                         try {
    //                             await axios.post('http://localhost:8000/auth/refresh', {}, { withCredentials: true });
    //
    //                             let response = await axios.get('http://localhost:8000/auth/user', { withCredentials: true });
    //                             setUser(response.data);
    //                             console.log(response.data)
    //                             console.log(user)
    //                         } catch (error) {
    //                             console.error(error);
    //                             secureLocalStorage.removeItem('user');
    //                         }
    //                     } else if (e.response?.status === 401) {
    //                         secureLocalStorage.removeItem('user');
    //                     }
    //                 }
    //             }
    //         } catch (err) {
    //             console.error('An unexpected error occurred:', err);
    //         }
    //
    //         setLoading(false)
    //     };
    //
    //     fetchUser();
    // }, []);

    return (
        <>
            <SessionProvider session={session}>
                <Header />
                <Component {...pageProps} />
            </SessionProvider>
        </>
    );
}
