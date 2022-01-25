import Firebase from './firebase'
import {  getAuth } from 'firebase/auth'

const auth = getAuth(Firebase)

export default auth