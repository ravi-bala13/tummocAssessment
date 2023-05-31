import React from "react";
// import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../Utils/Contants";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setToken } from "../Redux/action";

const GLogin = () => {
  const dispatch = useDispatch();

  const responseGoogle = (response) => {
    console.log("response:", response);
    const clientId = response.clientId;
    console.log("credentialId:", clientId);

    dispatch(setToken("token"));
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
