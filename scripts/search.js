"use strict";
const searchValueEl = document.getElementById("input-query");
const btnSearch = document.getElementById("btn-submit");
const newsContent = document.getElementById("news-container");

const paginationEl = document.querySelector(".pagination");

const init = async function (url) {
  try {
    // get data from API
    const data = await getJSON(url);
    state.arrArticles = data.articles.map((el) => createArticleObject(el));
    renderAllPage();
  } catch (err) {
    console.log(err);
  }
};

btnSearch.addEventListener("click", function () {
  if (searchValueEl.value.trim() === "") {
    alert("Không được để trống");
    return;
  }

  const searchValue = searchValueEl.value;

  const url = `https://newsapi.org/v2/everything?q=${searchValue}&from=2023-07-14&sortBy=publishedAt&apiKey=f3662192b8de4e0fa89113a7815200ed`;

  init(url);
});

// ============================= Handler event ======================
paginationEl.addEventListener("click", function (e) {
  if (e.target.closest(".btn-prev")) {
    state.currentPage -= 1;
    paginationEl.innerHTML = "";
    newsContent.innerHTML = "";
    renderAllPage();
    return;
  }

  if (e.target.closest(".btn-next")) {
    state.currentPage += 1;
    paginationEl.innerHTML = "";
    newsContent.innerHTML = "";
    renderAllPage();
    return;
  }

  return;
});
