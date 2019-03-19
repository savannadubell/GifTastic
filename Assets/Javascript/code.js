// create an array of shows 
var shows = ["American Idol", "The Bachelor", "Boy Meets World", "Chicago Fire", "Full House", "Friends", "Game of Thrones", "Grey's Anatomy", "House of Cards", "Modern Family", "The Office", "Schitt's Creek", "Seinfeld", "Sex and the City", "This Is Us"];

// creates Button for each show 
function makeButtons(){ 
	// deletes the shows prior to adding new shows so there are no repeat buttons
	$('#buttonsLook').empty();
	// loops through the shows array
	for (var i = 0; i < shows.length; i++){
		// Make button for every show in the array above
		var a = $('<button>') 
		a.addClass('show'); 
		a.attr('data-name', shows[i]); 
		a.text(shows[i]); 
		$('#buttonsLook').append(a); 
	}
}

// AddShow button event
$("#addShow").on("click", function(){
	var show = $("#show-input").val().trim();
	shows.push(show);
	makeButtons();
	return false; 
})

// Function to display the gifs
function displayGifs(){
	var show = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&limit=9&api_key=dc6zaTOxFJmzC";

		// creates ajax call
		$.ajax({url: queryURL, method: "GET"}).done(function (response) {
			console.log(response.data);
			var results = response.data;
			for (var i = 0; i < results.length; i++) {
				// creates a generic div to hold the results
				var gifDiv = $('<div class=gifs>');
				var showGif = $('<img>');
					showGif.attr('src', results[i].images.fixed_height_still.url);
					// shows the rating on hover
					showGif.attr('title', "Rating: " + results[i].rating);
					showGif.attr('data-still', results[i].images.fixed_height_still.url);
					showGif.attr('data-state', 'still');
					showGif.addClass('gif');
					showGif.attr('data-animate', results[i].images.fixed_height.url);
				gifDiv.append(showGif)

				$("#gifsView").prepend(gifDiv);
			}
			
		});
}

// function for gifs
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying show gifs
$(document).on("click", ".show", displayGifs);
makeButtons();
