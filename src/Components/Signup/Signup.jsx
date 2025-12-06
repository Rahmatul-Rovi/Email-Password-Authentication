import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../Firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Signup = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log(email, password, terms);
    setSuccess(false);
    setErrorMessage("");
    if(!terms){
      setErrorMessage('You have to accept terms and conditions');
      return;
    }

    //Password validation
    const passwordRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (passwordRegEx.test(password) === false) {
      setErrorMessage(
        "Password should be at least 8 characters, at least one uppercase letter, at least one lowercase letter, and at least one number"
      );
    }

    // Create User
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setSuccess(true);
        //email verify
        sendEmailVerification(auth.currentUser)
        .then(() => {
          setSuccess(true);
          alert('We sent you a verification to your email. please check you email');
        })
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };
  return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 px-4">
      <div className="card w-full max-w-sm shadow-2xl rounded-2xl bg-gray-900/80 backdrop-blur border border-indigo-700/40">
        <div className="card-body">

          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text mb-4">
            SignUp
          </h1>

          <form onSubmit={handleSignUp} className="space-y-3">
            <label className="text-gray-300 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="input bg-gray-800 text-white border border-indigo-600/40 
              focus:border-purple-400 focus:ring-purple-500 placeholder-gray-500"
              placeholder="Enter your email"
            />

            <label className="text-gray-300 font-semibold mt-3">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input bg-gray-800 text-white border border-indigo-600/40 
                focus:border-purple-400 focus:ring-purple-500 placeholder-gray-500"
                placeholder="Create a password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-4 text-purple-300 hover:text-purple-200"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <label className="flex items-center gap-2 text-gray-300 text-sm mt-2">
              <input type="checkbox" name="terms" className="checkbox checkbox-primary" />
              Accept terms & conditions
            </label>

            <button className="btn w-full bg-gradient-to-r from-indigo-600 to-purple-600 
            hover:from-indigo-500 hover:to-purple-500 mt-4 border-none shadow-lg shadow-indigo-900/40">
              Sign Up
            </button>
          </form>

          <p className="text-gray-400 text-sm mt-3">
            Already have an account?{" "}
            <Link className="text-indigo-400 hover:text-purple-300 underline" to="/login">
              Login
            </Link>
          </p>

          {errorMessage && (
            <p className="text-red-500 mt-2 font-semibold">{errorMessage}</p>
          )}

          {success && (
            <p className="text-green-400 mt-2 font-semibold">Account created successfully!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
