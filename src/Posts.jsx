import axios from "axios";
import React, { useState, useEffect, useId, use } from "react";

let URL = "https://jsonplaceholder.typicode.com/posts";

export default function Posts() {
  let [data, setData] = useState([]);
  let [loading, setLOading] = useState(true);
  let [error, setError] = useState("");
  let [search, setSearch] = useState("");
  let [userIdFilter, setUserIdFilter] = useState("");
  const [titleFilterUser, setTitleFilterUser] = useState("");
  const [titleacedsc, settitleacedsc] = useState("");
  const [userIdeacedsc, setuserIdeacedsc] = useState("");
  async function getPosts() {
    try {
      let data = await axios.get(URL);
      setData(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLOading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  let filtering = data;

  if (search !== "") {
    filtering = data.filter((row) => {
      if (row.title.includes(search)) {
        return row;
      }
    });
  }

  if (titleFilterUser !== "") {
    filtering = data.filter((row) => {
      if (row.userId == titleFilterUser) {
        return row;
      }
    });
  }
  if (titleacedsc !== "") {
    if (titleacedsc === "asc") {
      filtering = [...data].sort((a, b) => a.title.localeCompare(b.title));
    } else if (titleacedsc === "des") {
      filtering = [...data].sort((a, b) => b.title.localeCompare(a.title));
    }
  }
  if (userIdeacedsc !== "") {
    filtering = [...data].sort((a, b) => {
      if (userIdeacedsc === "asc") {
        return typeof a.userId === "string" 
          ? a.userId.localeCompare(b.userId) 
          : a.userId - b.userId;
      } else if (userIdeacedsc === "des") {
        return typeof a.userId === "string" 
          ? b.userId.localeCompare(a.userId) 
          : b.userId - a.userId;
      }
    });
  }
  
  return (
    <>
      {loading ? (
        <div className="loading">
          <h1>Loading</h1>
        </div>
      ) : (
        <div style={{ marginTop: "100px" }}>
          <div className="filter">
            {/* <select
              value={userIdFilter}
              onChange={(e) => setUserIdFilter(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select> */}
            <div>
              <select
                name=""
                value={titleFilterUser}
                onChange={(e) => setTitleFilterUser(e.target.value)}
                id=""
              >
                <option value="">select your user id</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              <select
                value={titleacedsc}
                onChange={(e) => settitleacedsc(e.target.value)}
                name=""
                id=""
              >
                <option value="">Sort by Title</option>
                <option value="asc">ascending</option>
                <option value="des">descending</option>
              </select>
              <select
                value={userIdeacedsc}
                onChange={(e) => setuserIdeacedsc(e.target.value)}
                name=""
                id=""
              >
                <option value="">Sort by UserId</option>
                <option value="asc">ascending</option>
                <option value="des">descending</option>
              </select>
            </div>
            <hr style={{margin:"20px"}}/>
            <div className="searching">
              <label htmlFor="">Search by Title</label>
              <input
                type="text"
                placeholder="Search Post"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <h1>All post: {filtering.length}</h1>
          {filtering.length == 0 && <h1>No post found</h1>}
          {error && <h1>{error}</h1>}
          <div className="main">
            {filtering.map((row, i) => {
              return (
                <div key={i} className="box">
                  <h3>Title: {row.title}</h3>
                  <p>Body: {row.body}</p>
                  <h2>UserId: {row.userId}</h2>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
