#Neighborbood Map Project

##Overview

This is an app of Portland, Oregon with marked locations of vegan restaurants and vegan businesses. The map was created with Google’s map API, Instagram API, and knockout.js. 

To start the app, click on the index.html file.

Click on one of the markers of the map to display an info window that shows additional details about a location:  the name, hours of operation, website address, and a photo taken at the street view of the location. 

On the left side of the map, you will find a sidebar that lists all of the locations. You can click on the locations in the sidebar and the corresponding marker will change color. 

Click on the Instagram logo in the sidebar to view Instagram photos that have been tagged with the selected business/location.  If no locations are selected and you click on the Instagram logo, you will be able to view Instagram photos that have been tagged with “veganportland”. 

##Development Process

###Make the Map

Set up the places data in a model of the main.js. 
  
Here are my names for setting up the data: 
places: An array of places of interest and their properties( location hours, etc): 
location: An object constructor for each location on the map. locationsArray: An array of objects containing each of the location objects created from the places data. This is created with a push method. 
  
###Get the Google Map to show.

The function “drawMap” is used to display a Google map displayed around Portland, Oregon. I used   Google’s Map API examples as a reference for getting this to work. I nested the “drawMap” function within a ViewModel       function. 
Markers with Info Windows

Store the data for each marker. I created the markers by using Google’s Map API examples again. I created a variable called currentLatLng to add latitude and longitude values to each marker. 

###Add markers to the map.

“Marker.setMap(map)” draws a marker on the map, but since I had multiple markers/locations, I created a “markersArray” which uses a push method to add each marker into the array. 

###Add Info Window to each marker. 

I used Google’s Map API examples yet again to create info windows. This entailed creating a content sting that converted the locations array property values into DOM elements such as h3 heading for the name of the location and paragraphs for the location and hours data.

I used a “for loop” to create info window for each location in the “locationsArray”. I then added a click event listener to each maker so that the info window displayed when a maker was clicked. 

The problem came about that I would get multiple info windows when I clicked on more than one marker. To solve this, I moved the creation of the info window outside of the “for loop”, so that there was only one info window rather than one for each location in the “locationsArray”. 

###Make markers change color. 

I added global variables called “normalIcon” and “selectedIcon”. These variables contain the icon image, but in different colors.

I added an icon property to the marker variable that is given the value of “normalIcon”. Then, I changed the property value to “selectedIcon” inside of the event listener function that displays the info window when the icon is clicked. 

I also created a “markerReset” function that changes all of the markers back to “normalIcon” when the info window is closed and when another marker is clicked. This ensures that only one marker is the color of the “slectedIcon” and only when it has been clicked. 

##Sidebar with list of locations

###Create div/sidebar on top of map. 

I found out from “EchoEcho” that I could layer divs by using CSS’s Z-index. I created a container with relative positioning and a sidebar with absolute positioning, apparently this is necessary in order to layer divs and to use the Z-index property affectively. I gave the sidebar a Z-index of 99, so that it was guaranteed to have a higher Z-index than the map and thus be placed on top of the map. 

###Use knockout.js to display locations on sidebar. 

Up until this point, I had not been using knockout or observables. In order to data-bind the data from the places array to DOM elements in the sidebar, I turned the “Location” property values into observables and the “locationsArray” into an observable array. 

After quite a bit of frustration at disappearing map markers, I learned that when I do this, I have to add “()” after the observables in other parts of the code where I used the observable. This is because knockout turns each of the values into functions. 

I then added “data-bind= “text: property name” to the appropriate DOM element in the sidebar and resulted in a successfully listed set of location names. 

###Fix map resize issue. 

One of my issues at this point was that when I resized the map, I was left with blank white space at the bottom of the map. In order to remedy this problem, I added a “resizeMap” function, which reset the height of the map to the height of the browser window. 

##Add Search Bar

###Add an input box to the html document.

Filter through the array of locations for the first letter of the location’s name. I modeled the code found at knockmeout.net, which used knockout utilities to filter through the array of locations. The code can be found at this link: http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html. 

I replaced “items” with “locationsArray” and “item” with “location”. I also made the “filter” an observable array so that I could data-bind the filter to the input box in the html document. 

###Add stringStartsWith. 

According to several sources, “stringStartsWith” is not a utility function included in knockout.js, so I added the function to my main.js file. I used the code posted on a GitHub forum as a model for my own code. Here is the link: 
https://github.com/knockout/knockout/issues/401 

###Data-bind filteredItems to each li element. 

The filter/search bar still wasn’t working, so through console logging the filteredItems array and getting no results, I discovered that I needed to data-bind filteredItems to the li elements instead of the locationsArray. This way, each location in the locationsArray is also an item in the filteredItems array. 

##Asynchronously Load Google's Map API

###Add Google’s map api address and key to a loadScript function in the main.js file. 

I used the code in Google’s “Asynchronous Loading” documentation, but used the Google’s map address with my identification key. I also removed this address from the index.html file. 
https://developers.google.com/maps/documentation/javascript/examples/map-simple-async 

