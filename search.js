const sideLinks = document.querySelectorAll(
  ".sidebar .side-menu li a:not(.logout)"
);

const searchFormButton = document.querySelector("#formsearch button");
const searchFormInput = document.querySelector("#formsearch input");
let resultName = document.querySelector("#result-name");
let resultDOB = document.querySelector("#result-DOB");
let resultFname = document.querySelector("#result-fname");
let resultMname = document.querySelector("#result-mname");
let resultContact = document.querySelector("#result-contact");
let resultAddress = document.querySelector("#result-address");
let resultCredit = document.querySelector("#result-credit");
let resultDebit = document.querySelector("#result-debit");
let resultDue = document.querySelector("#result-due");
let photoUrl = document.querySelector(".photo");

searchFormButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (searchFormInput.value === "") {
    console.log("not a valid student ID");
  } else {
    fetchStudent();
  }
});

async function fetchStudent() {
  studentId = searchFormInput.value;
  let URL = "https://cka-backend.onrender.com/students/search";

  try {
    let response = await fetch(`${URL}/${studentId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let data = await response.json();
    resultName.textContent = data.name;
    resultDOB.textContent = data.DOB;
    resultFname.textContent = data.fatherName;
    resultMname.textContent = data.motherName;
    resultContact.textContent = data.contact;
    resultAddress.textContent = data.address;
    resultCredit.textContent = data.fees.credit;
    resultDebit.textContent = data.fees.debit;
    resultDue.textContent = data.fees.debit - data.fees.credit;
    if (!data.photo) {
      console.log("no photo");
      photoUrl.style.backgroundImage = 'url("./content/user-icon.jpg")';
    } else {
      photoUrl.style.backgroundImage = `url(${data.photo})`;
    }
  } catch (error) {
    console.log(error);
    resultName.textContent = "..........";
    resultDOB.textContent = "..........";
    resultFname.textContent = "..........";
    resultMname.textContent = "..........";
    resultContact.textContent = "..........";
    resultAddress.textContent = "..........";
    resultCredit.textContent = 100;
    resultDebit.textContent = 100;
    photoUrl.style.backgroundImage = 'url("./content/user-icon.jpg")';

    // resultDue.textContent = data.fees.debit - data.fees.credit;
  }
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
const searchForm = document.querySelector(".content nav form");

searchBtn.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault;
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchBtnIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchBtnIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

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
