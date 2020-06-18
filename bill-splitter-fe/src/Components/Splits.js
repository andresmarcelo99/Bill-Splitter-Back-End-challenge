import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import axios from "axios";

import NavBar from "./NavBar";

function Splits() {
  const [split_data, setData] = useState([]);
  const { user, getTokenSilently } = useAuth0();

  useEffect(() => {
    getTokenSilently().then((res) => {
      axios
        .get(`http://localhost:5000/users/${user.name}`, {
          headers: { Authorization: `Bearer ${res}` },
        })
        .then((res) => {
          console.log(res.data);
          return setData([...res.data]);
        })
        .catch((err) => console.log(err));
    });
  }, []);

  return (
    <div>
      <NavBar typeOption={{ label: "Home", href: "/" }} />
      <div className="splits-list">
        <ul>
          {split_data.map((data) => (
            <li
              style={{ listStyle: "none", textAlign: "justify" }}
              key={data.id}
            >
              <span className="split-list-label">Split:</span>
              <p>
                {/* {data.split.map((k) => (
                  <li>k</li>
                ))} */}
                {data.split}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Splits;
