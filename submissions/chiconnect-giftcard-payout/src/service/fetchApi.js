export const API_KEY = `${import.meta.env.VITE_API_KEY}`

export const getGiftcards = async (countryCode) => {
    const response = await fetch(`https://api.chimoney.io/v0.2/info/assets?countryCode=${countryCode}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        }
    })
    return await response.json()
}