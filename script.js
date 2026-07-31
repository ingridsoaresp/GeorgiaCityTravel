"use strict";
/*  JavaScript 7th Edition
    Chapter 10
   

    Driving Directions
    Author: Ingrid Pimentel
    Date: 11/5/2025

   
*/

let driveFind;
let driveDraw;
let myMap;

function showMap() {
   
   // Page objects
   let driveMap = document.getElementById("driveMap");
   let driveDirections = document.getElementById("driveDirections");
   let startingPoint = document.getElementById("startingPoint");
   let endingPoint = document.getElementById("endingPoint");  
   
   driveFind = new google.maps.DirectionsService();
   driveDraw = new google.maps.DirectionsRenderer();

   const city = { lat: 34.084050, lng: -84.669886 };

   myMap = new google.maps.Map(driveMap, {
    zoom: 12,
    center: city,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true
   });

   startingPoint.addEventListener("change", drawRoute);
   endingPoint.addEventListener("change", drawRoute);
} 

function drawRoute() {
    const startingPoint = document.getElementById("startingPoint");
    const endingPoint = document.getElementById("endingPoint");
    const driveDirections = document.getElementById("driveDirections");

    if (startingPoint.selectedIndex !== 0 && endingPoint.selectedIndex !== 0) {
        const driveRoute = {
            origin: startingPoint.value,
            destination: endingPoint.value,
            travelMode: google.maps.TravelMode.DRIVING
        };

        driveFind.route(driveRoute, (result, status) => {
            if (status === "OK") {
                driveDraw.setDirections(result);
                driveDraw.setMap(myMap);
                driveDraw.setPanel(driveDirections);
            } else {
                driveDirections.textContent = `Directions Unavailable: ${status}`;
                console.warn("Directions status:", status, result);
            }
        });
    }
}

window.showMap = showMap;