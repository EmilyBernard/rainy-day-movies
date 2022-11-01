//  Global variables
var search = '';
var trailerSearch;
var searchMovieForm = document.querySelector("#searchMovieForm");
var videoId;

// function that uses the search to play a youtube video
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 
var player;
function callApi() { 
  trailerSearch = search + " trailer";
  var ApiUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + trailerSearch + '&key=AIzaSyAEuOGOFQEVyN6up7iA-a-ABzZHsde4ChU';   
  fetch(ApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      videoId = response.items[0].id.videoId;
      loadVideo(videoId);
    })
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
    callApi();
    movieDbCall();
    store();
    viewHistory() 
   });

    function movieDbCall() {
      var url = "https://api.themoviedb.org/3/search/movie?api_key=3dd58e763b5dcef7202b88abe0351696";
      const newUrl = url + "&query=" + search;
      console.log(newUrl);
       
      fetch(newUrl)
       .then(function (response) {
        return response.json();
       })
         .then(function (response) {
          overview = response.results[0].overview;
          poster = response.results[0].poster_path;
          $("#overview").html(overview);
          $("#poster").attr("src", 'https://image.tmdb.org/t/p/original' + poster);
        
          console.log(poster);
          console.log(overview);
         })
       }

// //Below code uses local storage to render recent searches as buttons lower on the page above the footer

//var submitButton = document.getElementById('button');
var viewed = JSON.parse(localStorage.getItem("viewed")) || []
console.log(viewed)
viewHistory()
submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    });

function store(){
    var searched = document.getElementById('search').value;
    console.log(searched);
    if(viewed.indexOf(searched)=== -1){
      viewed.push(searched)
      localStorage.setItem('viewed', JSON.stringify(viewed));
   
    }
};

function viewHistory(){
  var historyUl=document.getElementById('recent-searches')
  historyUl.innerHTML=""
  for (var i=0; i < viewed.length; i++){
    var value=viewed[i]
    var button=document.createElement("button")
    button.classList.add("button")
    button.textContent=value
    historyUl.append(button)
  }
}
