import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../Firebase.init';
import { Link } from 'react-router';

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [errorMessage , setErrorMessage] = useState('');
    const emailRef = useRef();
    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        //rest 
        setSuccess(false);
        setErrorMessage('');
        //login user
        signInWithEmailAndPassword(auth,email.password)
        .then(result => {
            console.log(result.user);
            if(!result.user.emailVerified){
                alert('Please verify your email address');
            }
            else{
              setSuccess(true);
            }
           
        })
        .catch(error => {
            console.log(error);
            setErrorMessage(error.Message);
        })
    }

    const handleForgetPassword = () => {
        console.log(emailRef.current.value);
        const email = emailRef.current.value;

        setErrorMessage('');

        //send password rest email
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('A password reset email has been sent to your email address. Please check your email.');
        })
        .catch(error => {
            setErrorMessage(error.Message);
        })
    }
    return (
     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 px-4">
            <div className="card w-full max-w-sm shadow-2xl rounded-2xl bg-gray-900/80 backdrop-blur border border-indigo-700/40">
                <div className="card-body">

                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text mb-4">
                        Login
                    </h1>

                    <form onSubmit={handleLogin} className="space-y-3">

                        <label className="text-gray-300 font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            ref={emailRef}
                            className="input bg-gray-800 text-white border border-indigo-600/40 focus:border-purple-400 focus:ring-purple-500 placeholder-gray-500"
                            placeholder="Enter your email"
                        />

                        <label className="text-gray-300 font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input bg-gray-800 text-white border border-indigo-600/40 focus:border-purple-400 focus:ring-purple-500 placeholder-gray-500"
                            placeholder="Enter password"
                        />

                        <p
                            onClick={handleForgetPassword}
                            className="text-indigo-400 hover:text-purple-300 cursor-pointer text-sm font-medium mt-1"
                        >
                            Forgot password?
                        </p>

                        <button className="btn w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 mt-4 border-none shadow-lg shadow-indigo-900/40">
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-gray-400 mt-3">
                        New here?{" "}
                        <Link className="text-indigo-400 hover:text-purple-300 underline" to="/SignUp">
                            Sign Up
                        </Link>
                    </p>

                    {errorMessage && (
                        <p className="text-red-500 font-semibold mt-2">{errorMessage}</p>
                    )}

                    {success && (
                        <p className="text-green-400 font-semibold mt-2">Login successful!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;