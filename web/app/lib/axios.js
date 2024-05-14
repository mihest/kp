import Axios from 'axios'

// const headers = () => {
//     const res = {
//         'X-Requested-With': 'XMLHttpRequest',
//         Accept: 'application/json',
//     }
//     const token = localStorage.getItem('access-token');
//
//     if (token) {
//         res.Authorization = `Bearer ${token}`;
//     }
//     return res;
// }

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    }
})

export default axios