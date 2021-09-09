currentUnits = "C"
oppositeUnits = {"C":"F","F":"C"};
currentTempK = 0;

$(document).ready(function() {
  console.log(ready);
    // Only change code below this line.
  if (navigator.geolocation) {
pos = navigator.geolocation.getCurrentPosition(success);
}
 $(".convert").on("click",
      convertPressed);
});

function success(pos)
{
  var owAPI = "http://api.openweathermap.org/data/2.5/weather?"
  var apiID = "f4bf4a934d397e7da919ac913410cfdf"
  lat = pos.coords.latitude;
  long = pos.coords.longitude;
  var serverString = owAPI+"lat="+lat+"&lon="+long+"&callback=?&appid="+apiID;
console.log(serverString);
    $.ajax({
      dataType: "jsonp",
      url: serverString,
      success: callback
    });
 }

function callback(json)
{
  console.log(json.weather[0].description);
  console.log(json.name);
  $("#placeName").html(json.name+", "+json.sys.country)
  currentTempK = json.main.temp
  updateTemp(currentTempK);
  $("#description").html(capitalizeFirst(json.weather[0].description));
  $("#weatherIcon").attr("src","http://openweathermap.org/img/w/"+json.weather[0].icon+".png")
}
  
function updateTemp(tempK)
{

  if (currentUnits == "C")
    {
      temp = tempK - 273.15; 
    }
  else
    {
      temp = (tempK-273.15)*1.8+32;
    }
    $("#temp").html(temp.toFixed(1)+"&deg"+currentUnits);
 $(".convert").html("to &deg"+oppositeUnits[currentUnits]);
    
}

function convertPressed()
{
  currentUnits = oppositeUnits[currentUnits];
  updateTemp(currentTempK)
 
}
  // Only change code above this line.

function capitalizeFirst(str)
{
  splitted = str.split(" ");
  capitalized = splitted.map(function(val){
             return val.charAt(0).toUpperCase()+val.slice(1)
                         });
   return capitalized.join(" ");
}