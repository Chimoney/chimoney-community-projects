const API_KEY = `${process.env.API_KEY}`

export const createAccount = async (name, email) => {
    const response = await fetch('https://api.chimoney.io/v0.2/sub-account/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        },
        body: JSON.stringify({
            'name': name,
            'email': email
        })
    })

    const data = await response.json()
    return data
}