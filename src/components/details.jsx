import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Details() {
    const [details, setDetails] = useState(null);
    const { id } = useParams();
    const url=`https://www.omdbapi.com/?apikey=84b53699&i=${id}&plot=full`

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(url);
                setDetails(response.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchDetails();
    }, [id]);

    if (!details) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{padding: '2rem', textAlign: 'center'}}>
            <h1 style={{marginBottom: '1rem'}}>{details.Title}</h1>
            <img src={details.Poster} alt={details.Title}
                 style={{maxWidth: '100%', height: 'auto', marginBottom: '1rem'}}/>
            <p style={{fontSize: '1.2rem', marginBottom: '1rem', display: "flex"}}>{details.Plot}</p>
            <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '1rem'}}>
                <tbody>
                <tr>
                    <td style={{padding: '0.5rem', border: '1px solid black', textAlign: 'left'}}>
                        <strong>Language:</strong></td>
                    <td style={{
                        padding: '0.5rem',
                        border: '1px solid black',
                        textAlign: 'left'
                    }}>{details.Language}</td>
                </tr>
                <tr>
                    <td style={{padding: '0.5rem', border: '1px solid black', textAlign: 'left'}}><strong>Year:</strong>
                    </td>
                    <td style={{padding: '0.5rem', border: '1px solid black', textAlign: 'left'}}>{details.Year}</td>
                </tr>
                <tr>
                    <td style={{padding: '0.5rem', border: '1px solid black', textAlign: 'left'}}>
                        <strong>Runtime:</strong></td>
                    <td style={{padding: '0.5rem', border: '1px solid black', textAlign: 'left'}}>{details.Runtime}</td>
                </tr>
                <tr>
                    <td style={{padding: '0.5rem', border: '1px solid black', textAlign: 'left'}}>
                        <strong>Genre:</strong></td>
                    <td style={{padding: '0.5rem', border: '1px solid black', textAlign: 'left'}}>{details.Genre}</td>
                </tr>
                <tr>
                    <td style={{padding: '0.5rem', border: '1px solid black', textAlign: 'left'}}>
                        <strong>Director:</strong></td>
                    <td style={{
                        padding: '0.5rem',
                        border: '1px solid black',
                        textAlign: 'left'
                    }}>{details.Director}</td>
                </tr>
                <tr>
                    <td style={{padding: '0.5rem', border: '1px solid black', textAlign: 'left'}}>
                        <strong>Actors:</strong></td>
                    <td style={{padding: '0.5rem', border: '1px solid black', textAlign: 'left'}}>{details.Actors}</td>
                </tr>
                <tr>
                    <td style={{padding: '0.5rem', border: '1px solid black', textAlign: 'left'}}><strong>Imdb
                        Rating:</strong></td>
                    <td style={{
                        padding: '0.5rem',
                        border: '1px solid black',
                        textAlign: 'left'
                    }}>{details.imdbRating}</td>
                </tr>
                <tr>
                    <td style={{padding: '0.5rem', border: '1px solid black', textAlign: 'left'}}>
                        <strong>Awards:</strong></td>
                    <td style={{padding: '0.5rem', border: '1px solid black', textAlign: 'left'}}>{details.Awards}</td>
                </tr>
                </tbody>
            </table>
        </div>

    );
}

export default Details;
