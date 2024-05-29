import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function FriendsList({ user }) {  // Assume the user prop is passed to the component
    const { email, name } = useParams();
    const [playlist, setPlaylist] = useState([]);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [details,setDetails]=useState()

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await axios.get(`https://movie-backend-ifjh.onrender.com/friendlist/${email}/${name}`);
                setDetails(response.data)
                const movieDetailsPromises = response.data.playlist.movies.map(id => fetchDetails(id));
                const movies = await Promise.all(movieDetailsPromises);
                setPlaylist(movies);
                setStatus(response.data.playlist.status);  // Set the playlist status
            } catch (e) {
                setError("Unable to load resources");
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylist();
    }, [email, name]);

    const fetchDetails = async (id) => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?apikey=84b53699&i=${id}&plot=full`);
            return response.data;
        } catch (error) {
            console.error("Error fetching movie details:", error);
            return null;
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;



    const handleDetails = (id) => {
        navigate(`/details/${id}`)
    };

    return (

        <div>
            {user===details.email || status==="Public"?
                <div>
            <h1>{email} {name} Playlist</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid black', padding: '0.4rem' }}>Sl. No</th>
                    <th style={{ border: '1px solid black', padding: '0.5rem' }}>Movie Title</th>
                    <th style={{ border: '1px solid black', padding: '0.5rem' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {playlist.map((movie, index) => (
                    movie ? (
                        <tr key={movie.imdbID}>
                            <td style={{
                                border: '1px solid black',
                                textAlign: 'center',
                                padding: '0.5rem'
                            }}>{index + 1}</td>
                            <td style={{ border: '1px solid black', padding: '0.5rem' }}>
                                <strong>{movie.Title}</strong>
                            </td>
                            <td style={{ border: '1px solid black', textAlign: 'center', padding: '0.5rem' }}>
                                <button
                                    onClick={() => handleDetails(movie.imdbID)}
                                    style={{
                                        marginRight: '0.5rem',
                                        padding: '0.5rem',
                                        backgroundColor: '#333',
                                        color: '#fff',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >Details
                                </button>
                            </td>
                        </tr>
                    ) : null
                ))}
                </tbody>
            </table>
                :
                </div>
                :
                <p>You dont have access to this playlist</p>
            }
        </div>
    );
}

export default FriendsList;
