
import React, { useState } from "react";

export default function Login({handleLogin}) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserdata] = useState();

  const fetchLogin = () => {
    const credentials = {
      username: username,
      password: password
    };

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
      // credentials: 'include' // send cookies with the request
    })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            handleLogin(data.data);
            setUserdata(data.data);
          }).catch(error => console.error(error));
        } else {
          // handle failed login
          if (response.status === 401) {
            alert('Invalid username/email or password');
          } else {
            console.error('Failed to log in');
          }
        }
      }).catch(error => console.error(error));
  };



  const fetchSignUp = async () => {
    console.log(`signing up: \nusername: ${username}\nemail: ${email}\npassword: ${password}`);

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password: password,
        }),
      });

      const data = await response.json();

      if (response.status === 201 && data.message === "Registration successful") {
        alert("Registration successful. Please log in.");
        window.location.href = "/login"; // redirect to login page
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleForm = () => setIsLogin(!isLogin);

  const handleInputChange = (event, inputType) => {
    const value = event.target.value;
    switch (inputType) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleShowPasswordClick = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      // If the form is not valid, show an error message and return
      alert("Please fill up all required fields.");
      return;
    }

    // If all fields are filled up, check if the passwords match (for sign up)
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // If everything is valid, call the correct fetch function
    if (isLogin) {
      fetchLogin();
    } else {
      fetchSignUp();
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1>{isLogin ? "Login" : "Sign Up"}</h1>
              <form onSubmit={handleSubmit}>
                {isLogin ? (
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      placeholder="enter you username  ...."
                      className="form-control"
                      value={username}
                      onChange={(event) => handleInputChange(event, "username")}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        placeholder="enter you password  ...."
                        className="form-control"
                        value={username}
                        onChange={(event) => handleInputChange(event, "username")}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(event) => handleInputChange(event, "email")}
                      />
                    </div>
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      value={password}
                      onChange={(event) => handleInputChange(event, "password")}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleShowPasswordClick}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                {!isLogin && (
                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        value={confirmPassword}
                        onChange={(event) => handleInputChange(event, "confirmPassword")}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handleShowPasswordClick}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                )}
                <button type="submit" className="btn btn-primary">
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>
              <hr />
              <p>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button className="btn btn-link" onClick={toggleForm}>
                  {isLogin ? "Sign up here" : "Login here"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
