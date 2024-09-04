export const API_KEY = `${import.meta.env.VITE_API_KEY}`

export const getBanks = async () => {
    const response = await fetch('https://api.chimoney.io/v0.2/info/country-banks?countryCode=NG', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        }
    })
    const data = await response.json()

    return data
}