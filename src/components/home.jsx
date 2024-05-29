import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home(props) {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [playlistId, setPlaylistId] = useState("");
    const [toggleList, setToggleList] = useState(false);
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);
    // eslint-disable-next-line react/prop-types
    const { user } = props;

    // Fetch user details
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://movie-backend-ifjh.onrender.com/userDetails/${user}`);
                setPlaylists(response.data.playlists);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchData();
    }, [user]);

    // Fetch movies based on input
    const fetchMovies = async (url) => {
        try {
            const response = await axios.get(url);
            setMovies(response.data.Search || []);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        fetchMovies("https://www.omdbapi.com/?apikey=84b53699&s=movie&plot=full");
    }, []);

    // Modify URL based on input
    const handleSubmit = (event) => {
        event.preventDefault();
        let url = `https://www.omdbapi.com/?apikey=84b53699&s=${title}&plot=full`;
        if (year) {
            url += `&y=${year}`;
        }
        fetchMovies(url);
    };

    // Navigate to movie details
    const handleDetails = (id) => {
        navigate(`/details/${id}`);
    };

    const handlePlaylists = (id) => {
        if (toggleList && playlistId === id) {
            setPlaylistId("");
            setToggleList(false);
        } else {
            setPlaylistId(id);
            setToggleList(true);
        }
    };

    const handleAddMovie = async (name) => {
        try {
            const response = await axios.post("https://movie-backend-ifjh.onrender.com/addmovie", {
                email: user,
                name: name,
                movieid: playlistId
            });

            if (response.status === 200) {
                alert("Movie added successfully!");
            } else {
                alert("Failed to add movie: " + response.data);
            }
        } catch (e) {
            console.error("Failed to add movie:", e);
            alert("Failed to add movie");
        }
    };

    return (
        <div style={{ display: "flex", alignContent: "center", flexDirection: "column", alignItems: "center", marginTop: '4rem' }}>
            <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
                <label style={{ marginRight: "0.5rem" }}>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ marginLeft: "0.5rem" }}
                    />
                </label>
                <label style={{ marginRight: "0.5rem" }}>
                    Year
                    <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        style={{ marginLeft: "0.5rem" }}
                    />
                </label>
                <button type="submit" style={{ padding: "0.5rem 1rem" }}>Search</button>
            </form>
            <br />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <div style={{ width: '10rem', margin: '1rem', textAlign: 'center' }} key={index}>
                            <img src={movie.Poster} alt={movie.Title} style={{ width: '10rem', height: '10rem' }} />
                            <p>{movie.Title}</p>
                            <button
                                onClick={() => handleDetails(movie.imdbID)}
                                style={{
                                    display: 'block',
                                    margin: '0.5rem auto',
                                    backgroundColor: '#333',
                                    color: '#fff',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#333'}
                            >Details</button>
                            <button
                                onClick={() => handlePlaylists(movie.imdbID)}
                                style={{
                                    display: 'block',
                                   marginTop:'1rem',
                                    marginBottom:"auto",
                                    bottom:'0',
                                    backgroundColor: '#333',
                                    color: '#fff',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#333'}
                            >Add to playlist</button>
                            {
                                playlistId === movie.imdbID && toggleList && (
                                    <div>
                                        {playlists.map((playlist, key) => (
                                            <button
                                                key={key}
                                                onClick={() => handleAddMovie(playlist.name)}
                                                style={{
                                                    display: 'block',
                                                    margin: '0.5rem auto',
                                                    backgroundColor: '#333',
                                                    color: '#fff',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = '#333'}
                                            >{playlist.name}</button>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    ))
                ) : (
                    <p>No movies found.</p>
                )}
            </div>
        </div>
    );
}

export default Home;
