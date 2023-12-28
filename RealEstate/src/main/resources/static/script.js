let map, geo, autoAdress;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  const { Autocomplete } = await google.maps.importLibrary("places")

  const { Geocoder } = await google.maps.importLibrary("geocoding")

  geo = new Geocoder();

  autoAdress = new Autocomplete(document.getElementById("AutoPlace"));

  map = new Map(document.getElementById("map"), {
    center: { lat: 34.7768, lng: 32.42 },
    zoom: 12,
  });

  const marker = new google.maps.Marker({
    map,
    title: "test",
  })

  const clickListener = async function (e) {
    console.log(e.latLng.toString());
    // const place = new google.maps.GeocoderRequest();
    // place.location = ;
    let result = await geo.geocode({ location: e.latLng });
    console.log(result.results);
  }

  map.addListener("click", e => clickListener(e));

  autoAdress.addListener("place_changed", function () {
    console.log(autoAdress.getPlace().geometry.location);
    marker.setPosition(autoAdress.getPlace().geometry.location);
  })
}

initMap();