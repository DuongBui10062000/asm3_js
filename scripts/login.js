"use strict";
const formInputData = document.querySelector(".login-form");

formInputData.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = [...new FormData(this)];

  if (!validateInputData(data)) return;

  // check user in storage
  const currentUser = checkUser(data);
  if (!currentUser) {
    alert("tài khoản hoặc mật khẩu không đúng!");
    return;
  } else alert("Đăng nhập thành công");

  //  save currentUser to storage
  saveToStorage("currentUser", currentUser);

  window.location.href = "../index.html";
});
