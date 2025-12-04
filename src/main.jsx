import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './Layout/Root.jsx'
import Home from './Components/Home/Home.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Signup from './Components/Signup/Signup.jsx'

const router = createBrowserRouter([
  {
  path:'/',
  Component: Root,
  children: [{
    index: true, Component: Home
  },
  {
    path: 'login',
    Component: Login
  },
  {
    path: 'register',
    Component: Register
  },
  {
    path:'signUp',
    Component: Signup
  }
]
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
