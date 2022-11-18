
async function getAuthorization(body) {
  const url = 'http://localhost:8080/auth/login';

  console.log(body);

  const response = await fetch(url, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(body)
  });

  if (response.status == 200) {
    return response.json();
  }
}

export default getAuthorization;