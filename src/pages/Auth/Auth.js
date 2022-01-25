import React, { useState, useEffect } from 'react'
import { Input, Divider, Button, Modal} from 'semantic-ui-react'
import { validateEmail } from '../../utils/Validations'
import FirebaseAuth from '../../utils/firebaseauth'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import {ReactComponent as Logo} from '../../images/logo.svg'

const Auth = () => {
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });

    const [loginError, setLoginError] = useState({
        email: false,
        password: false
    });

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = e =>{
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const validateForm = () =>{
        let withoutErrors = true
        let errors = {
            email: false,
            password: false
        }

        if(!login.email || !validateEmail(login.email)){
            errors.email = true
            withoutErrors = false
        }

        if(!login.password){
            errors.password = true
            withoutErrors = false
        }

        setLoginError(errors)

        return withoutErrors
    }

    const handleClick = async () =>{
        setLoading(true)
        if(!validateForm()){
            setLoading(false)
            return
        }
        try {
            const response = await signInWithEmailAndPassword(FirebaseAuth, login.email, login.password)
            console.log(response)
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    const handleForgot = async () =>{
        setLoading(true)
        if(!login.email || !validateEmail(login.email)){
            toast.error('Introduzca un email válido')
            setLoading(false)
            return
        }
        try {
            await sendPasswordResetEmail(FirebaseAuth, login.email)          
            setOpen(false)  
            toast.success('Se ha enviado un correo para que restablezca su contraseña')
        } catch (error) {
            console.log(error)
            toast.error(error.message)            
        }finally{
            setLoading(false)
        }

    }

    return (
        <div className="Auth">
            <div className="Auth__logo">
                <Logo className='logo'/>
            </div>
            <div className="Auth__container">
                <h2>Iniciar Sesion</h2>
                <Divider/>
                <p>Email</p>
                <Input 
                    type='text'
                    placeholder='email@example.com'
                    name='email'
                    value={login.email}
                    onChange={handleChange}
                    error={loginError.email}
                />

                <p>Contraseña</p>
                <Input 
                    name='password'
                    type='password' 
                    placeholder='Contraseña' 
                    onChange={handleChange}
                    error={loginError.password}
                />

                <p 
                    className='forgot'
                    onClick={() => setOpen(true)}
                ><a>¿Olvidaste tu contraseña?</a></p>

                <Button
                    onClick={handleClick}
                    loading={loading}
                >Iniciar Sesión</Button>                
            </div>

            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                className='Modal'
                open={open}
                size='small'
            >
                <Modal.Header><h3>Recuperar contraseña</h3></Modal.Header>
                <Modal.Content>
                    <Input 
                        type='text'
                        placeholder='email@example.com'
                        name='email'
                        value={login.email}
                        onChange={handleChange}
                    />

                    <Button
                        onClick={handleForgot}
                        loading={loading}
                    >Iniciar Sesión</Button>      
                </Modal.Content>
                

            </Modal>
    </div>
    );
}
 
export default Auth;