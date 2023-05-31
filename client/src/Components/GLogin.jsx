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
