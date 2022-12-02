import { baseRequestUrl } from "../constants";

async function getAuthorization(body) {
  const url = baseRequestUrl + 'auth/login';

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
  } else {
    return response.status;
  }
}

export default getAuthorization;