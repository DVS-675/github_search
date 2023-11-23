const userPerPage = 5;
const token =
    "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";


export function getUser(login, page) {
  return fetch(
    `https://api.github.com/search/users?q=${login}&per_page=${userPerPage}&page=${page}`,
    {
      method: "GET",
        headers: {
            Authorization: token,
        },
    }
  ).then((response) => {
    return response.json();
  });
}

export function getUserRepos(user) {
    return fetch(
        `https://api.github.com/users/${user.login}/repos?&per_page=300`,
        {
            method: "GET",
            headers: {
               Authorization: token,
            },
        }
    ).then((response) => {
        return response.json();
    }).then(res => {
        let newUser
        newUser = {...user, repositories: res }
        return newUser
    })
}


