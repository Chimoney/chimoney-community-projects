import axios from "axios";
import { useEffect, useState } from "react";

export default function useInfo() {

    const [data, setData] = useState([])
const url='https://api.chimoney.io/v0.2/info/assets'

    useEffect(() => {
        async function fetchInfo() {
            axios.get(url,{headers:{
'accept':'application/json',
'X_API_KEY':'9b18b94a7bf32c7095327a2c38d261d89f0e07216a5fbe80a8cfd2a4036e16fc'
            }}).then((i) => (i.data)).then((d) => { setData(d) })
        }

        fetchInfo()

    },[])

    return data
}