import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const userData = {
            name: name,
            email: email,
            phoneNo: phone,
            password: password
        };

        try {
            const response = await axios.post("https://movie-backend-ifjh.onrender.com/signup", userData);

            if (response.status === 200) {
                console.log("Signup successful");
                navigate("/");
            } else {
                console.error("Signup failed");
            }
        } catch (error) {
            console.error("Error occurred during signup:", error);
        }
    }

    return (
        <div style={{ textAlign: 'center',
            margin: '2rem' ,
            alignItems:"center",
            width:"100%",
            display:"flex",
            flexDirection:"column",
            marginTop:"0",flexWrap:"wrap"}}>
            <h1>SIGNUP</h1>
            <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Name</label>
                <input
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginBottom: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor:"white",
                        color:"black"
                    }}
                />
                <br />
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
                <input
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginBottom: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
                <br />
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>PhoneNo</label>
                <input
                    type="tel"
                    placeholder="Enter your 10-digit contact number"
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginBottom: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
                <br />
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginBottom: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
                <br />
                <button type="submit" style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>Submit</button>
                <p style={{ marginTop: '1rem' }}>
                    Already registered? <Link to="/">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
