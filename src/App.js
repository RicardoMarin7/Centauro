import React, { useState } from 'react'
import FirebaseAuth from './utils/firebaseauth'
import { ToastContainer, toast } from 'react-toastify';
import Auth from './pages/Auth'
import Home from './pages/Home'
import Loader from './components/Loader'
import {  onAuthStateChanged } from 'firebase/auth'



function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  onAuthStateChanged(FirebaseAuth, currentUser =>{
    if(!currentUser){
      setUser(null)
    }else{
      setUser(currentUser)
    }
    setLoading(false)
  })

  if(loading){
    return <Loader text='Iniciando Aplicación'/>
  }


  // return !user ? <Auth /> : <Home />

  return(
    <>
      {!user ? <Auth /> : <Home />}
      <ToastContainer 
        position='top-center'
        autoClose='4000'
        newestOnTop
        closeOnClick
        rtl
        theme='dark'
      />
    </>
  )
}

export default App;
