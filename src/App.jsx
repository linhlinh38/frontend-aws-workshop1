import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import UserList from './components/UserList';

function App() {
    const axiosInstance = axios.create({
    baseURL: 'http://54.164.12.203:80'
  });
  return (
    <>
      <UserList axiosInstance={axiosInstance}/>
    </>
  )
}

export default App
