import React, { useState } from 'react'
import FirebaseAuth from './utils/firebaseauth'
import Auth from './pages/Auth'
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


  return !user ? <Auth /> : <h1> Usuario Logeado</h1>
}

export default App;
