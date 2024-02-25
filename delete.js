// MAIN LOGIC
// MAIN LOGIC
// MAIN LOGIC
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
let idToBeDeleted;
let cancelButton = document.querySelector("#admit-button");
let deleteButton = document.querySelector("#cancel-button");
// Reminder: the selector for cancelButton and deleteButton doesnot makes sense but ignore it!!

cancelButton.addEventListener("click", () => {
  searchFormInput.value = "";
  resultName.textContent = "....................";
  resultDOB.textContent = "....................";
  resultFname.textContent = "....................";
  resultMname.textContent = "....................";
  resultContact.textContent = "....................";
  resultAddress.textContent = "....................";
  resultCredit.textContent = 0;
  resultDebit.textContent = 0;
  resultDue.textContent = 0;
});

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
    idToBeDeleted = data.studentId;
    searchFormInput.value = "";
    deleteButton.addEventListener("click", deleteEventHandler);

    if (!data.photo) {
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
    resultCredit.textContent = 0;
    resultDebit.textContent = 0;
    photoUrl.style.backgroundImage = 'url("./content/user-icon.jpg")';
    searchFormInput.value = "";
    resultDue.textContent = 0;
  }
}

async function deleteEventHandler() {
  deleteButton.removeEventListener("click", deleteEventHandler);
  console.log(studentId);
  const deleteURL = `https://cka-backend.onrender.com/students/delete/${studentId}`;
  const options = {
    method: "DELETE",
  };
  await fetch(deleteURL, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response data:", data);
    })
    .catch((error) => {
      console.error("There was a problem with the delete operation:", error);
    });
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
  resultDue.textContent = 0;
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
