import configMTSExolve from "./config/ConfigMTSExolve";

const SendSmsMtsExolve = async ( sms , phoneNumber ) => {
  console.log('SendSmsMtsExolve');

  const data = {
    number: configMTSExolve.number,
    destination: phoneNumber,
    text: 'krypsy code ' + sms,
  };

  try {

    const responseMTS = await fetch( configMTSExolve.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': configMTSExolve.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!responseMTS.ok) {
      console.log(responseMTS.status);
      throw new Error('Network response was not ok');
    }

    const jsonResponse = await responseMTS.json();
    console.log('ok: ', JSON.stringify(jsonResponse));

  } catch (error) {
    console.error(error);
  }
  };

export default SendSmsMtsExolve;
