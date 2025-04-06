const SendSmsMtsExolve = async ( sms , phoneNumber ) => {

  const apiUrl = 'https://api.exolve.ru/messaging/v1/SendSMS'
  const apiKey = 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJRV05sMENiTXY1SHZSV29CVUpkWjVNQURXSFVDS0NWODRlNGMzbEQtVHA0In0.eyJleHAiOjIwNTkyODUzODIsImlhdCI6MTc0MzkyNTM4MiwianRpIjoiNmM1YTVmYzAtOTIxNS00Y2EyLTliNjItMWFkMDEzYmU3ZjE5IiwiaXNzIjoiaHR0cHM6Ly9zc28uZXhvbHZlLnJ1L3JlYWxtcy9FeG9sdmUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNzQ4YWMyMmYtM2JiYi00Mzk1LWE0ZGUtYmJiOGVmMGQ0ZDJjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiMzU4M2FjOGYtY2YxNi00MDRjLWJhZWItOTczNDAyYTczYjkzIiwic2Vzc2lvbl9zdGF0ZSI6IjgyNDYwZWU1LTk5ZmItNDAzMi1hNDA5LTUzMWU1OTI3ZjAzMyIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1leG9sdmUiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJleG9sdmVfYXBwIHByb2ZpbGUgZW1haWwiLCJzaWQiOiI4MjQ2MGVlNS05OWZiLTQwMzItYTQwOS01MzFlNTkyN2YwMzMiLCJ1c2VyX3V1aWQiOiJmOWMzMmQwNC02NjMwLTRmNTUtOGQ5My1jYjk5OTkxZTdlOTkiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImNsaWVudElkIjoiMzU4M2FjOGYtY2YxNi00MDRjLWJhZWItOTczNDAyYTczYjkzIiwiY2xpZW50SG9zdCI6IjE3Mi4xNi4xNjEuMTkiLCJhcGlfa2V5Ijp0cnVlLCJhcGlmb25pY2Ffc2lkIjoiMzU4M2FjOGYtY2YxNi00MDRjLWJhZWItOTczNDAyYTczYjkzIiwiYmlsbGluZ19udW1iZXIiOiIxMzA5OTg3IiwiYXBpZm9uaWNhX3Rva2VuIjoiYXV0ZDdmOTYxNzgtYmNkZC00M2IyLTg3ZjMtZTEyYmZkNWJhODhjIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LTM1ODNhYzhmLWNmMTYtNDA0Yy1iYWViLTk3MzQwMmE3M2I5MyIsImN1c3RvbWVyX2lkIjoiMTE0NDkzIiwiY2xpZW50QWRkcmVzcyI6IjE3Mi4xNi4xNjEuMTkifQ.asBCoQGDdJNYynRPJ2R6Co3X4DC8OH1SYAYeB4wqraa2hfp5NuEXp6P924zv0kDmPDAcxSgbCBrcqI5sj6Kv2vag9CC5Jx9c4RjXWzcTzxATvCGb_B42-AUM8RHqIXIEsiSrfhVQ8cGm5sofNp1phmQavrWHW7cemNr1qDOAJS_RuZRH_-QLBG3DfN5VrSrCVZ-5cWHjPdWXU_k8fyCV3crJk5goxN012KyXnnZMQ0emL0Wnu-03reHMiXdFEI55LlaIa58ZEqfPsgOJhBxQBj-knv_yO4TbcXorCAm_p733vt3es8LNjpjHCeGDMZ_QvcQp14WFfco69MxkwScC2A'
  const data = {
    number: '79587379224',
    destination: phoneNumber,
    text: sms,
  };

  try {

    const response = await fetch( apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
      console.log(response.status);
    }

    const jsonResponse = await response.json();
    console.log('ok: ', JSON.stringify(jsonResponse));

  } catch (error) {
    console.error(error);
  }
  };

export default SendSmsMtsExolve;
