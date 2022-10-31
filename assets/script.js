//  Global variables
var search = '';
var trailerSearch;
var searchMovieForm = document.querySelector("#searchMovieForm");
var videoId;

var buttonEl = document.querySelector("#search");
var movieSearch = document.querySelector("#search");

var url =
  "https://api.themoviedb.org/3/search/movie?api_key=3dd58e763b5dcef7202b88abe0351696";
var apiKey = "3dd58e763b5dcef7202b88abe0351696";
var imageUrl = "https://image.tmdb.org/t/p/w1280";

// function that uses the search to play a youtube video
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 
var player;
function callApi() { 
  trailerSearch = search + " trailer";
  console.log('search state: ' + search)
  console.log('trailer search: ' + trailerSearch);
  var ApiUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + trailerSearch + '&key=AIzaSyAEuOGOFQEVyN6up7iA-a-ABzZHsde4ChU';   
  fetch(ApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log('apicall in api call function: ' + ApiUrl);
      videoId = response.items[0].id.videoId;
      console.log('this is the videoid in the function: ' + videoId);
      loadVideo(videoId);
    })
    console.log('this is videoid outside the .then ' + videoId);
    return videoId;
}
  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoId,
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
  // 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}   
  // 5. The API calls this function when the player's state changes.
  var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      done = true;
    } 
  }
  function stopVideo() {
    player.stopVideo();
  } 
function loadVideo(videoId) {
  if(player) { player.loadVideoById(videoId); 
    
  }

}

  searchMovieForm.addEventListener("submit", function () {
    event.preventDefault();
    search = $("#search").val().trim();
    console.log(search);
    callApi();
    //  console.log('test');
    //  const value = movieSearch.value;
    //  console.log("Value: ", value);
    //  const newUrl = url + "&query=" + value;
    // console.log(newUrl);
    //  fetch(newUrl)
    //    .then((res) => res.json())
    //    .then((data) => {
    //      const movies = data.results;
    //      var output = '';
        //  $.each(movies, index, movie) => {
        //   ouput += `
        //   <div class="movie-container">
        //   <div class="well text-center">
        //   <img src=${movie.poster_path}
        //   <h4>${movie.title}</h4>
        //   <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
        //   </div>
        //   </div>
        //   `;
        //  }
      //    console.log(data);
      //    4(".movie-container").html(output);
      //  })
      //  .catch((error) => {
      //    console.log(error);
      //  });
   });
   


// function showMovie() {
//   var movieEl = document.createElement("div");
//   movieEl.setAttribute("class", "movie");
//   movieEl.innerText = data.page.results
// } 


// //Below code uses local storage to render recent searches as buttons lower on the page above the footer

// var submitButton = document.getElementById('button');
// var viewed = JSON.parse(localStorage.getItem("viewed")) || []
// console.log(viewed)
// viewHistory()
// submitButton.addEventListener("click", function(event) {
//     event.preventDefault();
//     store();
//     });

// function store(){
//     var searched = document.getElementById('search').value;
//     console.log(searched);
//     if(viewed.indexOf(searched)=== -1){
//       viewed.push(searched)
//       localStorage.setItem('viewed', JSON.stringify(viewed));
//       viewHistory() 
//     }
// };

// function viewHistory(){
//   var historyUl=document.getElementById('recent-searches')
//   historyUl.innerHTML=""
//   for (var i=0; i < viewed.length; i++){
//     var value=viewed[i]
//     var button=document.createElement("button")
//     button.classList.add("button")
//     button.textContent=value
//     historyUl.append(button)
//   }
// }
