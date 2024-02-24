const sideLinks = document.querySelectorAll(
  ".sidebar .side-menu li a:not(.logout)"
);

console.log("hello from js");
window.addEventListener("load", () => {
  fetchData();
});

const indexDate = document.querySelector("#index-date");
const indexStudents = document.querySelector("#index-students");
const date = new Date();
const options = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

const formattedDate = date.toLocaleDateString("en-US", options);
const lastTwoDigitsOfYear = formattedDate.slice(-2); // Extract last two digits of the year
const updatedFormattedDate = formattedDate.slice(0, -4) + lastTwoDigitsOfYear; // Replace last 4 digits with last two digits of the year
indexDate.innerText = updatedFormattedDate;

async function fetchData() {
  let response = await fetch("https://cka-backend.onrender.com/students");
  console.log(response);
  let data = await response.json();
  console.log(data);
  let studentCount = data.length;
  indexStudents.innerText = studentCount;
}

sideLinks.forEach((item) => {
  const li = item.parentElement;
  item.addEventListener("click", () => {
    sideLinks.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

const menuBar = document.querySelector(".content nav .bx.bx-menu");
const sideBar = document.querySelector(".sidebar");

menuBar.addEventListener("click", () => {
  sideBar.classList.toggle("close");
});

const searchBtn = document.querySelector(
  ".content nav form .form-input button"
);
const searchBtnIcon = document.querySelector(
  ".content nav form .form-input button .bx"
);

window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    sideBar.classList.add("close");
  } else {
    sideBar.classList.remove("close");
  }
  if (window.innerWidth > 576) {
    searchBtnIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

const toggler = document.getElementById("theme-toggle");

toggler.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});
