const API_KEY = "a7056534";
async function searchMovie() {
    const movieName = document.getElementById("searchInput").value;
    const movieContainer = document.getElementById("movieContainer");

    if (movieName.trim() === "") {
        movieContainer.innerHTML = "<p>Please enter a movie name!</p>";
        return;
    }

    movieContainer.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}`
        );

        const data = await response.json();

        if (data.Response === "False") {
            movieContainer.innerHTML = `<p>${data.Error}</p>`;
            return;
        }

        movieContainer.innerHTML = "";

        data.Search.forEach(movie => {
            movieContainer.innerHTML += `
                <div class="movie-card"
                     onclick="showMovieDetails('${movie.imdbID}')"
                     style="cursor:pointer;">

                    <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}"
                         alt="${movie.Title}">

                    <h3>${movie.Title}</h3>
                    <p>Year: ${movie.Year}</p>
                    <p>Type: ${movie.Type}</p>
                    <button onclick="event.stopPropagation(); toggleFavorite('${movie.imdbID}')">
    ❤️ Add to Favorites
</button>
                    <p>View Details 👆</p>
                </div>
            `;
        });

    } catch (error) {
        movieContainer.innerHTML = "<p>Something went wrong!</p>";
    }
}

async function showMovieDetails(imdbID) {
    const movieContainer = document.getElementById("movieContainer");

    movieContainer.innerHTML = "<p>Loading movie details...</p>";

    try {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
        );

        const movie = await response.json();

        if (movie.Response === "False") {
            movieContainer.innerHTML = "<p>Details not found!</p>";
            return;
        }

        movieContainer.innerHTML = `
            <div class="movie-card" style="width:300px;">
                <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}"
                     alt="${movie.Title}">

                <h2>${movie.Title}</h2>
                <p><b>Year:</b> ${movie.Year}</p>
                <p><b>IMDb Rating:</b> ${movie.imdbRating}</p>
                <p><b>Director:</b> ${movie.Director}</p>
                <p><b>Actors:</b> ${movie.Actors}</p>
                <p><b>Genre:</b> ${movie.Genre}</p>
                <p><b>Released:</b> ${movie.Released}</p>
                <p><b>Plot:</b> ${movie.Plot}</p>

                <button onclick="searchMovie()">Back to Movies</button>
            </div>
        `;

    } catch (error) {
        movieContainer.innerHTML = "<p>Unable to load details!</p>";
    }
}
function toggleFavorite(imdbID) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(imdbID)) {
        favorites = favorites.filter(id => id !== imdbID);
    } else {
        favorites.push(imdbID);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    showFavorites();
}
async function showFavorites() {
    const container = document.getElementById("favoritesContainer");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        container.innerHTML = "<p>No favorite movies yet!</p>";
        return;
    }

    container.innerHTML = "<p>Loading favorites...</p>";

    let html = "";

    for (const id of favorites) {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
        );

        const movie = await response.json();

        if (movie.Response === "True") {
            html += `
                <div class="movie-card">
                    <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}">
                    <h3>${movie.Title}</h3>
                    <p>Year: ${movie.Year}</p>
                    <p>IMDb Rating: ${movie.imdbRating}</p>
                    <button onclick="toggleFavorite('${id}')">
                        Remove ❤️
                    </button>
                </div>
            `;
        }
    }

    container.innerHTML = html;
}


