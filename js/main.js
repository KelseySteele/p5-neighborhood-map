/*--------Model--------*/

var places = [
        {
            name: "Blossoming Lotus",
            hours: "11:00 am to 9:00 pm",
            address: "1713 NE 15th Ave",
            zipcode: "97212",
            url: "http://blpdx.com",
            latitude: "45.535536",
            longitude: "-122.650695"
        },
        {
            name: "Food Fight! Grocery",
            hours: "10:00 am to 8:00 pm",
            address: "1217 SE Stark St",
            zipcode: "97214",
            url: "http://www.foodfightgrocery.com",
            latitude: "45.519718",
            longitude: "-122.653300"                      
        },
        {
            name: "Harlow",
            hours: "8:00 am to 9:00 pm",
            address: "3632 SE Hawthorne Blvd",
            zipcode: "97214",
            url: "http://www.harlowpdx.com/",
            latitude: "45.511974",
            longitude: "-122.626056"                      
        },
        {
            name: "Herbivore Clothing Co.",
            hours: "10:00 am to 6:00 pm",
            address: "1211 SE Stark St",
            zipcode: "97209",
            url: "http://www.herbivoreclothing.com/",
            latitude: "45.519937",
            longitude: "-122.653313"
        },
        {
            name: "Petunia's Pies & Pastries",
            hours: "9:00 am to 7:00 pm",
            address: "610 SW 12th Ave",
            zipcode: "97205",
            url: "http://petuniaspiesandpastries.com/",
            latitude: "45.521157",
            longitude: "-122.683692"                      
        },
        {
            name: "Portobello Vegan Trattoria",
            hours: "5:30 pm to 9:00 pm",
            address: "1125 SE Division St",
            zipcode: "97214",
            url: "http://portobellopdx.com/",
            latitude: "45.505438",
            longitude: "-122.654195"                      
        },
        {
            name: "Prasad",
            hours: "7:30 am to 8:00 pm",
            address: "925 NW Davis St",
            zipcode: "97209",
            url: "http://www.prasadcuisine.com/",
            latitude: "45.524797",
            longitude: "-122.680821"
        }
];



//object constructor.
var Location = function(data){
    this.name = ko.observable(data.name);
    this.hours = ko.observable(data.hours);
    this.address = ko.observable(data.address);
    this.zipcode = ko.observable(data.zipcode);
    this.url = ko.observable(data.url);
    this.latitude = ko.observable(data.latitude);
    this.longitude = ko.observable(data.longitude);
};

/*--------ViewModel--------*/

var ViewModel = function(){

    //Variables
    var self = this; //Self is the ViewModel Object
    this.locationsArray = ko.observableArray([]); //not sure why adding this here worked? this is the individual locations within places? 
    self.filter = ko.observable(""); // Stores the search box text. It is intitially empty
    markersArray = []; 
    //Marker icons based on selection state
    var selectedIcon = 'http://www.google.com/mapfiles/marker.png',
        normalIcon = 'https://www.google.com/mapfiles/marker_green.png',
        selectedName = 'purple',
        normalName = '#666666';

    //pushes places' property values into the array called locationsArray, so data can be used for markers
    places.forEach(function(locationItem){
            self.locationsArray().push(new Location(locationItem));
    });
    
    
    
    //Methods
    
    // Makes the map height equal to the hight of the browser window. Google map requires that the hight of the map be defined in pixels
    //and not as 100%. 
    self.resizeMap = function(){
            $(function(){ //why is there a function within a function here? 
                $("#map").css("height", $(window).height());
        });
    };
    //Draw the map
    self.drawMap = function(){ //not sure about the this here?
        
        var portland = new google.maps.LatLng(45.5224000, -122.680004);
        var mapOptions = {
            zoom: 13,
            center: portland,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        //Add infoWindow to map
        var infowindow = new google.maps.InfoWindow({
            content: contentString
            });
        
        var i= 0;
        
        for (i=0; i< self.locationsArray().length; i++) {
            //code

         //Add infoWindow
        var contentString = '<div id="content">' +
            '<h3>' + self.locationsArray()[i].name() + '</h3>' +
            '<p>Address: ' + self.locationsArray()[i].address() + '</p>' +
            '<p>Zipcode: ' + self.locationsArray()[i].zipcode() + '</p>' +
            '<p>Hours: ' + self.locationsArray()[i].hours() + '</p>' +
            '<p>' + self.locationsArray()[i].url() + '</p>' +
            '</div>';
       

        //Adds latitude and longitude value to each marker
        var currentLatLng = new google.maps.LatLng(self.locationsArray()[i].latitude(), self.locationsArray()[i].longitude());

        //Add markers to map
        var marker = new google.maps.Marker({
            position: currentLatLng,
            map: map,
            title: self.locationsArray()[i].name(),
            icon: normalIcon
        });
        
        //Draws marker on the map
        marker.setMap(map);
        
        //Push each marker into markersArray
        markersArray.push(marker);
        
        //Reset icon to normalIcon when infowindow is closed.
        google.maps.event.addListener(infowindow, 'closeclick', self.markerReset);

        //Use closure on click event to display correct infowindow
        google.maps.event.addListener(marker,'click', (function(marker,contentString,infowindow){
            return function() {
                //Resets all markers back to normalIcon, so only one is red.
                self.nameReset(); //Turns names back to gray when new marker is clicked.
                self.markerReset();
                infowindow.setContent(contentString);
                infowindow.open(map,marker);
                //Change the marker when clicked
                this.setIcon(selectedIcon);
            };
        })(marker, contentString, infowindow));
        
                
        } //End of loop for all locations within locationsArray
        
        

    }; //End of drawMap
    
    //Reset previously clicked place names in sidebar back to normal gray color. 
    self.nameReset = function(){
                $(".placeName").css("color", normalName);
        };
    
    //Reset previously clicked markers back to normalIcon
    self.markerReset = function(){
        for(var j = 0; j < markersArray.length; j++){
            markersArray[j].setIcon(normalIcon);
        }
    };
    

    //When name of location in sidebar is clicked, marker turns red.
    self.showMarker = function(data, event){
        var nameClicked = $(event.target).text();
        self.nameReset();//Reset names' color of locations back to gray.
        self.markerReset(); //Reset markers to normalIcon.
        for (i=0; i< markersArray.length; i++) {
            if (nameClicked === markersArray[i].title) {
                markersArray[i].setIcon(selectedIcon);
               // Changes color of place name to purple when clicked.
            $(event.target).css("color", selectedName);
            
            }
        }

        };
        
    self.stringStartsWith = function (string, startsWith) {          
        string = string || "";
        if (startsWith.length > string.length)
            return false;
        return string.substring(0, startsWith.length) === startsWith;
    };
        

    //filter items using filter text.
    self.filteredItems = ko.computed(function() {
        var filter = self.filter().toLowerCase();
        if (!filter) {
            return self.locationsArray();
        } else {
            return ko.utils.arrayFilter(self.locationsArray(), function(Location) {
                return self.stringStartsWith(Location.name().toLowerCase(), filter);
            });
        }
    }, self.locationsArray);
    
    
    // Executes methods and listeners
    
    //Resize the map to be same size as window onload.
    self.resizeMap();
    //Resize map when user resizes map
    window.addEventListener('resize', self.resizeMap);
    //Draw the map
     google.maps.event.addDomListener(window, 'load', this.drawMap);
     
     


}; //End of ViewModel


ko.applyBindings(new ViewModel());




