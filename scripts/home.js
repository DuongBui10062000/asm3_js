"use strict";
const loginEl = document.getElementById("login-modal");
const logoutEl = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

window.addEventListener("load", function (e) {
  if (state.currentUser === "") {
    logoutEl.classList.add("hidden");
    return;
  } else {
    loginEl.classList.add("hidden");
    welcomeMessage.textContent = `Welcome ${state.currentUser.getName()}`;
    return;
  }
});

btnLogout.addEventListener("click", function (e) {
  state.currentUser = "";
  clearStorageData("currentUser");
  window.location.href = "../index.html";
});
