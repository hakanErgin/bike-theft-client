# Bike Theft Tracker

## Description

Bike theft tracker tries to increase bicycle safety. Users can check the heatmap provided and see if there are previously stolen bikes in an area to make sure it is safe to park their bikes. Or if they have a stolen bike to report, they can declare a theft with location, date and info about their bike (including photos). So that next user can check the safety of the area.

Using the heatmap does not require any permissions. You may give the app location permissions to see your own location on the map. You may sign up using your google account to report new thefts.

## Specifications

The client is written in React Native. It uses **Google Maps API** to render the map, it also uses a few other **Google Places APIS** when dealing with geolocation processes such as finding addresses. All the API keys are scoped down and restricted, so that they can only be used within this application.
