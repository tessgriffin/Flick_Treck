var printMovies = function(input){
  var movies = [];
  $.each(input, function(i, movie){
    if(movie.poster_path === undefined || movie.poster_path === null){
      if(movie.title === undefined || movie.title === null ){
        movies.push( "<div class='col lg4 search_div'>"
               + "<li>"
               + "<img src='https://d3a8mw37cqal2z.cloudfront.net/assets/f996aa2014d2ffddfda8463c479898a3/images/no-poster-w185.jpg'/>"
               + "<h5>"
               + movie.name
               + "</h5><a data-movie-id='"
               + movie.id
               + "'data-movie-title='"
               + movie.name
               + "'data-poster-path='"
               + movie.poster_path
               + "' class='btn watchlist waves-effect waves-light blue-grey lighten-1' href='#'>"
               + "Add To Watchlist"
               + "</a>"
               + "</li></div>");
      }
      else {
        movies.push( "<div class='col lg4 search_div'>"
               + "<li>"
               + "<img src='https://d3a8mw37cqal2z.cloudfront.net/assets/f996aa2014d2ffddfda8463c479898a3/images/no-poster-w185.jpg'/>"
               + "<h5>"
               + movie.title
               + "</h5><a data-movie-id='"
               + movie.id
               + "'data-movie-title='"
               + movie.title
               + "'data-poster-path='"
               + movie.poster_path
               + "' class='btn watchlist waves-effect waves-light blue-grey lighten-1' href='#'>"
               + "Add To Watchlist"
               + "</a>"
               + "</li></div>");
      }
    }
    else if(movie.title === undefined || movie.title === null ){
      var title = movie.name.replace("'", "&#8217")
      movies.push( "<div class='col lg4 search_div'>"
               + "<li>"
               + "<img src='http://image.tmdb.org/t/p/w300"
               + movie.poster_path
               + "'/><h5>"
               + title
               + "</h5><a data-movie-id='"
               + movie.id
               + "'data-movie-title='"
               + title
               + "'data-poster-path='"
               + movie.poster_path
               + "' class='btn watchlist waves-effect waves-light blue-grey lighten-1' href='#'>"
               + "Add To Watchlist"
               + "</a>"
               + "</li></div>");
    }
    else {
      var title = movie.title.replace("'", "&#8217")
      console.log(title)
      movies.push( "<div class='col lg4 search_div'>"
               + "<li>"
               + "<img src='http://image.tmdb.org/t/p/w300"
               + movie.poster_path
               + "'/><h5>"
               + title
               + "</h5><a data-movie-id='"
               + movie.id
               + "'data-movie-title='"
               + title
               + "'data-poster-path='"
               + movie.poster_path
               + "' class='btn watchlist waves-effect waves-light blue-grey lighten-1' href='#'>"
               + "Add To Watchlist"
               + "</a>"
               + "</li></div>");
    }
  });
  $("<li/>", {
    "id": "searched_movies",
    html: movies.join( "" )
  }).appendTo( "#searched_movies" );
};

$(function() {
  $("#search_button").on("click", function(){
    $(".search_div").remove();
  });
  $( "#search_button" ).click(function() {
    var input = $("#search_box").val();
    var data = $.getJSON("http://api.themoviedb.org/3/search/multi?query=" + input + "&language=en&api_key=171eae1994f298598bb52dd4d2a6d877", function(){
    })
    .then(function(success) {
      if (success.results.length === 0) {
        $("#no-results").text("Search returned no results.")
      }
      else {
        $("#no-results").empty();
        printMovies(success.results)
      }
    });
    $(document).on("click",".watchlist",function(event){
      event.preventDefault();
      var movieData = { imdb_id: $(this).data("movieId"), title: $(this).data("movieTitle"), poster_path: $(this).data("posterPath")}
      $.post("/user_watchlists", movieData, function(railsControllerResponse){
      });
      $(this).removeClass("blue-grey lighten-1")
      $(this).addClass("green lighten-1")
      $(this).text("added")
    });
  })
});
