
async function muralBackendCall(url, method, body) {
  const baseUrl = "http://localhost:8080/";
  const accessToken = sessionStorage.getItem('jwt');

  if (method === 'get') {
    const response = await fetch(baseUrl + url, {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      })
    });

    if (response.ok) {
      return response.json();
    }
  } else {
    const response = await fetch(baseUrl + url, {
      method: method,
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }),
      body: body
    });

    console.log(response);

    if (response.ok) {
      return response.json();
    }
  }
}

export default muralBackendCall;