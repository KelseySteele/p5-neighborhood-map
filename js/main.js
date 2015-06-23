/*--------Model--------*/

var places = [
        {
            name: "Food Fight! Grocery",
            hours: "10:00 am Ð 8:00 pm",
            address: "1217 SE Stark St",
            zip: "97214",
            url: "http://www.foodfightgrocery.com",
            latitude: "45.519718",
            longitude: "-122.653300"                      
        },
        {
            name: "Blossoming Lotus",
            hours: "11:00 am Ð 9:00 pm",
            address: "1713 NE 15th Ave",
            zip: "97212",
            url: "http://blpdx.com",
            latitude: "45.535536",
            longitude: "-122.650695"
        }
];



//object constructor.
var Location = function(data){
    this.name = data.name;
    this.hours = data.hours;
    this.address = data.address;
    this.url = data.url;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
};

/*--------ViewModel--------*/

var ViewModel = function(){

    //Variables
    var self = this; //Self is the ViewModel Object
    this.locationsArray = [];//not sure why adding this here worked? this is the individual locations within places? 

    //pushes places' property values into the array called locationsArray, so data can be used for markers
    places.forEach(function(locationItem){
            self.locationsArray.push(new Location(locationItem));
    });
    
    //Methods
    
    //Draw the map
    this.drawMap = function(){ //not sure about the this here?
        var portland = new google.maps.LatLng(45.5424364, -122.654422);
        var mapOptions = {
            zoom: 12,
            center: portland,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    
        var i= 0;
        for (i=0; i< locationsArray.length; i++) {
            //code

         //Add infoWindow
        var contentString = '<div id="content">' +
            '<h3>' + locationsArray[i].name + '</h3>' +
            '<p>Address: ' + locationsArray[i].address + '</p>' +
            '<p>Zip: ' + locationsArray[i].zipcode + '</p>' +
            '<p>Hours: ' + locationsArray[i].hours + '</p>' +
            '<p>' + locationsArray[i].url + '</p>' +
            '</div>';
 
        var currentLatLng = new google.maps.LatLng(locationsArray[i].latitude, locationsArray[i].longitude);

        //Add markers to map
        var marker = new google.maps.Marker({
            position: currentLatLng,
            map: map,
            title: locationsArray[i].name
        });
        //Add infoWindow to map
        var infowindow = new google.maps.InfoWindow({
            content: contentString
            });
        marker.setMap(map); //Draws marker on the map.
        //View infoWindow when marker is clicked.
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
        //Use closure on click event to display correct infowindow

        google.maps.event.addListener(marker,'click', (function(marker,contentString,infowindow){
            return function() {
                infowindow.setContent(contentString);
                infowindow.open(map,marker);
                //change the marker when clicked
                marker.setIcon('https://www.google.com/mapfiles/marker_green.png');
            };
        })(marker, contentString, infowindow)); 
                
        }; //End of loop for all locations within locationsArray
    } //End of drawMap

     //Draw the map
     google.maps.event.addDomListener(window, 'load', this.drawMap);

}; //End of ViewModel



ViewModel();






