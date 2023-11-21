import { useState } from "react";
import "./App.css";
import { getUser } from "./api";

function App() {
  const [login, setLogin] = useState("");
  const [users, setUsers] = useState();
  const [page, setPage] = useState(1);

  const incrementPage = () => {
    setPage((prev) => prev + 1);
    handleSearch();
  };

  const handleSearch = async () => {
    const responseData = await getUser(login, page);
    setUsers(responseData);
  };

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
        <div className="box">
          {users &&
            users.items.length &&
            users.items.map((item) => (
              <div className="box__user">
                <img
                  className="box__user_image"
                  src={item.avatar_url}
                  alt="avatar"
                />
                <div className="box__user_login">{item.login}</div>
              </div>
            ))}
        </div>
        <button onClick={incrementPage} className="button">
          Load more
        </button>
      </div>
    </div>
  );
}

export default App;
