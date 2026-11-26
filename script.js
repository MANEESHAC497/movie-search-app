const API_KEY = "http://www.omdbapi.com/apikey.aspx?VERIFYKEY=fea80e4e-183d-479c-8ef4-50aa2b4369bf";

async function searchMovie() {
    const movieName = document.getElementById("searchInput").value;
    const movieContainer = document.getElementById("movieContainer");

    if (movieName === "") {
        movieContainer.innerHTML = "<p>Please enter a movie name!</p>";
        return;
    }

    movieContainer.innerHTML = "<p>Searching for " + movieName + "...</p>";

    try {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}`
        );

        const data = await response.json();

        if (data.Response === "False") {
            movieContainer.innerHTML = "<p>Movie not found!</p>";
            return;
        }

        movieContainer.innerHTML = "";

        data.Search.forEach(movie => {
            movieContainer.innerHTML += `
                <div class="movie-card">
                    <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" alt="${movie.Title}">
                    <h3>${movie.Title}</h3>
                    <p>Year: ${movie.Year}</p>
                    <p>Type: ${movie.Type}</p>
                    </div>
                `;
        });
    } catch (error) {
        movieContainer.innerHTML = "<p>Something went wrong. Please try again!</p>";
    }
}
