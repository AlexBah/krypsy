import configMTSExolve from "./config/ConfigMTSExolve";

const SendSmsMtsExolve = async ( sms , phoneNumber ) => {

  const data = {
    number: configMTSExolve.number,
    destination: phoneNumber,
    text: 'krypsy code ' + sms,
  };

  try {

    const response = await fetch( configMTSExolve.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': configMTSExolve.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log(response.status);
      throw new Error('Network response was not ok');
    }

    const jsonResponse = await response.json();
    console.log('ok: ', JSON.stringify(jsonResponse));

  } catch (error) {
    console.error(error);
  }
  };

export default SendSmsMtsExolve;
