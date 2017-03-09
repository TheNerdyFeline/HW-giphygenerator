// declare variables
var topics = ["Strong Women", "Girl Power", "Gilmore Girls", "Female Superheros", "Heroines", "Witches"];
var newTopic;

$(document).ready(function(){
    // generate original category buttons
    function renderTopics() {
	$(".giphyButtons").empty();
	for (var i = 0; i < topics.length; i++) {
	    var topicButton = $("<button>");
	    topicButton.addClass("gifTopic");
	    topicButton.attr("data-name", topics[i]);
	    topicButton.text(topics[i]);
	    $(".giphyButtons").append(topicButton);
	}
    };
    
    // display gifs click function
    function gifDisplay () {
	$(".gifs").empty();
	newTopic = $(this).attr("data-name");
	// encodes user input http ready
	var searchTopic = encodeURI(newTopic);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTopic  + "&api_key=dc6zaTOxFJmzC&limit=10";
	$.ajax ({
	    url: queryURL,
	    method: "GET"
	}).done(function(response) {
	    console.log(response);
	    var gifArr = response.data;
	for (var i = 0; i < gifArr.length; i++) {
	    //create an element to hold gif
	    var gifDiv = $("<div>");
	    var newGif = $("<img class='giphy'>");
	    // add attr data-state = still, data-animate = url, data-still = url
	    newGif.attr("src", gifArr[i].images.fixed_height_still.url);
	    newGif.attr("alt", "women");
	    newGif.attr("data-still", gifArr[i].images.fixed_height_still.url);
	    newGif.attr("data-animate", gifArr[i].images.fixed_height.url);
	    newGif.attr("data-state", "still");
	    // create element to hold rating
	    var rating = $("<p class='rating'>");
	    rating.text(gifArr[i].rating);
	    // add to html
	    gifDiv.append(newGif);
	    gifDiv.append(rating);
	    gifDiv.prependTo(".gifs");
	} // close for loop
	});
    };  // close gifDisplay
	
	// make submit function
	$("#addGiphy").on("click", function(event) {
	    event.preventDefault();
	    newTopic = $("#giphyInput").val().trim();
	    topics.push(newTopic);
	    renderTopics();
	});

    // make gif click function to play
    $(document).on("click", ".giphy", function() {
	var state = $(this).attr("data-state");
	if (state === "still"){
	    $(this).attr("src", $(this).attr("data-animate"));
	    $(this).attr("data-state", "animate");
	} else {
	    $(this).attr("src", $(this).attr("data-still"));
	    $(this).attr("data-state", "still");
	}
    });

	renderTopics();

	// click function for topics
	$(document).on("click", ".gifTopic", gifDisplay);

	// close document.ready
    });
