import React from "react";
import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../Utils/Contants";

const GLogin = () => {
  const responseGoogle = (response) => {
    console.log("response:", response);
    // Handle the response received from the server after successful authentication
    // For example, you can store the received token in local storage or use it for further API requests
  };

  return (
    <div className="google_login">
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GLogin;
