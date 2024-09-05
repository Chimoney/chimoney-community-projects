import axios from "axios";
import { useEffect, useState } from "react";

// hook to fetch api
export default function useInfo() {

    const [data, setData] = useState([])
    const url = 'https://api.chimoney.io/v0.2/info/assets'


    useEffect(() => {
        async function fetchInfo() {
            axios.get(url, {
                headers: {
                    'accept': 'application/json',
                    'X_API_KEY': process.env.NEXT_PUBLIC_CHIMONEY_KEY
                }
            }).then((i) => (i.data)).then((d) => { setData(d) })
        }

        fetchInfo()

    }, [])

    return data
}