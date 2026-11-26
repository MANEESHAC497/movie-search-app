function searchMovie() {
    const movieName = document.getElementById("searchInput").value;
    const movieContainer = document.getElementById("movieContainer");

    if (movieName === "") {
        movieContainer.innerHTML = "<p>Please enter a movie name!</p>";
        return;
    }

    movieContainer.innerHTML = "<p>Searching for " + movieName + "...</p>";
}
