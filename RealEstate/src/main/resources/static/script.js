class RealEstate {
  constructor(dto) {
    this.Id = dto.id;
    this.address = dto.address;
    this.lat = dto.lat;
    this.lng = dto.lng;
    this.description = dto.description;
    this.rent = dto.rent;
    this.contactDetails = dto.contactDetails;
    this.ownerID = dto.ownerID;
  }

  setMarker() {
    this.marker = new google.maps.Marker({
      map,
      title: this.adress,
      position: { lat: this.lat, lng: this.lng },
    });
    this.marker.re = this;
    this.marker.addListener("click", function () {
      console.log(this.re);
      showInfoOutBlok();
      outAddress.textContent = "address: " + this.re.address;
      outRent.textContent = "rent: " + this.re.rent;
      outContactDetails.textContent = "contact details: " + this.re.contactDetails;
      outDescription.textContent = this.re.description;
    });
  }
}

class User {
  constructor(dto) {
    this.userName = dto.userName;
    this.id = dto.id;
  }
};


const helloTipBlock = document.getElementById("helloTipBlock");
const infoOutBlok = document.getElementById("infoOutBlok");
const infoInBlok = document.getElementById("infoInBlok");
const loginBlock = document.getElementById("loginBlock");

const outAddress = document.getElementById("outAddress");
const outRent = document.getElementById("outRent");
const outContactDetails = document.getElementById("outContactDetails");
const outDescription = document.getElementById("outDescription");

const addBlockTipText = document.getElementById("addBlockTipText");
const addBlockUser = document.getElementById("addBlockUser");
const addBlockLoginBut = document.getElementById("addBlockLoginBut");
const addBlockOfferBut = document.getElementById("addBlockOfferBut");

const loginAcceptBut = document.getElementById("loginAcceptBut");
const inUsername = document.getElementById("inUsername");
const inPassword = document.getElementById("inPassword");

const goBackBut = Array.from(document.getElementsByClassName("goBack"));


const baseUrl = 'http:localhost:8080';
const baseLocation = { lat: 34.7768, lng: 32.42 };

let map, autoAddress, currentUser;

function showHelloTipBlock() {
  helloTipBlock.classList.remove("none");
  infoOutBlok.classList.add("none");
  infoInBlok.classList.add("none");
  loginBlock.classList.add("none");
  if (currentUser != undefined) {
    addBlockTipText.classList.add("none");
    addBlockLoginBut.classList.add("none");
    addBlockUser.classList.remove("none");
    addBlockOfferBut.classList.remove("none");
    addBlockUser.textContent = currentUser.userName;
  };
}

function showInfoOutBlok() {
  helloTipBlock.classList.add("none");
  infoOutBlok.classList.remove("none");
  infoInBlok.classList.add("none");
  loginBlock.classList.add("none");
}

function showInfoInBlok() {
  helloTipBlock.classList.add("none");
  infoOutBlok.classList.add("none");
  infoInBlok.classList.remove("none");
  loginBlock.classList.add("none");
}

function showLoginBlok() {
  helloTipBlock.classList.add("none");
  infoOutBlok.classList.add("none");
  infoInBlok.classList.add("none");
  loginBlock.classList.remove("none");
}

async function httpGET(uri = '', requestHeaders = [[]]) {
  let fetchInit = {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
  };
  if (requestHeaders !== null) {
    fetchInit.headers = requestHeaders;
  }
  const response = await fetch(baseUrl + uri, fetchInit);
  const json = await response.json();
  return json;
}

async function setAllMarkers() {
  // let response = await httpGET("/requestAll", null);
  let response = {
    list: [{
      id: 1,
      address: "testAddres1",
      lat: 34.7763,
      lng: 32.422,
      description: "test description1",
      rent: 1000,
      contactDetails: "testEmail1",
      ownerID: 1,
    },
    {
      id: 2,
      address: "testAddres2",
      lat: 34.7759,
      lng: 32.4185,
      description: "test description2",
      rent: 2000,
      contactDetails: "testEmail2",
      ownerID: 2,
    }]
  }; //test;
  for (const dto of response.list) {
    new RealEstate(dto).setMarker();
  }
}

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  const { Autocomplete } = await google.maps.importLibrary("places")

  autoAddress = new Autocomplete(document.getElementById("AutoPlace"));

  map = new Map(document.getElementById("map"), {
    center: baseLocation,
    zoom: 12,
  });

  const mapClickListener = async function (e) {
    console.log(e.latLng.toString());
    console.log(result.results);
  }

  map.addListener("click", e => mapClickListener(e));

  autoAddress.addListener("place_changed", function () {
    console.log(autoAdress.getPlace().geometry.location);
    // marker.setPosition(autoAdress.getPlace().geometry.location);
    map.setCenter(autoAdress.getPlace().geometry.location)
  })

  setAllMarkers();
}

addBlockLoginBut.addEventListener("click", function () {
  showLoginBlok();
})

loginAcceptBut.addEventListener("click", function () {
  // const response = httpGET("login", [["username", inUsername.value],["password", inPassword.value]]);
  const response = { userName: "testUser1", id: 1 };
  currentUser = new User(response);
  showHelloTipBlock();
})

goBackBut.forEach(element => {
  element.addEventListener("click", function () {
    showHelloTipBlock();
  })
});

initMap();