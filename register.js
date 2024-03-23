"use strict";

// localStorage.clear();

let json = [];

function loadData() {
  const jsonString = localStorage.getItem("aboutUser");
  if (jsonString) {
    json = JSON.parse(jsonString);
  }
}

loadData();

function saveData() {
  const selectedName = document.getElementById("fname").value;
  const emailInput = document.getElementById("email").value;
  const mobileInput = document.getElementById("phone").value;
  const socialLink = document.getElementById("instagram").value;
  const selectedRole = document.querySelector("select").value;
  const selectedCity = document.querySelector('input[name="city"]:checked')
    ? document.querySelector('input[name="city"]:checked').id
    : null;
  const checkedBoxes = Array.from(
    document.querySelectorAll(".box:checked")
  ).map((checkbox) => checkbox.id);
  const meetingTime = document.getElementById("date").value;
  const numberOfPlantsValue = parseInt(
    document.getElementById("number").value,
    10
  );
  const selectColor = document.getElementById("favcolor").value;
  const selectRange = document.getElementById("vol").value;

  const jsonData = {
    name: selectedName,
    email: emailInput,
    mobilePhone: mobileInput,
    social: socialLink,
    role: selectedRole,
    city: selectedCity,
    likedPlants: checkedBoxes,
    meetingTime: meetingTime,
    numberOfPlants: numberOfPlantsValue,
    color: selectColor,
    range: selectRange,
  };

  json.push(jsonData);

  const jsonString = JSON.stringify(json);

  localStorage.setItem("aboutUser", jsonString);
}

// Функція, яка буде викликатися при натисканні кнопки
function handleClick() {
  saveData();
  clearForms();
}

document.getElementById("save-btn").addEventListener("click", handleClick);

function clearForms() {
  document.getElementById("fname").value = "";
  document.getElementById("email").value = "";
  document.querySelector("select").value = "--Select Role--";
  document
    .querySelectorAll(".radio:checked")
    .forEach((radio) => (radio.checked = false));
  document
    .querySelectorAll(".box:checked")
    .forEach((checkbox) => (checkbox.checked = false));
  document.getElementById("date").value = "";
  document.getElementById("number").value = "";
  document.getElementById("favcolor").value = "#000000";
  document.getElementById("vol").value = 25;
  document.getElementById("phone").value = "";
  document.getElementById("instagram").value = "";
}

function getFromRole() {
  const value = localStorage.getItem("aboutUser");
  if (value) {
    json = JSON.parse(value);
  }
  for (let i = 0; i < json.length; i++) {
    if (json[i]["role"] === "Plantman") {
      console.log(json[i]);
    }
  }
}
document.getElementById("show-faculty").addEventListener("click", getFromRole);

function getFromRange() {
  const value = localStorage.getItem("aboutUser");
  if (value) {
    json = JSON.parse(value);
  }
  for (let i = 0; i < json.length; i++) {
    if (json[i]["range"] < 30) {
      console.log(json[i]);
    }
  }
}
document.getElementById("show-volume").addEventListener("click", getFromRange);

function getFromLiked() {
  const value = localStorage.getItem("aboutUser");
  if (value) {
    json = JSON.parse(value);
  }
  for (let i = 0; i < json.length; i++) {
    if (json[i]["likedPlants"].includes("Monstera")) {
      console.log(json[i]);
    }
  }
}
document.getElementById("show-group").addEventListener("click", getFromLiked);
