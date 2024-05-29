import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        setUser("None");
        navigate("/");
    };

    const handleLogin = () => {
        navigate("/");
    };

    return (
        <div>
            {user === "None" ? (
                <div style={{
                    width: '100%',
                    backgroundColor: '#42cb4c',
                    padding: '1rem 0',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: "center",
                }}>
                    <button onClick={handleLogin} style={{
                        backgroundColor: '#333',
                        color: '#fff',
                        border: 'solid',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        padding: '0.5rem 1rem'
                    }}>Login</button>
                </div>
            ) : (
                <nav style={{
                    width: '100%',
                    backgroundColor: '#42cb4c',
                    padding: '1rem 0',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: "center",
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/home" style={{ textDecoration: 'none' }}>
                            <button style={{
                                backgroundColor: '#333',
                                color: '#fff',
                                border: 'solid',
                                fontSize: '1.2rem',
                                margin: '0 1rem',
                                cursor: 'pointer'
                            }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#333'}
                            >HOME
                            </button>
                        </Link>
                        <Link to="/playlist" style={{ textDecoration: 'none' }}>
                            <button style={{
                                backgroundColor: '#333',
                                color: '#fff',
                                border: 'solid',
                                fontSize: '1.2rem',
                                margin: '0 1rem',
                                cursor: 'pointer'
                            }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#333'}
                            >PLAYLISTS
                            </button>
                        </Link>
                    </div>
                    <div style={{ marginRight: '1rem' }}>
                        <button onClick={handleLogout} style={{
                            backgroundColor: '#333',
                            color: '#fff',
                            border: 'solid',
                            fontSize: '1.2rem',
                            cursor: 'pointer'
                        }}>Logout
                        </button>
                    </div>
                </nav>
            )}
        </div>
    );
}

export default Navbar;
