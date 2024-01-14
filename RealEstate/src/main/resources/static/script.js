class RealEstate {
  constructor(dto) {
    this.Id = dto.id;
    this.address = dto.address;
    this.lat = dto.lat;
    this.lng = dto.lng;
    this.description = dto.description;
    this.rent = dto.rent;
    this.contactDetails = dto.contactDetails;
    this.ownerID = dto.ownerId;
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
      if (currentUser != undefined && currentUser.id == this.re.ownerID) {
        editRE.classList.remove("none");
        editing = this;
      }

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




function showHelloTipBlock() {
  helloTipBlock.classList.remove("none");
  infoOutBlok.classList.add("none");
  infoInBlok.classList.add("none");
  loginBlock.classList.add("none");
  InfoInEditBlock.classList.add("none");
  if (currentUser != undefined) {
    addBlockTipText.classList.add("none");
    addBlockLoginBut.classList.add("none");
    addBlockUser.classList.remove("none");
    addBlockOfferBut.classList.remove("none");
    addBlockUser.textContent = currentUser.userName;
  };
  if (currentMarker != null && currentMarker != undefined) {
    currentMarker.setMap(null);
  }
  isCreatingOffer = false;
  isEditing = false;
}

function showInfoOutBlok() {
  helloTipBlock.classList.add("none");
  infoOutBlok.classList.remove("none");
  infoInBlok.classList.add("none");
  loginBlock.classList.add("none");
  editRE.classList.add("none");
  InfoInEditBlock.classList.add("none");
  isCreatingOffer = false;
  isEditing = false;

}

function showInfoInBlok() {
  helloTipBlock.classList.add("none");
  infoOutBlok.classList.add("none");
  infoInBlok.classList.remove("none");
  loginBlock.classList.add("none");
  InfoInEditBlock.classList.add("none");
  infoInAcceptBut.classList.remove("none");
  isCreatingOffer = true;
  isEditing = false;
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
  InfoInEditBlock.classList.add("none");
  loginBlock.classList.remove("none");
  isCreatingOffer = false;
  isEditing = false;
}

async function httpGET(uri = '', requestHeaders = [[]]) {
  let fetchInit = {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
  };
  if (requestHeaders !== null) {
    const headers = new Headers();
    requestHeaders.forEach(header => {
      headers.append(header[0], header[1]);
    });
    fetchInit.headers = headers;
  }
  const response = await fetch(baseUrl + uri, fetchInit);
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  else return null;
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
  let response = await httpGET("/requestAll", null);
  for (const dto of response.list) {
    new RealEstate(dto).setMarker();
  }
}

function accept() {
  if (currentMarker != undefined || isEditing) {
    if (isCreatingOffer) {
      currentOffer.lat = currentMarker.position.lat();
      currentOffer.lng = currentMarker.position.lng();
    };
    currentOffer.address = inAddress.value;
    currentOffer.rent = inRent.value;
    currentOffer.contactDetails = inContactDetails.value;
    currentOffer.description = inDescription.value;
    currentOffer.ownerID = currentUser.id;
    if (isEditing || currentOffer.address != currentMarker.position) {
      if (currentOffer.isReady()) {


        if (isEditing) {
          currentOffer.id = editing.re.Id;
          httpPOST("/change", currentOffer);
          console.log(currentOffer);
          editing = undefined;
        } else {
          httpPOST("/save", currentOffer);
          currentMarker.setMap(null);
          currentMarker = undefined;
          console.log(currentOffer);
        }
        showHelloTipBlock();
        currentOffer = undefined;

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

async function login() {

  const response = await httpGET("/login", [["username", inUsername.value], ["password", inPassword.value]]);
  // console.log(response);
  // const response = { userName: "testUser1", id: 1 };
  if (response != null) {
    currentUser = new User(response);
    showHelloTipBlock();
  }
  else alert("name/password is incorrect");
}

async function deleteRE() {
  httpPOST("/delete", currentOffer);
  showHelloTipBlock();
  editing.setMap(null);
  currentOffer = undefined;
  editing = undefined;
}

addBlockLoginBut.addEventListener("click", function () {
  showLoginBlok();
});

addBlockOfferBut.addEventListener("click", function () {
  showInfoInBlok();
});

loginAcceptBut.addEventListener("click", login);

infoInAcceptBut.addEventListener("click", accept);

editRE.addEventListener("click", function () {
  showInfoInBlok();
  InfoInEditBlock.classList.remove("none");
  infoInAcceptBut.classList.add("none");
  inAddress.value = editing.re.address;
  inRent.value = editing.re.rent;
  inContactDetails.value = editing.re.contactDetails;
  inDescription.value = editing.re.description;
  currentOffer.lat = editing.position.lat();
  currentOffer.lng = editing.position.lng();
  isCreatingOffer = false;
  isEditing = true;
})

infoInEditAcceptBut.addEventListener("click", accept)

infoInDeleteBut.addEventListener("click", deleteRE)

goBackBut.forEach(element => {
  element.addEventListener("click", function () {
    showHelloTipBlock();
    autoPlace.value = "";
  })
});

initMap();