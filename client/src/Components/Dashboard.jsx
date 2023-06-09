import axios from "axios";
import React, { useEffect, useState } from "react";
import { BackendUrl } from "../Utils/Contants";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [usersList, setUsersList] = useState([]);
  const [userDetail, setUserDetail] = useState({
    name: "",
    city: "",
    email: "",
  });
  const { token } = useSelector((store) => store);

  const getData = () => {
    try {
      let url = BackendUrl + "users";
      console.log("Network calling to url", url);
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("res:", res);
          setUsersList(res.data);
        })
        .catch((error) => {
          console.log("Error in getData:", error);
          let message = error.response?.data?.message;
          alert(message);
        });
    } catch (error) {
      console.log("Error in handleSubmit", error);
    }
  };

  const handleSubmit = () => {
    try {
      let url = BackendUrl + "users";
      console.log("Network calling to url", url);
      axios
        .post(url, userDetail, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("res:", res);
          setUserDetail({
            name: "",
            city: "",
            email: "",
          });
        })
        .catch((error) => {
          console.log("Error in handleSubmit:", error);
          let message = error.response?.data?.message;
          alert(message);
        });
    } catch (error) {
      console.log("Error in handleSubmit", error);
    }
    getData();
  };

  const handleChange = (event) => {
    setUserDetail({ ...userDetail, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="user_detail_form">
        <input
          onChange={handleChange}
          value={userDetail.email}
          type="email"
          name="email"
          placeholder="Email"
        />{" "}
        <input
          onChange={handleChange}
          value={userDetail.name}
          type="text"
          name="name"
          placeholder="Name"
          id=""
        />
        <input
          onChange={handleChange}
          value={userDetail.city}
          type="text"
          name="city"
          placeholder="City"
        />
        <button onClick={handleSubmit}>Add</button>
      </div>

      <div className="table_div">
        <table>
          <thead>
            <tr>
              <td>Email</td>
              <td>Name</td>
              <td>city</td>
            </tr>
          </thead>
          <tbody>
            {usersList.map((el, i) => (
              <tr key={i}>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
