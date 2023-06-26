'use client';
import { createContext, useContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
}from 'firebase/auth';

import {collection, addDoc, doc, setDoc} from 'firebase/firestore';
import { auth, db } from '@/app/api/auth/[...nextauth]/route';
import { useRouter } from 'next/navigation';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const router = useRouter();

    const signup = async (email , password) => {
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        }catch(e) {
            console.error(e);
        }finally {
            router.push('/Account')
        }
       
    };
    const signin = async (email, password) => {
        try{
            return await signInWithEmailAndPassword(auth, email, password);
        }catch(e){
            console.log("Something is wrong:", e)
        }finally {
            router.push('/Account')
        }
    }

    const logout = async () => {
        try {
         return await signOut(auth);
        }catch(e){
            console.error(e);
        }finally {
            router.push('/')
        }
        
    }  

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    const addData = async () => {
        try{
            const id = user.email;
            const data = {
                watchList: [],
            }
            const userDoc = doc(db, 'users', id);
            return await setDoc(userDoc, data);
        }catch(e){
            console.error(e);
        }finally {
            console.log("Sucess adding");
        }
    }

    return (
        <UserContext.Provider value={{signup, signin, logout, addData, user}}>
            {children}
        </UserContext.Provider>
    )
};

export const UserAuth = () => {
    return useContext(UserContext);
}