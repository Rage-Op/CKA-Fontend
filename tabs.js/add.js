// MAIN LOGIC
// MAIN LOGIC
// MAIN LOGIC
let notice = document.querySelector("#sucess-dialog");

const admitButton = document.querySelector("#admit-button");
const cancelButton = document.querySelector("#cancel-button");
let addName = document.querySelector("#add-name");
let addDOB = document.querySelector("#add-DOB");
let addFname = document.querySelector("#add-fname");
let addMname = document.querySelector("#add-mname");
let addContact = document.querySelector("#add-contact");
let addAddress = document.querySelector("#add-address");
let addStudentId = document.querySelector("#add-studentId");
let addAdmitDate = document.querySelector("#add-admitdate");
let addDue = document.querySelector("#result-due");
let addTransport = document.querySelector("#add-transport");
let addDiet = document.querySelector("#add-diet");
let addClass = document.querySelector("#add-class");
let photoUrl = document.querySelector(".photo");
let nextStudentId;

//
//
//
// To get next student ID.
getStudentId();
async function getStudentId() {
  let getURL = "https://cka-backend.onrender.com/students";

  try {
    let response = await fetch(getURL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await response.json();
    if (!data[0].studentId) {
      nextStudentId = 1;
    } else {
      nextStudentId = Number(data[0].studentId) + 1;
    }
    addStudentId.textContent = nextStudentId;
    const date = new Date();
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const lastTwoDigitsOfYear = formattedDate.slice(-2);
    const updatedFormattedDate =
      formattedDate.slice(0, -4) + lastTwoDigitsOfYear;
    addAdmitDate.textContent = updatedFormattedDate;
  } catch (error) {
    console.log(error);
  }
}
//
//
//
//
//

admitButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    addName.value === "" ||
    addDOB.value === "" ||
    addFname.value === "" ||
    addMname.value === "" ||
    addContact.value === "" ||
    addAddress.value === ""
  ) {
    console.log("error");
  } else {
    fetchStudent();
  }
});

cancelButton.addEventListener("click", (event) => {
  event.preventDefault();
  addName.value = "";
  addDOB.value = "";
  addFname.value = "";
  addMname.value = "";
  addContact.value = "";
  addAddress.value = "";
  addTransport.checked = false;
  addDiet.checked = false;
  addClass.value = "P.G.";
  addStudentId.textContent = "...";
  addAdmitDate.textContent = "...";
});

async function fetchStudent() {
  let getURL = "https://cka-backend.onrender.com/students";

  try {
    let response = await fetch(getURL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await response.json();
    console.log(data);
    if (!data[0].studentId) {
      nextStudentId = 1;
      console.log(nextStudentId);
    } else {
      nextStudentId = Number(data[0].studentId) + 1;
      console.log(nextStudentId);
    }
    addStudentId.textContent = nextStudentId;
    const date = new Date();
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const lastTwoDigitsOfYear = formattedDate.slice(-2);
    const updatedFormattedDate =
      formattedDate.slice(0, -4) + lastTwoDigitsOfYear;
    addAdmitDate.textContent = updatedFormattedDate;

    addStudent(nextStudentId, updatedFormattedDate);
  } catch (error) {
    console.log(error);
  }
}

async function addStudent(nextStudentId, admitDate) {
  let postURL = "https://cka-backend.onrender.com/students/add";

  let jsonData = {
    name: `${addName.value}`,
    DOB: `${addDOB.value}`,
    class: `${addClass.value}`,
    admitDate: `${admitDate}`,
    fatherName: `${addFname.value}`,
    motherName: `${addMname.value}`,
    contact: `${addContact.value}`,
    address: `${addAddress.value}`,
    transport: addTransport.checked,
    diet: addDiet.checked,
    studentId: `${nextStudentId}`,
    fees: {
      debit: 1800,
      credit: 0,
    },
    photo: `https://raw.githubusercontent.com/Rage-Op/imageResource/main/${nextStudentId}.jpg`,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  };

  await fetch(postURL, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response data:", data);
      notice.style.opacity = "100";
      setTimeout(() => {
        notice.style.opacity = "0";
      }, 2000);
    })
    .catch((error) => {
      console.error("There was a problem with the post operation:", error);
      notice.innerHTML = "<h4>Failed!</h4><p>Student deletion failed</p>";
      notice.style.backgroundColor = "rgba(254, 205, 211, 0.7)";
      notice.style.border = "1px solid #D32F2F";
      notice.style.opacity = "100";
      setTimeout(() => {
        notice.style.opacity = "0";
        noticeToDefault();
      }, 2000);
    });
  addName.value = "";
  addDOB.value = "";
  addFname.value = "";
  addMname.value = "";
  addContact.value = "";
  addAddress.value = "";
  addTransport.checked = false;
  addDiet.checked = false;
  addClass.value = "P.G.";
  addStudentId.textContent = "...";
  addAdmitDate.textContent = "...";
}
function noticeToDefault() {
  setTimeout(() => {
    notice.style.backgroundColor = "rgba(187, 247, 208, 0.7)";
    notice.style.border = "1px solid #50c156";
    notice.innerHTML = "<h4>Sucess!</h4><p>Student added</p>";
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
