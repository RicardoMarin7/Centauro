import Firebase from './firebase'
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth'

const auth = getAuth(Firebase)

const changePersistence = async () =>{
    try {
        const response = await setPersistence(auth, browserSessionPersistence)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

changePersistence()

export default auth