// MAIN LOGIC
// MAIN LOGIC
// MAIN LOGIC
let notice = document.querySelector("#sucess-dialog");

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
    searchFormInput.value = "";
    notice.style.opacity = "100";
    setTimeout(() => {
      notice.style.opacity = "0";
    }, 2000);
    if (!data.photo) {
      console.log("no photo");
      photoUrl.style.backgroundImage = 'url("./content/user-icon.jpg")';
    } else {
      photoUrl.style.backgroundImage = `url(${data.photo})`;
    }
  } catch (error) {
    console.log(error);
    notice.innerHTML = "<h4>Failed!</h4><p>Student not found</p>";
    notice.style.backgroundColor = "rgba(254, 205, 211, 0.7)";
    notice.style.border = "1px solid #D32F2F";
    notice.style.opacity = "100";
    setTimeout(() => {
      notice.style.opacity = "0";
      noticeToDefault();
    }, 2000);
    resultName.textContent = "..........";
    resultDOB.textContent = "..........";
    resultFname.textContent = "..........";
    resultMname.textContent = "..........";
    resultContact.textContent = "..........";
    resultAddress.textContent = "..........";
    resultCredit.textContent = 0;
    resultDebit.textContent = 0;
    photoUrl.style.backgroundImage = 'url("./content/user-icon.jpg")';
    searchFormInput.value = "";

    // resultDue.textContent = data.fees.debit - data.fees.credit;
  }
}

function noticeToDefault() {
  setTimeout(() => {
    notice.style.backgroundColor = "rgba(187, 247, 208, 0.7)";
    notice.style.border = "1px solid #50c156";
    notice.innerHTML = "<h4>Sucess!</h4><p>Student found</p>";
  }, 300);
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
// Sidebar
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
// Theme
const toggler = document.getElementById("theme-toggle");

toggler.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});
