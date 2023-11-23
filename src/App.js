import { useEffect, useState } from "react";
import "./App.css";
import { getUser, getUserRepos } from "./api";

function App() {
  const [login, setLogin] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(false);
  const [newUsers, setNewUsers] = useState([]);
  const [clickedCard, setClickedCard] = useState();
  const [searchQuery, setSearchQuery] = useState(1)

  const incrementPage = () => {
    setPage((prev) => prev + 1);
    setSearchQuery(prev => prev + 1)
  };

  const handleSearch = async () => {
    const responseData = await getUser(login, page);
    setUsers(responseData.items)
    setSearchQuery(prev => prev + 1)
  };

  const handleSort = () => {
    setSort(!sort);
    if (sort) {
      let sortUsers = users;
      sortUsers.sort(function (a, b) {
        return a.repositories.length - b.repositories.length;
      });
      setUsers(sortUsers);
    } else if (!sort) {
      let sortUsers = users;
      sortUsers.sort(function (a, b) {
        return b.repositories.length - a.repositories.length;
      });
      setUsers(sortUsers);
    }
  };
  const handleCardClick = (i) => {
    if (i !== clickedCard) {
      setClickedCard(i);
    } else if (i === clickedCard) {
      setClickedCard("");
    }
  };

  useEffect(() => {
    if (!users) return
    let currentUserArr = newUsers.length === 0 ? [...users] : [...newUsers]
    if (currentUserArr.length) {
      let requests = currentUserArr.map((user) => getUserRepos(user));
      Promise.all(requests).then((responses) => {
            setUsers(responses)
          }
      );
    }
  }, [searchQuery]);

  useEffect(() => {
    if (users.length) {
      getUser(login, page).then((res) => {
        setUsers([
          ...users,
          ...res.items.map((user) => {
            return { ...user, repositories: [] };
          }),
        ]);
        setSearchQuery(prev => prev + 1)
      });
    }
  }, [page]);


  return (
    <div className="App">
      <div className="main">
        <p className="main__title">Github users search</p>
        <div className="main__search">
          <input
            className="main__search_input"
            type="search"
            placeholder="login"
            onChange={(e) => setLogin(e.target.value)}
          />
          <button onClick={handleSearch} className="button">
            Search
          </button>
        </div>
        <div role="none" onClick={handleSort} className="search_sort">
          <p>sort by number of repositories</p>
          <img
            className={sort ? "search_sort_select" : "search_sort_select_rev"}
            src="/img/arrow.svg"
            alt="select"
          />
        </div>
        <div className="box">
          {users ? (
            users.map((item, i) => (
              <div>
                {clickedCard !== i ? (
                  <div onClick={() => handleCardClick(i)} className="box__user">
                    <img
                      className="box__user_image"
                      src={item.avatar_url}
                      alt="avatar"
                    />
                    {item.repositories?.length !== 0 && (
                      <div className="box__title">
                        {item.repositories?.length}
                      </div>
                    )}

                    <div className="box__user_login">{item.login}</div>
                  </div>
                ) : (
                  <div onClick={() => handleCardClick(i)} className="box__user">
                    <div className="box__user_login">{item.login}</div>
                    {item.repositories?.length !== 0 && (
                      <div className="box__title">
                        {`number of repos: ${item.repositories?.length}`}
                      </div>
                    )}
                  </div>
                )}

              </div>
            ))
          ) : (
            <div className="box__title">users not found</div>
          )}
        </div>
        <button onClick={incrementPage} className="button">
          Load more
        </button>
      </div>
    </div>
  );
}

export default App;
