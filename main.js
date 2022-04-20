
let searchButton = document.querySelector('#search')
searchButton.addEventListener('click', function(){


let apiKey = 'pk.eyJ1IjoiZHVheW5lZGciLCJhIjoiY2wyNWllbXowMDlxdTNpcGdvcDFleXlrciJ9.lYsOTIUWORh4vIAjQVHOSQ'
//API KEY entered into its HTML field
const apiKeyHtml = document.querySelector('#api-key');
apiKeyHtml.value= apiKey; 
console.log(apiKeyHtml.value, "apiHTMLkey")

//URL inputs - endpoint and address
const endpoint = 'mapbox.places';
let addressText = document.querySelector('#address')
let address = addressText.value
console.log(address, 'addressTextValue')


//Encode address for API call
let search_text = encodeURI(address)
console.log(addressText, 'address', search_text, 'searchText')

//API URL with all components - endpoint, searchtext, and API key
let url = `https://api.mapbox.com/geocoding/v5/${endpoint}/${search_text}.json?access_token=${apiKey}`

// Get longitude and latitude from API call to mapbox. 
fetch(url)
    .then(function (httpResponse){
        return httpResponse.json()
    })
    .then(function(data){
        const gpsCoordinates = data.features[0].center
        const  gpsLongitude= data.features[0].center[0]
        const   gpsLatitude= data.features[0].center[1]
        console.log(gpsLatitude, gpsLongitude) // gps lattitude and longitude coordinates works!
        let satelliteId = document.querySelector("#norad") 
        
    // Fetch sattilite API using the following format:

        let  satelliteURL = `https://satellites.fly.dev/passes/${satelliteId.value}?lat=-${gpsLatitude}&lon=${gpsLongitude}&limit=1&days=15&visible_only=true`
       
        console.dir(satelliteId) // satelliteID works! 

        fetch(satelliteURL)
        .then(function(httpResponse){
            return httpResponse.json()
        })
        .then(function (data){
            console.log(data)
           //Time Stamps from Sattilite
           let culminationTimeStamp = data[0].culmination.utc_datetime
           let riseTimeStamp = data[0].rise.utc_datetime
           let setTimeStamp = data[0].set.utc_datetime
          console.log(data[0])
           // TimeStamp HTML locations
           let cTimestamp = document.querySelector('#cTimestamp')
           let rTimestamp = document.querySelector('#rTimestamp')
           let sTimestamp = document.querySelector('#sTimestamp')

           let cStringDate = new Date(culminationTimeStamp).toLocaleTimeString()
           let rStringDate = new Date(riseTimeStamp).toLocaleTimeString()
           let sStringDate = new Date(setTimeStamp).toLocaleTimeString()
           console.log(sStringDate)
           console.log(cStringDate)
           console.log(rStringDate) // Does work, but not showing up in the innerHTML

      
          
           cTimestamp.textContent = cStringDate;
           rTimestamp.textContent = rStringDate;
           sTimestamp.textContent = sStringDate;

           

           



        
        })
    })
})
