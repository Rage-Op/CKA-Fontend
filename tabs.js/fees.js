// MAIN LOGIC
// MAIN LOGIC
// MAIN LOGIC
let notice = document.querySelector("#sucess-dialog");

const searchFormButton = document.querySelector("#formsearch button");
const searchFormInput = document.querySelector("#formsearch input");
let photoUrl = document.querySelector("#fees-photo");
let feesName = document.querySelector("#fees-name");
let feesClass = document.querySelector("#fees-class");
let feesStudentId = document.querySelector("#fees-studentId");
let feesDate = document.querySelector("#fees-date");
let feesDebit = document.querySelector("#result-debit");
let feesCredit = document.querySelector("#result-credit");
let feesDue = document.querySelector("#result-due");
let creditAmount = document.querySelector("#credit-amount");
let creditBill = document.querySelector("#credit-bill");
let creditButton = document.querySelector("#admit-button");
let cancelButton = document.querySelector("#cancel-button");
const debitColumn = document.querySelector("#debit-column");
const creditColumn = document.querySelector("#credit-column");

let fetchedData;

cancelButton.addEventListener("click", (event) => {
  event.preventDefault();
  searchFormInput.value = "";
  feesName.textContent = "....................";
  feesClass.textContent = "....................";
  photoUrl.style.backgroundImage = 'url("./content/user-icon.jpg")';
});

searchFormButton.addEventListener("click", (event) => {
  event.preventDefault();
  debitColumn.innerHTML = "";
  creditColumn.innerHTML = "";

  if (searchFormInput.value === "") {
    console.log("not a valid student ID");
  } else {
    fetchStudent();
  }
});

//
//
//
// get date
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentDate = new Date();
const day = currentDate.getDate();
const month = months[currentDate.getMonth()];
const year = currentDate.getFullYear();

const formattedDate = `${day} ${month} ${year}`;
feesDate.textContent = formattedDate;
//
//
//
//

async function fetchStudent() {
  studentId = searchFormInput.value;
  let URL = "https://cka-backend.onrender.com/students/search";

  try {
    let response = await fetch(`${URL}/${studentId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let data = await response.json();
    fetchedData = data;
    feesName.textContent = data.name;
    feesStudentId.textContent = data.studentId;
    feesClass.textContent = data.class;
    feesCredit.textContent = data.fees.credit;
    feesDebit.textContent = data.fees.debit;
    feesDue.textContent = data.fees.debit - data.fees.credit;
    //
    //
    // logic for creating tables from data
    data.debitAmount.forEach((object) => {
      let row = document.createElement("tr");
      let cell = document.createElement("td");
      cell.innerHTML = `<div class="box">
      <h5>${object.date}</h5>
      <p>Nrs. ${object.amount}</p>
      <p>${object.remark}</p>
      </div>`;
      row.appendChild(cell);
      debitColumn.appendChild(row);
    });
    data.creditAmount.forEach((object) => {
      let row = document.createElement("tr");
      let cell = document.createElement("td");
      cell.innerHTML = `<div class="box">
      <h5>${object.date}</h5>
      <p>Nrs. ${object.amount}</p>
      <p>${object.bill}</p>
      </div>`;
      row.appendChild(cell);
      creditColumn.appendChild(row);
    });
    //
    //
    //
    creditButton.addEventListener("click", saveEventHandler);

    if (!data.photo) {
      photoUrl.style.backgroundImage = 'url("./../content/user-icon.jpg")';
    } else {
      photoUrl.style.backgroundImage = `url(${data.photo})`;
    }
    //
    //
    //fees display logic

    //
    //
    //
  } catch (error) {
    console.log(error);
    feesName.textContent = "....................";
    feesClass.textContent = "....................";
    photoUrl.style.backgroundImage =
      'url("./../content/user-not-found-icon.jpg")';
    searchFormInput.value = "";
  }
}

async function saveEventHandler(event) {
  event.preventDefault();
  creditButton.removeEventListener("click", saveEventHandler);
  console.log(studentId);
  //
  //
  // new credit amount logic
  let newCreditAmount = fetchedData.fees.credit + Number(creditAmount.value);
  let newCreditArray = fetchedData.creditAmount;
  console.log(fetchedData.fees.credit);
  console.log(Number(creditAmount));
  console.log(newCreditAmount);
  console.log(newCreditArray);
  newCreditArray.push({
    date: `${formattedDate}`,
    amount: `${creditAmount.value}`,
    bill: `${creditBill.value}`,
  });
  //
  //
  //
  let data = {
    creditAmount: newCreditArray,
    fees: {
      debit: fetchedData.fees.debit,
      credit: newCreditAmount,
    },
  };
  const patchURL = `https://cka-backend.onrender.com/students/update/${studentId}`;
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  await fetch(patchURL, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response data:", data);
      notice.style.opacity = "100";
      fetchStudent();
      setTimeout(() => {
        notice.style.opacity = "0";
      }, 2000);
    })
    .catch((error) => {
      console.error("There was a problem with the delete operation:", error);
      notice.innerHTML = "<h4>Failed!</h4><p>Update failed</p>";
      notice.style.backgroundColor = "rgba(254, 205, 211, 0.7)";
      notice.style.border = "1px solid #D32F2F";
      notice.style.opacity = "100";
      setTimeout(() => {
        notice.style.opacity = "0";
        noticeToDefault();
      }, 2000);
    });
  searchFormInput.value = "";
}

function noticeToDefault() {
  setTimeout(() => {
    notice.style.backgroundColor = "rgba(187, 247, 208, 0.7)";
    notice.style.border = "1px solid #50c156";
    notice.innerHTML = "<h4>Sucess!</h4><p>Student updated</p>";
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
