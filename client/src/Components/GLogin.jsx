import React from "react";
// import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../Utils/Contants";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const GLogin = () => {
  const responseGoogle = (response) => {
    console.log("response:", response);
    const clientId = response.clientId;
    console.log("credentialId:", clientId);

    // const handleLogin = () => {
    axios
      .get("/auth/google", {
        params: {
          clientId: clientId,
        },
      })
      .then((response) => {
        // Handle the response from the backend
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any error that occurred during the request
        console.error(error);
      });
    // };
    // Handle the response received from the server after successful authentication
    // For example, you can store the received token in local storage or use it for further API requests
  };

  const handleGLogin = () => {
    // window.open("http//localhost:8080/auth/google", "_self");
    // window.location.href = "http://localhost:8080/auth/google";

    try {
      let url = "http://localhost:3000/auth/google/callback";
      console.log("Network calling to url", url);
      axios
        .get({
          url,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        })
        .then((res) => {
          console.log("res:", res);
        })
        .catch((error) => {
          console.log("error:", error);
        });
    } catch (error) {
      console.log("Error in handleSubmit", error);
    }
  };

  return (
    <div className="google_login">
      <GoogleLogin
        // clientId={GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        // cookiePolicy={"single_host_origin"}
      />
      {/* <button onClick={handleGLogin}></button> */}
    </div>
  );
};

export default GLogin;
