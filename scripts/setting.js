"use strict";
const newsPerPage = document.getElementById("input-page-size");
const newsCategory = document.getElementById("input-category");
const btnSave = document.getElementById("btn-submit");

newsPerPage.value = state.newsPerPage;

// select old setting
const options = Array.from(newsCategory.options);
const optionSelect = options.find(
  (item) => item.text.toLowerCase() === state.category
);
optionSelect.selected = true;

// change setting
btnSave.addEventListener("click", function () {
  state.newsPerPage = newsPerPage.value;
  saveToStorage("newsPerPage", state.newsPerPage);

  state.category = newsCategory.value.toLowerCase();
  saveToStorage("category", state.category);
});
