import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import axios from "axios";

import NavBar from "./NavBar";

function Splits() {
  const [split_data, setData] = useState([]);
  const { user, getTokenSilently } = useAuth0();
  const [token, setToken] = useState(0);

  useEffect(() => {
    getTokenSilently().then((res) => {
      axios
        .get("http://localhost:5000/users/mark@gmail.com", {
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
      <div>
        {split_data.map((data) => (
          <li key={data.id}>Split: ${data.split}</li>
        ))}
      </div>
    </div>
  );
}

export default Splits;
