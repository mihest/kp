import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/app/lib/axios"
import {jwt} from '@/app/lib/utils'
import Cookie from "js-cookie";
import {log} from "next/dist/server/typescript/utils";

export const authOptions =  {
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },
            async authorize(credentials) {
                try {
                    const { data, status } = await axios.post('http://127.0.0.1:8000/auth/login', {
                        ...credentials
                    });

                    if (status !== 200) {
                        throw data.message;
                    }

                    if(!data?.token.access_token) {
                        throw data.message;
                    }

                    return {
                        ...data.user,
                        accessToken: data.token.access_token,
                        refreshToken: data.token.refresh_token
                    };
                } catch (e) {
                    console.log(e)
                    if(e instanceof Response) {
                        return null
                    }

                    // throw new Error('test');
                }
            }
        }),
        CredentialsProvider({
            id: 'register',
            name: 'register',
            credentials: {
                name: {
                    label: 'login',
                    type: 'text'
                },
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },
            async authorize(credentials) {
                try {
                    const { data, status } = await axios.post('http://127.0.0.1:8000/auth/register', {
                        ...credentials
                    }, {
                        headers: {
                            Accept: 'application/json'
                        }
                    });

                    if (status !== 200) {
                        return Promise.resolve(data.errors);
                    }

                    if(!data?.access_token) {
                        throw data.message;
                    }

                    return {
                        ...data.user,
                        accessToken: data.token.access_token,
                        refreshToken: data.token.refresh_token
                    };
                } catch (e) {
                    if(e instanceof Response) {
                        return null;
                    }
                    throw e.response.data
                    // throw new Error('test');
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user, trigger, session}) {
            console.log(token)
            if (trigger === 'update') {
                if (session.type === 'MANUAL') {
                    const {data} = await axios.post('http://127.0.0.1:8000/auth/user');
                    token.role = data.role;
                    return {...token, ...data};
                }

                return {...token, ...session};
            }

            if (user) {
                token.role = user.role;
                return {...token, ...user};
            }
            const {exp: accessTokenExpires} = jwt.decode((token.accessToken).slice(7));

            if (!accessTokenExpires) {
                return token;
            }

            const currentUnixTimestamp = Math.floor(Date.now() / 1000);
            const accessTokenHasExpired = currentUnixTimestamp > accessTokenExpires;

            if (accessTokenHasExpired) {
                const NewToken =  await refreshAccessToken(token);
                console.log(NewToken);
                return NewToken
            }

            return token;
        },
        async session({session, token}) {

            if (token.error) {
                throw new Error('refresh');
            }

            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.user.login = token.login || '';
            session.user.email = token.email || '';
            session.user.role = token.role || ''

            return session;
        },
        events: {
            async signOut({token}) {
                await axios.post('http://127.0.0.1:8000/auth/logout');
            }
        }
    }
};

async function refreshAccessToken(token) {
    console.log(token)
    try {
        const { data, status } = await axios.post('http://127.0.0.1:8000/auth/refresh', {
            refresh: token.refreshToken
        }, {
            withCredentials: true
        });
        if (status !== 200) throw data.message;

        const { exp } = jwt.decode((data.access_token).slice(7));
        token.refreshToken = data.refresh_token
        token.accessToken = data.access_token
        return {
            ...token,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            exp
        };
    } catch (e) {
        return {
            ...token,
            error: 'refresh'
        }
    }
}