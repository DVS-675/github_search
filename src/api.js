const userPerPage = 5;

export function getUser(login, page) {
  console.log(page);
  return fetch(
    `https://api.github.com/search/users?q=${login}&per_page=${userPerPage}&page=${page}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  ).then((response) => {
    console.log(response);
    return response.json();
  });
}
