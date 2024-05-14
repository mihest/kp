import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import {jwt} from './utils'

export const authOptions = {
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 1209600,
    },
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
                    const { data, status } = await axios.post('http://127.0.0.1:8000/api/auth/login', {
                        ...credentials
                    }, {
                        headers: {
                            Accept: 'application/json'
                        }
                    });

                    if (status !== 200) {
                        throw data.message;
                    }

                    if(!data?.access_token) {
                        throw data.message;
                    }

                    return { ...data.user, accessToken: data.access_token };
                } catch (e) {
                    if(e instanceof Response) {
                        return null
                    }
                    console.log(e)

                    // throw new Error('test');
                }
            }
        }),
        CredentialsProvider({
            id: 'register',
            name: 'register',
            credentials: {
                name: {
                    label: 'Name',
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
                    const { data, status } = await axios.post('http://127.0.0.1:8000/api/auth/register', {
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

                    return { ...data.user, accessToken: data.access_token };
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
        async jwt({ token, user, trigger, session }) {
            if(trigger === 'update'){
                if(session.type === 'MANUAL') {
                    const { data } = await axios.post('http://127.0.0.1:8000/api/auth/user', {}, {
                        headers: {
                            Accept: 'application/json',
                            Authorization: `Bearer ${token.accessToken}`
                        }
                    });
                    token.role = data.role;
                    return { ...token, ...data };
                }

                return { ...token, ...session };
            }

            if (user) {
                token.role = user.role;
                return { ...token, ...user };
            }
            const { exp: accessTokenExpires } = jwt.decode(token.accessToken);

            if(!accessTokenExpires) {
                return token;
            }

            const currentUnixTimestamp = Math.floor(Date.now() / 1000);
            const accessTokenHasExpired = currentUnixTimestamp > accessTokenExpires;

            if (accessTokenHasExpired) {
                return await refreshAccessToken(token);
            }

            return token;
        },
        async session({ session, token }) {
            if (token.error) {
                throw new Error('refresh');
            }

            session.accessToken = token.accessToken;
            session.user.name = token.name || '';
            session.user.email = token.email || '';
            session.user.role = token.role || ''

            return session;
        },
        // events: {
        //     async signOut({ token }) {
        //         await axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {
        //             headers: {
        //                 Accept: 'application/json',
        //                 Authorization: `Bearer ${token.accessToken}`
        //             }
        //         });
        //     }
        // }
    }
};

async function refreshAccessToken(token) {
    try {
        const { data, status } = await  axios.post('http://127.0.0.1:8000/api/auth/refresh', {}, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token.accessToken}`
            }
        });
        if (status !== 200) throw data.message;

        const { exp } = jwt.decode(data.access_token);

        return {
            ...token,
            accessToken: data.access_token,
            exp
        };
    } catch (e) {
        return {
            ...token,
            error: 'refresh'
        }
    }
}