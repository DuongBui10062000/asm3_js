"use strict";
const TIME_WAIT_FOR_API = 3;

/////////////////////
const saveToStorage = function (keyName, keyValue) {
  localStorage.setItem(keyName, JSON.stringify(keyValue));
};

const getDataFromStorage = function (keyName) {
  const data = localStorage.getItem(keyName)
    ? JSON.parse(localStorage.getItem(keyName))
    : [];

  return data;
};

const parseUser = function (userData) {
  const userParsed = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.passWord
  );
  return userParsed;
};

// ==============================
const state = {
  currentUser:
    getDataFromStorage("currentUser").length !== 0
      ? parseUser(getDataFromStorage("currentUser"))
      : "",
  arrArticles: [],
  currentPage: 1,
  newsPerPage:
    getDataFromStorage("newsPerPage").length !== 0
      ? +getDataFromStorage("newsPerPage")
      : 5,
  category:
    getDataFromStorage("category").length !== 0
      ? getDataFromStorage("category")
      : "business",
};
// =====================================

const clearStorageData = function (keyName) {
  localStorage.removeItem(keyName);
};

const validateInputData = function (data, type = "login") {
  const userList = getDataFromStorage("arrUsers");

  // check null input
  for (const field of data) {
    if (field[1].trim() === "") {
      alert(`nhập thông tin ${field[0]}`);
      return false;
    }
  }

  // check number of character password
  if (data.find((el) => el[0] === "password")[1].length < 8) {
    alert("password phải có ít nhất 8 kí tự");
    return false;
  }

  if (type != "login") {
    // check unique user
    if (
      userList.find(
        (element) =>
          element.userName === data.find((el) => el[0] === "username")[1]
      )
    ) {
      alert("user đã tồn tại. Vui lòng nhập username khác");
      return false;
    }

    // check pass and cofirm
    if (
      data.find((el) => el[0] === "password")[1] !==
      data.find((el) => el[0] === "confirmpassword")[1]
    ) {
      alert("confrim password của bạn sai");
      return false;
    }
  }

  return true;
};

const checkUser = function (data) {
  const arrUsers = getDataFromStorage("arrUsers");
  console.log(arrUsers);

  const currentUser = arrUsers.find((el) => {
    if (el.userName === data[0][1] && el.passWord === data[1][1]) return el;
  });

  return currentUser;
};

const timeout = function () {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(
          `Request took too long! Timeout after ${TIME_WAIT_FOR_API} second`
        )
      );
    }, TIME_WAIT_FOR_API * 1000);
  });
};

const getJSON = async function (url) {
  try {
    const req = new Request(url);
    const getData = await Promise.race([fetch(req), timeout()]);
    const data = await getData.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const createArticleObject = function (data) {
  return {
    description: data.description,
    title: data.title,
    imageUrl: data.urlToImage,
    published: data.publishedAt,
    url: data.url,
  };
};

const render = function (markup, El) {
  if (El === "news") {
    newsContent.insertAdjacentHTML("beforeend", markup);
    return;
  }

  if (El === "pagination") {
    paginationEl.insertAdjacentHTML("beforeend", markup);
    return;
  }

  if (El === "tasklist") {
    taskList.insertAdjacentHTML("afterbegin", markup);
  }
};

// ============================ Render Element ====================
const generateNews = function (article) {
  return `
    <div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${article.imageUrl}" class="card-img"
              alt="${article.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p> ${article.description}</p>
              <p> ${article.published}</p>
              <a href="${article.url}"
                class="btn btn-primary" target='blank'>View</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

const generatePagination = function () {
  const numPage = Math.ceil(state.arrArticles.length / state.newsPerPage);

  // first page and other pages
  if (numPage > 1 && state.currentPage === 1) {
    return `
      <li class="page-item"></li>
      <li class="page-item disabled">
        <a class="page-link" id="page-num">${state.currentPage}</a>
      </li>
      <li class="page-item">
        <button class="page-link btn-next">Next</button>
      </li>
    `;
  }

  // last page and other pages
  if (numPage > 1 && state.currentPage === numPage) {
    return `
      <li class="page-item">
        <button class="page-link btn-prev" href="#" >Previous</button>
      </li>
      <li class="page-item disabled">
        <a class="page-link" id="page-num">${state.currentPage}</a>
      </li>
      <li class="page-item"></li>
    `;
  }

  // other pages
  if (state.currentPage < numPage) {
    return `
      <li class="page-item">
        <button class="page-link btn-prev" href="#" >Previous</button>
      </li>
      <li class="page-item disabled">
        <a class="page-link" id="page-num">${state.currentPage}</a>
      </li>
      <li class="page-item">
        <button class="page-link btn-next" >Next</button>
      </li>
    `;
  }

  // only first page
  return `
    <li class="page-item"></li>
    <li class="page-item disabled">
      <a class="page-link" id="page-num">1</a>
    </li>
    <li class="page-item"></li>
  `;
};

const renderAllPage = function () {
  // render pagination of page
  render(generatePagination(), "pagination");

  // cal article per page
  const start = (state.currentPage - 1) * state.newsPerPage;
  const end = state.currentPage * state.newsPerPage;

  // render articles
  for (let i = start; i < end; i++) {
    render(generateNews(state.arrArticles[i]), "news");
  }
};
