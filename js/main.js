/*--------Model--------*/

var places = [
        {
            name: "Blossoming Lotus",
            hours: "11:00 am Ð 9:00 pm",
            address: "1713 NE 15th Ave",
            zipcode: "97212",
            url: "http://blpdx.com",
            latitude: "45.535536",
            longitude: "-122.650695"
        },
        {
            name: "Food Fight! Grocery",
            hours: "10:00 am Ð 8:00 pm",
            address: "1217 SE Stark St",
            zipcode: "97214",
            url: "http://www.foodfightgrocery.com",
            latitude: "45.519718",
            longitude: "-122.653300"                      
        },
        {
            name: "Harlow",
            hours: "8:00 am Ð 9:00 pm",
            address: "3632 SE Hawthorne Blvd",
            zipcode: "97214",
            url: "http://www.harlowpdx.com/",
            latitude: "45.511974",
            longitude: "-122.626056"                      
        },
        {
            name: "Herbivore Clothing Co.",
            hours: "10:00 am Ð 6:00 pm",
            address: "1211 SE Stark St",
            zipcode: "97209",
            url: "http://www.herbivoreclothing.com/",
            latitude: "45.519937",
            longitude: "-122.653313"
        },
        {
            name: "Petunia's Pies & Pastries",
            hours: "9:00 am Ð 7:00 pm",
            address: "610 SW 12th Ave",
            zipcode: "97205",
            url: "http://petuniaspiesandpastries.com/",
            latitude: "45.521157",
            longitude: "-122.683692"                      
        },
        {
            name: "Portobello Vegan Trattoria",
            hours: "5:30 pm Ð 9:00 pm",
            address: "1125 SE Division St",
            zipcode: "97214",
            url: "http://portobellopdx.com/",
            latitude: "45.505438",
            longitude: "-122.654195"                      
        },
        {
            name: "Prasad",
            hours: "7:30 am Ð 8:00 pm",
            address: "925 NW Davis St",
            zipcode: "97209",
            url: "http://www.prasadcuisine.com/",
            latitude: "45.524797",
            longitude: "-122.680821"
        }
];



//object constructor.
var Location = function(data){
    this.name = data.name;
    this.hours = data.hours;
    this.address = data.address;
    this.zipcode = data.zipcode;
    this.url = data.url;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
};

/*--------ViewModel--------*/

var ViewModel = function(){

    //Variables
    var self = this; //Self is the ViewModel Object
    this.locationsArray = []; //not sure why adding this here worked? this is the individual locations within places? 
    markersArray = []; 
    //Marker icons based on selection state
    var selectedIcon = 'https://www.google.com/mapfiles/marker_green.png',
        normalIcon = 'http://www.google.com/mapfiles/marker.png';

    //pushes places' property values into the array called locationsArray, so data can be used for markers
    places.forEach(function(locationItem){
            self.locationsArray.push(new Location(locationItem));
    });
    
    //Methods
    
    //Draw the map
    this.drawMap = function(){ //not sure about the this here?
        
        var portland = new google.maps.LatLng(45.5224000, -122.654422);
        var mapOptions = {
            zoom: 13,
            center: portland,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var infowindow = new google.maps.InfoWindow({
            content: contentString
            });
        
        var i= 0;
        for (i=0; i< locationsArray.length; i++) {
            //code

         //Add infoWindow
        var contentString = '<div id="content">' +
            '<h3>' + locationsArray[i].name + '</h3>' +
            '<p>Address: ' + locationsArray[i].address + '</p>' +
            '<p>Zipcode: ' + locationsArray[i].zipcode + '</p>' +
            '<p>Hours: ' + locationsArray[i].hours + '</p>' +
            '<p>' + locationsArray[i].url + '</p>' +
            '</div>';
        //Add infoWindow to map

        
        var currentLatLng = new google.maps.LatLng(locationsArray[i].latitude, locationsArray[i].longitude);

        //Add markers to map
        var marker = new google.maps.Marker({
            position: currentLatLng,
            map: map,
            title: locationsArray[i].name
        });
        
        //Draws marker on the map
        marker.setMap(map);
        
        //Push each marker into markersArray
        markersArray.push(marker);
        
        //Reset previously clicked markers back to normalIcon
        var markerReset = function(){
            for(var j = 0; j < markersArray.length; j++){
                markersArray[j].setIcon(normalIcon);
            }
        };
        
        //Reset icon to normalIcon when infowindow is closed.
        google.maps.event.addListener(infowindow, 'closeclick', markerReset);

        //Use closure on click event to display correct infowindow
        google.maps.event.addListener(marker,'click', (function(marker,contentString,infowindow){
            return function() {
                markerReset();
                infowindow.setContent(contentString);
                infowindow.open(map,marker);
                //change the marker when clicked
                this.setIcon(selectedIcon);
            };
        })(marker, contentString, infowindow)); 
                
        }; //End of loop for all locations within locationsArray
        

    } //End of drawMap

     //Draw the map
     google.maps.event.addDomListener(window, 'load', this.drawMap);

}; //End of ViewModel



ViewModel();






