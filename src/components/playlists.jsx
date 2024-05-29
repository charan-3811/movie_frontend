import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

// eslint-disable-next-line react/prop-types
const Playlists = ({ user }) => {
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [details, setDetails] = useState([]);
    const [moviesDetails, setMoviesDetails] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const [shareUrl, setShareUrl] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const [id,setId]=useState("")

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://movie-backend-ifjh.onrender.com/userDetails/${user}`);
            setDetails(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPlaylistName.trim()) {
            try {
                const response = await axios.post("https://movie-backend-ifjh.onrender.com/addPlaylist", {
                    name: newPlaylistName,
                    email: user
                });
                if (response.data === "added successfully") {
                    alert("Playlist added successfully");
                    fetchData();
                } else {
                    alert("Failed to add playlist: " + response.data);
                }
            } catch (e) {
                console.error("Failed to add playlist:", e);
                alert("Failed to add playlist");
            }
            setNewPlaylistName("");
        }
    };

    const handleMovies = async (playlist) => {
        setSelectedPlaylist(playlist.name);
        setStatus(playlist.status);
        setShareUrl(`https://movie-frontend-five.vercel.app/${user}/${playlist.name}`);
        try {
            const moviesDetails = await Promise.all(playlist.movies.map((movie)=>fetchDetails(movie)));
            setMoviesDetails(moviesDetails.filter(movie => movie !== null));
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    const fetchDetails = async (id) => {
        let url=`https://www.omdbapi.com/?apikey=84b53699&i=${id}&plot=full`
        try {
            const response = await axios.get(url);
            console.log(response)
            return response.data;
        } catch (error) {
            console.error("Error fetching movie details:", error);
            return null;
        }
    };

    const handleDetails = (id) => {
        navigate(`/details/${id}`);
    };

    const handleDelete = async (imdbID) => {
        try {
            const response = await axios.delete("https://movie-backend-ifjh.onrender.com/deleteMovie", {
                data: { email: user, name: selectedPlaylist, movieid: imdbID }
            });
            if (response.data === "movie deleted successfully from the playlist") {
                alert("Movie removed successfully!");
                setMoviesDetails(moviesDetails.filter(movie => movie.imdbID !== imdbID));
            } else {
                alert("Failed to remove movie: " + response.data);
            }
        } catch (e) {
            console.error("Failed to delete movie:", e);
            alert("Failed to delete movie");
        }
    };

    const handleDeletePlaylist = async () => {
        try {
            const response = await axios.delete(`https://movie-backend-ifjh.onrender.com/deleteplaylist`, {
                data: { email: user, name: selectedPlaylist }
            });
            if (response.data === "Playlist deleted successfully") {
                alert("Playlist deleted successfully");
                setSelectedPlaylist("");
                await fetchData();
            } else {
                alert("Failed to delete playlist: " + response.data);
            }
        } catch (error) {
            console.error("Failed to delete playlist:", error);
            alert("Failed to delete playlist");
        }
    };

    const handleClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            alert("URL copied to clipboard!");
        } catch (e) {
            alert("Failed to copy URL.");
        }
    };

    const handleStatus = async (newStatus) => {
        setStatus(newStatus);
        try {
            const response = await axios.put("https://movie-backend-ifjh.onrender.com/status", {
                email: user,
                name: selectedPlaylist,
                status: newStatus
            });
            if (response.status === 200) {
                alert(`Playlist changed to ${newStatus} mode`);
                await fetchData();
            } else {
                alert("Failed to update status: " + response.data);
            }
        } catch (e) {
            console.error("Failed to update status:", e);
            alert("Failed to update status");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%", marginLeft: "1rem", marginTop: "1rem" }}>
            <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    value={newPlaylistName}
                    placeholder="Enter new playlist name"
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    style={{ backgroundColor: "white", color: "black", margin: "1rem", height: "2rem" }}
                />
                <button type="submit" style={{ padding: "0.5rem", color: "#fff", border: "none", cursor: "pointer", backgroundColor: "#333" }}>Create New Playlist</button>
            </form>
            <hr style={{ color: "black", margin: "0" }} />
            <div style={{ marginBottom: '1rem', marginTop: "0.5rem" }}>
                <h2>Playlists</h2>
                {details.playlists && details.playlists.map((playlist, index) => (
                    <button
                        key={index}
                        onClick={() => handleMovies(playlist)}
                        style={{ marginRight: '0.5rem', marginBottom: '0.5rem', padding: '0.5rem', color: '#fff', border: 'none', cursor: 'pointer', backgroundColor: '#333' }}
                    >
                        {playlist.name}
                    </button>
                ))}
                <hr style={{ color: "black", margin: "0" }} />
            </div>
            {selectedPlaylist && (
                <div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                        <h2 style={{ margin: "0" }}>{selectedPlaylist}</h2>
                        <Popup trigger={<button style={{ marginLeft: "1rem", padding: "0.5rem", color: "#fff", border: "none", cursor: "pointer", backgroundColor: "#333" }}>SHARE</button>} modal>
                            <span style={{ display: "flex", alignItems: "center" }}>
                                <Link style={{ marginRight: "1rem" }}>{shareUrl}</Link>
                                <button onClick={handleClipboard} style={{ padding: "0.5rem", backgroundColor: "#333", color: "#fff", border: "none", cursor: "pointer" }}>Copy</button>
                            </span>
                        </Popup>
                        <button onClick={handleDeletePlaylist} style={{ marginLeft: "1rem", padding: "0.5rem", backgroundColor: "red", color: "#fff", border: "none", cursor: "pointer" }}>DELETE</button>
                        <select style={{ marginLeft: "1rem", height: "2.5rem", borderRadius: "4px", backgroundColor: "white", color: "black" }}
                                value={status}
                                onChange={(e) => handleStatus(e.target.value)}>
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '0.5rem' }}>Sl. No</th>
                            <th style={{ border: '1px solid black', padding: '0.5rem' }}>Movie Title</th>
                            <th style={{ border: '1px solid black', padding: '0.5rem' }}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {moviesDetails.map((movie, index) => (
                            movie && (
                                <tr key={movie.imdbID}>
                                    <td style={{ border: '1px solid black', textAlign: 'center', padding: '0.5rem' }}>{index + 1}</td>
                                    <td style={{ border: '1px solid black', padding: '0.5rem' }}><strong>{movie.Title}</strong></td>
                                    <td style={{ border: '1px solid black', textAlign: 'center', padding: '0.5rem' }}>
                                        <button
                                            onClick={() => handleDetails(movie.imdbID)}
                                            style={{ marginRight: '0.5rem', padding: '0.5rem', backgroundColor: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}
                                        >Details</button>
                                        <button
                                            onClick={() => handleDelete(movie.imdbID)}
                                            style={{ padding: '0.5rem', backgroundColor: 'red', color: '#fff', border: 'none', cursor: 'pointer' }}
                                        >REMOVE</button>
                                    </td>
                                </tr>
                            )
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Playlists;
