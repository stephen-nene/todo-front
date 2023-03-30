import React from "react";
import buggati from "../../images/bugatti4.webp";

// id to be a random number from 1-8

function Profile({ setIsLoggedIn, profileData }) {

  const handleLogout = () => {
    setIsLoggedIn(false)
    // Implement your logout logic here
    alert("will be logout now");
    // console.log(profileData.user);
  };

  return (
    <div className="main"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Profile</h1>
      <div className="card" style={{ width: "25rem" }}>
        <img src={buggati} alt="..." className="card-img-top" />
        <div className="card-body">
          <h3 className="card-title">{profileData.user.username}</h3>
          <h6 className="text">{profileData.user.email}</h6>
          <p className="card-text">This is a buggati and dont worry much</p>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
