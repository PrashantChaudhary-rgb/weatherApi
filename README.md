# Weather App

This is a Node.js Express application that fetches real-time weather information for multiple cities from a weather API.

## Endpoint <br>
 /getWeather which accepts the name of the cities as POST body params <br>
 Example Input { "cities": [ "toronto", "mumbai", "london" ] } <br>
 Example Output { "weather": { "toronto": "24C", "mumbai": "34C", "london": "14C" } } 
