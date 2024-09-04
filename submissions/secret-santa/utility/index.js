
const BaseUrl = 'https://api-v2-sandbox.chimoney.io/v0.2';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;


const globalOptions = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'X-API-KEY': API_KEY,
  },
};

export async function initiateChimoneyPayment(email, phone, valueInUSD) {
  const bodyData = {
    chimoneys: [{ email, phone, valueInUSD }],
  };

  const options = {
    ...globalOptions,
    body: JSON.stringify(bodyData),
  };

  try {
    const response = await fetch(`${BaseUrl}/payouts/chimoney`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function initiateMomoPayment(countryToSend, phoneNumber, valueInUSD, momoCode) {
  const bodyData = {
    momos: [
      {
        countryToSend,
        phoneNumber,
        valueInUSD,
        momoCode,
      }
    ],
  };

  const options = {
    ...globalOptions,
    body: JSON.stringify(bodyData),
  };

  try {
    const response = await fetch(`${BaseUrl}/payouts/mobile-money`, options);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    throw error;
  }
}


export async function verifyPayment(issueID) {
  const bodyData = { id: issueID };
  const options = {
    ...globalOptions,
    body: JSON.stringify(bodyData),
  };

  try {
    const response = await fetch(`${BaseUrl}/payment/verify`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}