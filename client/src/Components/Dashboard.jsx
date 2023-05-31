import React, { useState } from "react";

export default function Dashboard() {
  const [usersList, setUsersList] = useState(["bala"]);
  return (
    <div>
      <div className="user_detail_form">
        <input type="email" name="email" placeholder="Email" />{" "}
        <input type="text" name="name" placeholder="Name" id="" />
        <input type="text" name="city" placeholder="City" />
        <button>Add</button>
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
        </table>
      </div>
    </div>
  );
}
