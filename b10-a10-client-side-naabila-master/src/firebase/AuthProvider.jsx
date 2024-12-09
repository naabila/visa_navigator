import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth  from '../firebase/firebase.init'; // Ensure the path is correct

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  // Sign up with email
  const emailSignup = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

 // Sign up with Google
 const googleLogin=(provider)=>{
  setLoading(true)  
  return signInWithPopup(auth,provider)
}
//email sign in
const emailLogin=(email,password)=>{
  setLoading(true)  
  return signInWithEmailAndPassword(auth, email, password);
}
  // Auth observer
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (currentUser) => {
   setLoading(false)   
   setUser(currentUser);
  

    });
    return ()=>{
      return unsubscribe()
    }
  },[]);

 // Logout
 const logoutUser = () => {
  return signOut(auth)
    .then(() => {
      setLoading(false)  
    })
    .catch((error) => {
      console.error("Error logging out:", error);
    });
};

//forget password
const changePassword=(email)=>{
  return sendPasswordResetEmail(auth, email)
 }

//theme toggle
useEffect(() => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme); 
  }
}, []);

const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
  document.documentElement.setAttribute("data-theme", newTheme); 
};

  const authInfo = {
    user,
    emailSignup,
    googleLogin,
    loading,
    logoutUser,
    changePassword,
    theme,
     toggleTheme,
     emailLogin
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
