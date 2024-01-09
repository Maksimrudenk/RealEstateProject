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
      // optimized: true,
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

class Offer {
  address;
  lat;
  lng;
  description;
  rent;
  contactDetails;
  ownerID;

  isReady() {
    return (this.address != undefined && this.lat != undefined
      && this.lng != undefined && this.description != undefined
      && this.rent != undefined && this.contactDetails != undefined
      && this.ownerID != undefined && this.address != "" && this.lat != ""
      && this.lng != "" && this.description != ""
      && this.rent != "" && this.contactDetails != ""
      && this.ownerID != "") ? true : false;
  };
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

const infoInAcceptBut = document.getElementById("infoInAcceptBut");
const inAddress = document.getElementById("inAddress");
const inRent = document.getElementById("inRent");
const inContactDetails = document.getElementById("inContactDetails");
const inDescription = document.getElementById("inDescription");

const goBackBut = Array.from(document.getElementsByClassName("goBack"));

const autoPlace = document.getElementById("AutoPlace");

const baseUrl = 'http:localhost:8080';
const baseLocation = { lat: 34.7768, lng: 32.42 };

let map, autoAddress, currentUser, currentOffer, currentMarker;
let isCreatingOffer = false;

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
  isCreatingOffer = false;
}

function showInfoOutBlok() {
  helloTipBlock.classList.add("none");
  infoOutBlok.classList.remove("none");
  infoInBlok.classList.add("none");
  loginBlock.classList.add("none");
  isCreatingOffer = false;
}

function showInfoInBlok() {
  helloTipBlock.classList.add("none");
  infoOutBlok.classList.add("none");
  infoInBlok.classList.remove("none");
  loginBlock.classList.add("none");
  isCreatingOffer = true;
  currentOffer = new Offer();
  inAddress.value = "";
  inRent.value = "";
  inContactDetails.value = "";
  inDescription.value = "";
  inAddress.readOnly = true;
}

function showLoginBlok() {
  helloTipBlock.classList.add("none");
  infoOutBlok.classList.add("none");
  infoInBlok.classList.add("none");
  loginBlock.classList.remove("none");
  isCreatingOffer = false;
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

async function httpPOST(uri = '', data = {}) {
  let fetchInit = {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
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

  // const mapClickListener = async function (e) {
  //   console.log(e.latLng.toString());
  //   console.log(result.results);
  // }

  // map.addListener("click", e => mapClickListener(e));

  autoAddress.addListener("place_changed", function () {
    // 
    // marker.setPosition(autoAdress.getPlace().geometry.location);
    if (isCreatingOffer) {
      // currentOffer.lat = autoAddress.getPlace().geometry.location.lat();
      // currentOffer.lng = autoAddress.getPlace().geometry.location.lng();
      // inAddress.value = /*autoAddress.getPlace().name + ", " +*/ autoAddress.getPlace().formatted_address;
      inAddress.value = autoPlace.value;
      inAddress.readOnly = false;
      // console.log(autoAddress.getPlace());
      currentMarker = new google.maps.Marker({
        map,
        position: autoAddress.getPlace().geometry.location,
        draggable: true,
      });
      currentMarker.addListener("position_changed", function () {
        inAddress.value = currentMarker.position;
        // console.log(currentMarker);
      });
    };
    map.setCenter(autoAddress.getPlace().geometry.location);
    map.setZoom(18);
  })

  setAllMarkers();
}

addBlockLoginBut.addEventListener("click", function () {
  showLoginBlok();
});

addBlockOfferBut.addEventListener("click", function () {
  showInfoInBlok();
});

loginAcceptBut.addEventListener("click", function () {
  // const response = httpGET("login", [["username", inUsername.value],["password", inPassword.value]]);
  const response = { userName: "testUser1", id: 1 };
  currentUser = new User(response);
  showHelloTipBlock();
});

infoInAcceptBut.addEventListener("click", function () {
  if (currentMarker != undefined) {
    currentOffer.lat = currentMarker.position.lat();
    currentOffer.lng = currentMarker.position.lng();
    currentOffer.address = inAddress.value;
    currentOffer.rent = inRent.value;
    currentOffer.contactDetails = inContactDetails.value;
    currentOffer.description = inDescription.value;
    currentOffer.ownerID = currentUser.id;
    if (currentOffer.address != currentMarker.position) {
      if (currentOffer.isReady()) {
        // httpPOST();
        showHelloTipBlock();
        currentOffer = undefined;
        currentMarker.setMap(null);
      } else {
        alert("please, fill all field correctly");
      }

    } else {
      alert("please, fill the address field correctly");
    }
  }
  else {
    alert("please marker the place on a map");
  }

});

goBackBut.forEach(element => {
  element.addEventListener("click", function () {
    showHelloTipBlock();
    if (currentMarker != null && currentMarker != undefined) {
      currentMarker.setMap(null);
    }
    autoPlace.value = "";
  })
});

initMap();