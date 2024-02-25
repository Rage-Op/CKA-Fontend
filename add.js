// MAIN LOGIC
// MAIN LOGIC
// MAIN LOGIC
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
    })
    .catch((error) => {
      console.error("There was a problem with the post operation:", error);
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
