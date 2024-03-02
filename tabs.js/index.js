// MAIN LOGIC
// MAIN LOGIC
// MAIN LOGIC
const toggler = document.getElementById("theme-toggle");
function checkStoredTheme() {
  let darkTheme = localStorage.getItem("darkTheme");
  if (darkTheme === "true") {
    toggler.checked = true;
    document.body.classList.add("dark");
  } else {
    toggler.checked = false;
    document.body.classList.remove("dark");
  }
}
//
window.addEventListener("load", () => {
  fetchData();
  if (window.innerWidth < 768) {
    sideBar.classList.add("close");
  } else {
    sideBar.classList.remove("close");
  }
});

const indexDate = document.querySelector("#index-date");
const indexStudents = document.querySelector("#index-students");
const indexDue = document.querySelector("#index-due");

async function fetchData() {
  // student count
  let response = await fetch("https://cka-backend.onrender.com/students");
  let data = await response.json();
  let studentCount = data.length;
  indexStudents.innerText = studentCount;
  // date logic
  let dateURL = "https://cka-backend.onrender.com/bs-date";
  let responseDate = await fetch(dateURL);
  let datetimeStr = await responseDate.json();
  const datePart = datetimeStr.split(" ")[0];
  const parts = datePart.split("-");
  const formattedDate = `${parts[0]}/${parts[1]}/${parts[2]}`;
  indexDate.innerText = formattedDate;
  // due count
  let totalDue = 0;
  data.forEach((student) => {
    let due = student.fees.debit - student.fees.credit;
    totalDue = totalDue + due;
  });
  indexDue.innerText = `Rs. ${totalDue}`;
}
// MAIN LOGIC
// MAIN LOGIC
// MAIN LOGIC

const sideLinks = document.querySelectorAll(
  ".sidebar .side-menu li a:not(.logout)"
);

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

window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    sideBar.classList.add("close");
  } else {
    sideBar.classList.remove("close");
  }
});
toggler.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("darkTheme", true);
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("darkTheme", false);
  }
});
checkStoredTheme();
