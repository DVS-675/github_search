const userPerPage = 5;
const token =
    "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";


export function getUser(login, page) {
  return fetch(
    `https://api.github.com/search/users?q=${login}&per_page=${userPerPage}&page=${page}`,
    {
      method: "GET",
        // headers: {
        //     Authorization: token,
        // },
    }
  ).then((response) => {
    return response.json();
  });
}

export function getUserRepos(login) {
    return fetch(
        `https://api.github.com/users/${login}/repos?&per_page=300`,
        {
            method: "GET",
            // headers: {
            //    Authorization: token,
            // },
        }
    ).then((response) => {
        return response.json();
    });
}


//  для информации о пользователе ${BASE_PATH}users/${userName}`
// export function getUserNew(login) {
//     return fetch(
//         `${API_PATH}?q=` +
//         encodeURIComponent(`${login} in:login sort:repositories`) +
//         "&per_page=100",
//         {
//             headers: {
//                 Authorization: token,
//             },
//         }
//     ).then((response) => {
//         console.log(response);
//         return response.json();
//     });
// }
