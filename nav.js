/**
 * File: nav.js, created by Peter Welby 7 Sep. 2015
 * This script implements a single-page navigation system inspired by
 * Curran Kelleher's Single Page Navigation tutorial:
 * https://github.com/curran/screencasts/tree/gh-pages/navigation
 */

// Can't change the content of the page before it's loaded, so wait.
// Could also use the "DOMContentLoaded" event, but there's barely
// anything on the page anyway so it has the same effect
window.onload = function(){
    if(!location.hash) {
        location.hash = "#intro";
    }

    // Must call navigate() to show content when the page first loads
    navigate();

    // Add navigate() as a handler for the hashchange event
    window.addEventListener("hashchange", navigate);

    // Handle the user's attempts to navigate.
    //
    function navigate() {
        var fragment = location.hash.substr(1),
            contentDiv = document.getElementById("ContentArea");

        fetchContent(fragment, function(content){
            contentDiv.innerHTML = content;
        });

        // Update the active class for links
        setActiveLink(fragment);
    }

    // Update the active class attribute for each link in the nav area
    function setActiveLink(fragment){
        var links = document.querySelectorAll("#NavArea a"),
            i, pageName;

        for(i = 0; i < links.length; i++){
            pageName = links[i].getAttribute("href").substr(1);
            if(pageName === fragment) {
                links[i].setAttribute("class", "active");
            } else {
                links[i].removeAttribute("class");
            }
        }
    }

    // Fetch HTML content by fragment ID, then hand it back
    // via the callback provided
    // (note: the only callback used sets the ContentArea's innerHTML attribute
    // to the full content of the response)
    function fetchContent(fragment, callback){
        var request = new XMLHttpRequest();

        request.onload = function() {
            callback(request.responseText);
        };

        request.open("GET", fragment + ".html");
        request.send(null);
    }
};