import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from "../components/navbar/Navbar";
import Login from '../components/login/Login';
import Home from "../components/home/Home";
import AddTodo from "../components/add-todo/AddTodo";
import Profile from "../components/profile/Profile";

function App() {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    // console.log(profileData);
    // Check if the session JSON key has a value
    if (profileData && profileData.session) {
      setIsLoggedIn(true);
    }
  }, [profileData]);

  function handleLogin(data){
    setProfileData(data);
    // setIsLoggeIn(false)
  }



  if (loggedIn === false){
    return (
    <Login handleLogin={handleLogin} />
    );
  }else{
    return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={ <Home userId={profileData.session} /> }/>
          <Route path="/add-todo" element={<AddTodo profileData={profileData }/>} />
          <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn}  profileData={profileData} />} />
        </Routes>
    </BrowserRouter>
    );
  }

}

export default App;
