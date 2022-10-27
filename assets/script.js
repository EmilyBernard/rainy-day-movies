// Code for search history rendered as a list using local storage (to line 30)
var submitButton = document.getElementById('button');
var viewed = JSON.parse(localStorage.getItem("viewed")) || []
console.log(viewed)
viewHistory()
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    store();
    });

function store(){
    var searched = document.getElementById('search').value;
    console.log(searched);
    if(viewed.indexOf(searched)=== -1){
      viewed.push(searched)
      localStorage.setItem('viewed', JSON.stringify(viewed));
      viewHistory() 
    }
};

function viewHistory(){
  var historyUl=document.getElementById('history')
  historyUl.innerHTML=""
  for (var i=0; i < viewed.length; i++){
    var value=viewed[i]
    var li=document.createElement("li")
    li.textContent=value
    historyUl.append(li)
  }
}

 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
     height: '390',
     width: '640',
     videoId: 'M7lc1UVf-VE',
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
 //    The function indicates that when playing a video (state=1),
 //    the player should play for six seconds and then stop.
 var done = false;
 function onPlayerStateChange(event) {
   if (event.data == YT.PlayerState.PLAYING && !done) {
     setTimeout(stopVideo, 6000);
     done = true;
   }
 }
 function stopVideo() {
   player.stopVideo();
 }
 