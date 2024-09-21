import Axios from 'axios'

const headers = () => {}

export const axios = Axios.create({
    headers: {
        Accept: 'application/json'
    },
    withCredentials: true
})