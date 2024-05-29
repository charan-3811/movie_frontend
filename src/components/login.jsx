import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // eslint-disable-next-line react/prop-types
    const { user, setUser } = props;

    // If user is already logged in, redirect to home page
    if (user !== "None") {
        alert("You have already logged in")
        navigate("/home");
        return null;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post('https://movie-backend-ifjh.onrender.com/login', {
                email: email,
                password: password,
            });
            if (response.data === "Correct") {
                sessionStorage.setItem("user", email);
                setUser(email);
                navigate("/home");
            } else {
                alert("Incorrect email or password");
            }
        } catch (error) {
            console.error("There was an error logging in!", error);
            alert("An error occurred during login. Please try again.");
        }
    }

    return (
        <div style={{ display: "flex"
        }}>
            <div style={{ textAlign: "center", maxWidth: "400px" }}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block" }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: "100%", padding: "0.5rem" }}
                        />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block" }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: "100%", padding: "0.5rem" }}
                        />
                    </div>
                    <button type="submit" style={{ width: "100%", padding: "0.5rem", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>Submit</button>
                    <p style={{ marginTop: "1rem" }}>
                        New user? <Link to="/signup" style={{ color: "#007bff" }}>Register here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
