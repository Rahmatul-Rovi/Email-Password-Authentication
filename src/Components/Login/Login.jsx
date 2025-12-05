import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../Firebase.init';
import { Link } from 'react-router';

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [errorMessage , setErrorMessage] = useState('');
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
            setSuccess(true);
        })
        .catch(error => {
            console.log(error);
            setErrorMessage(error.Message);
        })
    }
    return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
         <h1 className="text-5xl font-bold">Login now!</h1>
        <form onSubmit={handleLogin} className="fieldset">     
          <label className="label">Email</label>
          <input type="email" name='email' className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name='password' className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        {
            <p>New to this website? <Link className='text-blue-600 underline' to='/SignUp'>SignUp</Link></p>
        }
        {
            errorMessage && <p className='text-red-600'>{errorMessage}</p>
        }
        {
            success && <p className='text-green-500'>User logged in Successfully</p>
        }
      </div>
    </div>
    );
};

export default Login;