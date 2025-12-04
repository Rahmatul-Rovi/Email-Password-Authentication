import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../Firebase.init";

const Signup = () => {
     const [errorMessage, setErrorMessage] = useState('');
    const handleSignUp = e => {
       
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
         
        setErrorMessage('');
        // Create User
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
            setErrorMessage(error.message);
        })
    }
  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Please Sign Up now!</h1>
        <form onSubmit={handleSignUp} >
          <label className="label">Email</label>
          <input type="email" name="email" className="input" placeholder="Email" />
          <label className="label mt-4">Password</label>
          <input type="password" name="password" className="input" placeholder="Password" />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Sign Up</button>
        </form>
        {
            errorMessage && <p className="text-red-500">{errorMessage}</p>
        }
      </div>
    </div>
  );
};

export default Signup;
