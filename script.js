const addBookmarkBtn = document.querySelector("#show-modal");
const modalContainer = document.querySelector(".modal-container");
const closeModalBtn = document.querySelector("#close-modal");
const websiteNameEl = document.querySelector("#website-name");
const websiteURLEl = document.querySelector("#website-url");
const bookmarkForm = document.querySelector("#bookmark-form");
const bookmarksContainer = document.querySelector("#bookmarks-container");
const deleteBookmarkBtn = document.querySelector("#delete-bookmark");
let bookmarks = [];

const showModal = function () {
  modalContainer.classList.add("show-modal");
  websiteNameEl.focus();
};
const closeModal = function (e) {
  modalContainer.classList.remove("show-modal");
};
const clear = function () {
  closeModal();
  websiteNameEl.value = "";
  websiteURLEl.value = "";
};
// Build bookmarks
const buildBookmarks = function (element) {
  // Remove all bookmark elements
  bookmarksContainer.textContent = "";
  // Build items
  bookmarks.forEach((element) => {
    const bookmark = `
    <div class="item">
    <i
      class="fas fa-times"
      id="delete-bookmark"
      title="Delete Bookmark"
      onclick="deleteBookmark('${element.url}')"
    ></i>
    <div class="name">
      <img
        src="https://www.google.com/s2/u/0/favicons?domain=${element.url}"
        alt="favicon"
      />
      <a href="${element.url}" target="_blank">${element.name}</a>
    </div>
  </div>
      `;
    bookmarksContainer.insertAdjacentHTML("beforeend", bookmark);
  });
};

const fetchBookmarks = function () {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    // Create bookmarks in localStorage
    bookmarks = [
      {
        name: "Jacinto Design",
        url: "https://jacinto.design",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
};

// Delete bookmark
const deleteBookmark = function (url) {
  const finded = bookmarks.findIndex((bookmark) => {
    return bookmark.url === url;
  });
  console.log(bookmarks);
  bookmarks.splice(finded, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
};

const storeBookmark = function (e) {
  e.preventDefault();
  if (!e.srcElement[1].value.includes("https://", "http://")) {
    e.srcElement[1].value = `https://${e.srcElement[1].value}`;
  }
  const bookmark = {
    name: e.srcElement[0].value,
    url: e.srcElement[1].value,
  };
  clear();
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  addBookmark(bookmark);
};

// Modal Event Listeners
addBookmarkBtn.addEventListener("click", showModal);
closeModalBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modalContainer) {
    closeModal();
  }
});

// Event Listener
fetchBookmarks();
bookmarkForm.addEventListener("submit", storeBookmark);