###Create an intitialize function that contains the applyBindings function. 

As instructed by Google’s documentation, I made the “loadScript” function call an initialize function. The initialize function calls the knockout binding function, which I moved from the bottom of the main.js file. 

Create an on error function within the loadScript function. I referenced W3School’s documentation to write an “onerror” function within the “loadScript” function that sends an alert when Google’s map api cannot load properly. 
http://www.w3schools.com/jsref/event_onerror.asp 

##Add Instagram API

###Add Instagram icon image to the sidebar.

Create div (photoPanel) that appears when the Instagram icon is clicked. I created “photoPanel” in the index.html file with the CSS property of visibility as hidden. I then used knockout to data bind a function called “openInstagram” to the Instagram Icon. This function changes the CSS of the div to have a visibility value of “visible”. 

I also created a function called “closeInstagram” which changes the visibility value of the “photoPanel” back to “hidden”. This function is called when the X in the left hand corner of the “photoPanel” div is clicked. 

###Add Instagram pictures to photoPanel for the initial tag of #veganportland. 
In the process of successfully using Instagram’s API, I found Sara Viera’s documentation at Developer Drive and code examples at Codepen to be tremendously helpful. Here are the links to the pages that I used: 

http://www.developerdrive.com/2014/02/how-to-use-the-instagram-api/ 

http://codepen.io/SaraVieira/pen/HgFkL 

I wanted to break up the process of using Instagram for each location into smaller pieces, so I first made sure that I could display six Instagram photos for “#veganportland” in the “photoPanel”.  This became the default location when no specific location was selected.

I did this by creating a function called “getInstagram” within the “ViewModel” of the main.js file. This function made the Ajax request for Instagram’s API. I downloaded this function upon load, so that the Instagram pictures were on the “photoPanel” before the user clicked on the Instagram icon. This saves wait time for the user for when they actually do click the Instagram icon. 

The Ajax request worked successfully, but a problem arose when I tried to change the css. I wanted to make the pictures responsive so that when the user’s window was at full screen, there were two rows of three pictures. When the window became smaller, I wanted the pictures to stack on top of each other. 

For the longest time, despite added media query elements and a float: left property, the pictures were stubbornly stacked on top of each other no matter the window size. After considerable frustration, I rediscovered the miracle of dev tools and found out that the images from Instagram were getting styled into an li element that was styled from an outside source. 

I would guess this style was coming from either Google’s Map API or Instagram’s API. In order to solve this problem, I got rid of all li elements within the div that held the photos. I then styled the photos in the main.js file. This worked. ☺ 

###Add Instagram pictures that change depending on the selected location. 

I wanted the Instagram pictures to change depending on which marker or sidebar location was selected. In order to do this, I created a knockout variable called “currentLocation”. 

The “currentLocation” variable indicated which location was selected. When a marker or sidebar location was selected, the “currentLocation” was set to equal the location’s name or title (if it was a marker). If no location was selected, the “currentLocation” variable was set to equal the default location of “Vegan in Portland”. 

Then, within the “getInstagram” function, I created an if statement that said if the “currentLocation” was equal to one of the names within the “locationsArray”, then the “tagName” (a variable created within the “getInstagram” function) was equal to the “tagName” value of the matching location within the “locationsArray”. 

The “tagName” was then added to Instagram’s API url, which changed the pictures displayed by Instagram in the “photoPanel”. The “currentLocation” was also data-bound to the “photoPanel”, so that the appropriate location name is now always displayed above the Instagram photos. 

###Clear out Instagram pictures. 

I created a “removePhotos” function, which removes the pictures displayed be Instagram. When another location is clicked, the “removePhotos” function is called within the “getInstagram” function.  The previous location’s photos are then removed and the new pictures can take their place. 

###Reset Instagram to the Default tagName and currentLocation. 

After a location is no longer selected, I needed a way to change the “photoPanel” back to it’s original , default state of using a tagName of “veganportland” and a header of “Vegan in Portland”. I created a “resetInstagram” function, which changed the Instagram variables back to their default settings. This function is called when the “infoWindow” is closed. 

###Add Google Map’s Street View Feature to Info Windows.

Use code described in Udacity’s sub project guidelines. As a way to make my application extra special, I added a street view picture from Google maps to the info window attached. 

I created a variable with a street view url that incorporated the marker’s latitude and longitude values. I created this url by referencing one of Udacity’s sub projects which used Google’s street view url to form the background of a simple practice app. Here is the link to Udacity’s sub project instructions: 

https://www.udacity.com/course/viewer#!/c-ud110-nd/l-3310298553/e-3180658599/m-3180658600 

I then added the url to the “contentString” that is data bound to the info window.

##Summary of References

Here is a list of several sources that I found most helpful in completing this project. 

*	Udactiy’s online video courses:
**JavaScript Design Patterns, 
**	Intro to AJAX 
*	Practice Move Planner App Sub-project
* Stack Overflow
* Codepen
* Google Map’s API Documentation 
* Instagram’s API Documentation 
* Knockout.JS Documentation and Tutorial Videos 
