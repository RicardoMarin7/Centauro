import React from 'react'
import { Input, Divider, Button} from 'semantic-ui-react'
import {ReactComponent as Logo} from '../../images/logo.svg'

const Auth = () => {
    return (
        <div className="Auth">
            <div className="Auth__logo">
                <Logo className='logo'/>
            </div>
            <div className="Auth__container">
                <h2>Iniciar Sesion</h2>
                <Divider/>
                <p>Email</p>
                <Input placeholder='email@example.com' />

                <p>Contraseña</p>
                <Input type='password' placeholder='Contraseña' />

                <Button>Iniciar Sesión</Button>                
            </div>
        </div>
    );
}
 
export default Auth;