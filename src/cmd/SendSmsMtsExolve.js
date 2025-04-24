import configMTSExolve from "./config/ConfigMTSExolve";

const SendSmsMtsExolve = async ( sms , phoneNumber ) => {
  console.log('SendSmsMtsExolve');

  const data = {
    number: configMTSExolve.number,
    destination: phoneNumber,
    text: 'krypsy code ' + sms,
  };
  console.log('1');

  try {
    console.log('2');

    const response = await fetch( configMTSExolve.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': configMTSExolve.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('3');
    if (!response.ok) {
      console.log(response.status);
      throw new Error('Network response was not ok');
    }

    console.log('4');
    const jsonResponse = await response.json();
    console.log('ok: ', JSON.stringify(jsonResponse));

  } catch (error) {
    console.log('5-1');
    console.error(error);
    console.log('5-2');
  }
  };

export default SendSmsMtsExolve;
