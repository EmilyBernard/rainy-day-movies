const getMovie = document.querySelector(".search");
let button = document.querySelector('.search')

button.addEventListener("click", function getMovie (){
    fetch("https://api.themoviedb.org/3/movie/550?api_key=3dd58e763b5dcef7202b88abe0351696")
    console.log(getMovie)
})