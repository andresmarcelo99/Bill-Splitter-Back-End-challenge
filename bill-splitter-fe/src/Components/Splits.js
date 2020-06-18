import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import NavBar from "./NavBar";

function Splits() {
  const [split_data, setData] = useState([]);
  const { user, getTokenSilently } = useAuth0();

  useEffect(() => {
    getTokenSilently().then((res) => {
      axios
        .get(`https://mg-bill-splitter-api.herokuapp.com/users/${user.name}`, {
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
              {console.log(data.split.replace(/[\[\] {} "]+/g, "").split(","))}
              <ul>
                {JSON.parse(data.split).map((split) => (
                  <li style={{ listStyle: "none" }} key={uuidv4()}>
                    {`${split.name}, `}
                    {split.item && `item: ${split.item}, `}
                    {`amount: ${split.amount}`}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Splits;
