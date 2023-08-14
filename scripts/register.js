"use strict";

const formInputData = document.querySelector(".register-form");

// ///////////////////////////////////////////

const addNewUser = function (data) {
  // get value form fields
  const arrData = [];
  data.forEach((element) => {
    arrData.push(element[1]);
  });

  // create new user
  const objectUser = {
    firstName: arrData[0],
    lastName: arrData[1],
    userName: arrData[2],
    passWord: arrData[3],
  };
  // const newUser = new User(...arrData);

  // save to storage
  const arrUsers = getDataFromStorage("arrUsers");
  arrUsers.push(objectUser);
  saveToStorage("arrUsers", arrUsers);

  alert("Đăng ký thành công!");

  // redirect to login
  window.location.href = "../pages/login.html";
};

// ////////////////// HANDLER FORM SUBMIT ///////////////////////////

formInputData.addEventListener("submit", function (e) {
  e.preventDefault();

  // get data from RegisterForm
  const data = [...new FormData(this)];

  // check data
  if (!validateInputData(data, "register")) return;

  // create new user
  addNewUser(data);
});
