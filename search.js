var jsonData = {};

function jsonGrab(queryURL){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        return response;
    });
        // --- outputs JSON data so there's no need to reuse code
}

$("#search-button").on("click",function(){
    event.preventDefault();

    var input = $("#search").val();
    input.split(' ').join('+');
    searchURL = "https://api.themoviedb.org/3/search/multi?api_key=d19279e423255c630256c57ee162db9f&language=en-US&page=1&include_adult=false&query="+input;
    var movieData;

    $.ajax({
        url: searchURL,
        method: "GET"
    }).then(function(response){
        movieTables(response);
        jsonData = response;
    });
});

function printGenres(genreData){
    var genres = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" },
        { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" },
        { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" },
        { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" },
        { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }];

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

function movieTables(movie){
    var movieData = movie.results[0];

    var newRow = $("<tr>");
    newRow.attr("id",movieData.title);

    var name = $("<th>");
    name.text(movieData.title);
    var rating = $("<th>");
    rating.text(movieData.vote_average);
    var genres = $("<th>");
    genres.text(printGenres(movieData.genre_ids));

    $("tbody").append(newRow);

    newRow.append(rating).append(name).append(genres);
}