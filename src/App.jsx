import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import Home from "./components/home.jsx";
import Details from "./components/details.jsx";
import Playlists from "./components/playlists.jsx";
import Navbar from "./components/navbar.jsx";
import FriendsList from "./components/friendsList.jsx";

function App() {
    const [user, setUser] = useState(sessionStorage.getItem("user") || "None");

    return (
        <Router>
            <Navbar user={user} setUser={setUser} />

            <div style={{ paddingTop: '4rem' ,width:"100%",display:"flex",flexDirection:"column"}}>
                <Routes>
                    {user === "None" ? (
                        <>
                            <Route path="/" element={<Login user={user} setUser={setUser} />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    ) : (
                        <>
                            <Route path="/home" element={<Home user={user}/>} />
                            <Route path="/playlist" element={<Playlists user={user}/>} />
                            <Route path="/details/:id" element={<Details user={user}/>} />
                        </>
                    )}
                    <Route path="/:email/:name" element={<FriendsList user={user}/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
