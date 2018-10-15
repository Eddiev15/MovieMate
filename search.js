var jsonData = {};
var omdbArray = [];

function jsonGrab(queryURL){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        return response;
    });
        // --- outputs JSON data so there's no need to reuse code
}

$("#search-button").on("click",function(event){
    event.preventDefault();

    var input = $("#search").val();
    input.split(' ').join('+');
    tmdbURL = "https://api.themoviedb.org/3/search/multi?api_key=d19279e423255c630256c57ee162db9f&language=en-US&page=1&include_adult=false&query="+input;
    var tmdbData = {};

    $.ajax({
        url: tmdbURL,
        method: "GET",
    }).then(function(response){
        jsonData = response;
        tmdbData = response;

        populateList(tmdbData);
    });

});

// --- --- --- translates TMDB code into actual parsable data --- --- ---
function printGenres(genreData){
    var genres = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" },
        { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" },
        { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" },
        { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" },
        { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" },
        {"id":10759,"name":"Action & Adventure"},{"id":10751,"name":"Family"},{"id":10762,"name":"Kids"},
        {"id":10763,"name":"News"},{"id":10764,"name":"Reality"},{"id":10765,"name":"Sci-Fi & Fantasy"},{"id":10766,"name":"Soap"},{"id":10767,"name":"Talk"},
        {"id":10768,"name":"War & Politics"}];

    var genreOutput = [];
    var j = 0;

    for(var i=0 ; i < genres.length ; i++){
        if(genres[i].id == genreData[j]){
            genreOutput[j] = genres[i].name;
            j++;
        }
    }

    return genreOutput;
}

// --- --- --- makes a new row of data for the table --- --- ---
var sendInfo;

function tables(tmdbData){
    // var tmdbData = tmdb.results[0];
    var tmdbTitle = tmdbData.title;
    var omdbURL = "https://www.omdbapi.com/?t="+tmdbTitle+"&y=&plot=short&apikey=trilogy";

    console.log(tmdbData);

    $.ajax({
        url: omdbURL,
        method: "GET"
    }).then(function(response){
        var omdbData = response;
        console.log(omdbData);

        var newRow = $("<tr>");
        newRow.attr("id",tmdbTitle);

        var name = $("<th>");
        name.attr("data-name",tmdbTitle);
        var nameLink = $("<a>")
        nameLink.addClass("show-link");
        nameLink.text(tmdbTitle);
        name.append(nameLink);

        var rating = $("<th>");
        rating.text(tmdbData.vote_average);

        var genres = $("<th>");
        genres.text(printGenres(tmdbData.genre_ids));

        var length = $("<th>");
        length.text(omdbData.Runtime);

        var rated = $("<th>");
        rated.text(omdbData.Rated);

        var type = $("<th>");
        type.text(tmdbData.media_type);
        type.attr("data-show-type",tmdbData.media_type);

        $("tbody").append(newRow);

        newRow.append(rated).append(rating).append(name).append(type).append(length).append(genres);

        if(tmdbData.media_type == "movie"){
            nameLink.attr("href","movie-test.html");
        } else if(tmdbData.media_type == "tv") {
            nameLink.attr("href","tv-test.html");
        }
    });
}

// --- --- --- loop function for populating tables --- --- ---
function populateList(tmdb){
    var tmdbList = tmdb.results;

    for(var i=0 ; i < tmdbList.length ; i++){
        tables(tmdbList[i]);
    }
}

$(".show-link").on("click",function(){
    
});

<div id="disqus_thread"></div>
<script>

/**
*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
/*
var disqus_config = function () {
this.page.url = file:///C:/Users/Eddie/Desktop/MovieMate-master/mmindex.html;  // Replace PAGE_URL with your page's canonical URL variable
this.page.identifier ='{{comments-box}}'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
*/
(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = 'https://movie-mate.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
                            