// {vars with html elements inside
const helloTipBlock = document.getElementById("helloTipBlock");
const infoOutBlok = document.getElementById("infoOutBlok");
const infoInBlok = document.getElementById("infoInBlok");
const loginBlock = document.getElementById("loginBlock");

const outAddress = document.getElementById("outAddress");
const outRent = document.getElementById("outRent");
const outContactDetails = document.getElementById("outContactDetails");
const outDescription = document.getElementById("outDescription");

const editRE = document.getElementById("editRE");
const InfoInEditBlock = document.getElementById("InfoInEditBlock");
const infoInEditAcceptBut = document.getElementById("infoInEditAcceptBut");
const infoInDeleteBut = document.getElementById("infoInDeleteBut");

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
// }

// input text used for Google maps autoplace service
const autoPlace = document.getElementById("AutoPlace");

// first part of path that determines domain/machine and port on wich server is running
const baseUrl = 'http://localhost:8080';
// determines initial coordinates of center of the map
const baseLocation = { lat: 34.7768, lng: 32.42 };


let map, autoAddress, currentUser, currentOffer, currentMarker, editing;
let isCreatingOffer = false;
let isEditing = false;