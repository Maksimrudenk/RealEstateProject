class home {
  constructor(dto) {
    this.Id = dto.Id;
    this.adress = dto.adress;
    this.lat = dto.lat;
    this.lng = dto.lng;
    this.description = dto.description;
    this.rent = dto.rent;
    this.telephone = dto.telephone;
  }
}

const baseUrl = 'http:localhost:8080';
const baseLocation = { lat: 34.7768, lng: 32.42 };

let map, autoAdress;

async function httpGET(uri = '', requestHeaders = [[]]){
  let fetchInit = {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
  };
  if(requestHeaders !== null){
      fetchInit.headers = requestHeaders;
  }
  const response = await fetch(baseUrl + uri, fetchInit);
  const json = await response.json();
  return json;
}

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  const { Autocomplete } = await google.maps.importLibrary("places")

  autoAdress = new Autocomplete(document.getElementById("AutoPlace"));

  map = new Map(document.getElementById("map"), {
    center: baseLocation,
    zoom: 12,
  });

  // const marker = new google.maps.Marker({
  //   map,
  //   title: "test",
  // })

  const clickListener = async function (e) {
    console.log(e.latLng.toString());
    console.log(result.results);
  }

  map.addListener("click", e => clickListener(e));

  autoAdress.addListener("place_changed", function () {
    console.log(autoAdress.getPlace().geometry.location);
    // marker.setPosition(autoAdress.getPlace().geometry.location);
    map.setCenter(autoAdress.getPlace().geometry.location)
  })
}

initMap();