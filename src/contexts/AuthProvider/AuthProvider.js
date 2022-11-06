import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import {createUserWithEmailAndPassword,getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

const createUser = (email,password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword (auth, email, password);
}

//log in
const login = (email,password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email,password)
}

//log out
const logOut = () => {
    localStorage.removeItem('wheelz-token')
  return signOut(auth); 
}

useEffect(() => {
  const unsubscribe =  onAuthStateChanged(auth, currentUser =>{
        setUser(currentUser)
        setLoading(false)
    });
    return () =>{
        return unsubscribe();
    }
})


const authInfo ={
    user,
    loading,
    createUser,
    login,
    logOut 
}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;