"use strict";
const newsContent = document.getElementById("news-container");
const paginationEl = document.querySelector(".pagination");

// ============================= Call API =============================
// const url = `https://newsapi.org/v2/everything?q=apple&from=2023-08-12&to=2023-08-12&sortBy=popularity&category=${state.category}&apiKey=f3662192b8de4e0fa89113a7815200ed`;
const url = `https://newsapi.org/v2/top-headlines?country=us&category=${state.category}&apiKey=f3662192b8de4e0fa89113a7815200ed`;

const init = async function () {
  try {
    // get data from API
    const data = await getJSON(url);
    state.arrArticles = data.articles.map((el) => createArticleObject(el));
    renderAllPage();
  } catch (err) {
    console.log("loi");
  }
};

init();

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
