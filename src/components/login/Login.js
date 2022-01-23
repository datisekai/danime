import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Title from "../../handle/Title";
import { useLoginStore } from "../global/User";
import {
  authentication,
  providerFacebook,
  providerGithub,
  providerGoogle,
} from "./Firebase";
import Loading from "../loading/Loading";
import swal from "sweetalert";

import "./login.css";
import LoadingLogin from "../loading/LoadingLogin";
const Login = () => {
  const navigate = useNavigate();
  const setUser = useLoginStore((state) => state.setUser);
  const user = useLoginStore(state => state.user)
  const load = useLoginStore(state => state.loading)
  const setLoad = useLoginStore(state => state.setLoading)
  const {id} = useParams()

  useEffect(() => {
    user && navigate('/')
  },[])

  const handleSignInGoogle = () => {
    setLoad(true)
    signInWithPopup(authentication, providerGoogle)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        setLoad(false)
        swal("Login successfull", `Hello ${user.displayName}`, "success");
        id ?  navigate(`/anime/${id}`) : navigate('/')
        // ...
      })
      .catch((error) => {
        setLoad(true)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleSignInFacebook = () => {
    setLoad(true)
    signInWithPopup(authentication, providerFacebook)
      .then((result) => {
        setLoad(false)
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        setLoad(false)
        swal("Login successfull", `Hello ${user.displayName}`, "success");
        id ? navigate(`/anime/${id}`) : navigate('/')
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        setLoad(true)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="login">
      <Title Title="Login - Danime" />
      <div className="login-form">
        <h1>Login</h1>
        <button id="loginFacebook" onClick={handleSignInFacebook}>
          Login with Facebook
        </button>
        <button id="loginGoogle" onClick={handleSignInGoogle}>
          Login with Google
        </button>
      
        <Link to="/">
          <i className="login-btn-close far fa-window-close"></i>
        </Link>
      </div>
      {load && <LoadingLogin/>}
    </div>
  );
};

export default Login;
