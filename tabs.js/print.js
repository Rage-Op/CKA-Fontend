//
//
// print Logic
document.getElementById("printButton").addEventListener("click", function () {
  printJS({
    printable: "toPrint",
    type: "html",
    style: `
      @media print {
        .no-print { display: none; }
        * {
        padding: 0;
        margin: 0;
        }
        #toPrint {
          border-collapse: seperate;
          border-spacing: 8px;
        }
        .print-box {
          border: 1px solid black;
          border-radius: 12px;
          flex: 1 0 48%;
        }
        .print-box .box-top,
        .print-box .box-mid,
        .print-box .box-bottom {
          text-align: center;
          padding: 5px 10px;
          line-height: 1.01;
        }
        .print-box .box-mid {
          text-align: justify;
        }
        .print-box .box-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .box-top-left > img {
          height: 56px;
          aspect-ratio: 1 / 1;
        }
        .box-top-right {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .print-box .box-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    `,
  });
});
//
//
//main Logic
let nextButton = document.querySelector("#print-next-button");
let feesTableBody = document.querySelector("#fee-due-table-body");
let printStudentId = document.querySelector("#print-studentId");
let printDate = document.querySelector("#print-date");
let globalData;
let countBatch = 0;
window.addEventListener("load", async () => {
  let getURL = "https://cka-backend.onrender.com/ascending-students";
  let response = await fetch(getURL);
  let data = await response.json();
  globalData = data;
  updateStudentId(countBatch);
  generateTable(countBatch);
  countBatch += 12;
  let dateURL = "https://cka-backend.onrender.com/bs-date";
  let responseDate = await fetch(dateURL);
  let datetimeStr = await responseDate.json();
  let datePart = datetimeStr.split(" ")[0];
  let parts = datePart.split("-");
  printDate.textContent = `${parts[0]}/${parts[1]}/${parts[2]}`;
});

nextButton.addEventListener("click", () => {
  if (countBatch < globalData.length) {
    feesTableBody.innerHTML = "";
    updateStudentId(countBatch);
    generateTable(countBatch);
    countBatch += 12;
  } else {
    console.log("no more students!!");
  }
});

function updateStudentId(countBatch) {
  if (countBatch < globalData.length) {
    let countBatch2 = countBatch + 12;
    if (countBatch2 > globalData.length) {
      countBatch2 = globalData.length;
    }
    printStudentId.textContent = `${countBatch} - ${countBatch2}`;
  }
}

async function generateTable(studentBatch) {
  let dateURL = "https://cka-backend.onrender.com/bs-date";
  let responseDate = await fetch(dateURL);
  let datetimeStr = await responseDate.json();
  let datePart = datetimeStr.split(" ")[0];
  let parts = datePart.split("-");
  let formattedDate = `${parts[0]}/${parts[1]}/${parts[2]}`;
  let getURL = "https://cka-backend.onrender.com/ascending-students";
  let response = await fetch(getURL);
  let data = await response.json();
  for (let i = studentBatch; i < studentBatch + 12; i += 2) {
    const [year, month, day] = formattedDate.split("/");
    let bsMonths = [
      "Baisakh",
      "Jestha",
      "Asar",
      "Shrawan",
      "Bhadra",
      "Ashwin",
      "Kartik",
      "Mangsir",
      "Poush",
      "Magh",
      "Falgun",
      "Chaitra",
    ];
    let bsMonth = bsMonths[parseInt(month) - 1];
    let currentMonth = bsMonth;
    if (!data[i] && !data[i + 1]) {
      break;
    } else if (data[i] && !data[i + 1]) {
      let pronoun1;
      if (data[i].gender == "male") {
        pronoun1 = "son";
      } else {
        pronoun1 = "daughter";
      }
      let feesTableRow = document.createElement("tr");
      let due1 = data[i].fees.debit - data[i].fees.credit;
      feesTableRow.innerHTML = `<td>
          <div class="print-box">
          <div class="box-top">
          <div class="box-top-left">
            <img src="./../content/logo.jpg" alt="CKA" />
          </div>
          <div class="box-top-right">
            <div class="box-top-text">
              <h4>CHILDREN KINGDOM ACADEMY</h4>
              <p>Siddharthanagar-06, Bhairahawa</p>
              <p>Phone: +977-9847155155, +977-9804415786</p>
            </div>
          </div>
        </div>
              <div class="box-mid">
              <hr />
              <p>Student Id: <b>${data[i].studentId}</b></p>
              <p>
                Dear Parents, your ${pronoun1}
                <b>${data[i].name}</b> who studies in class
                <b>${data[i].class}</b> has pending due up to the month of
                <b>${currentMonth}</b> of Rs. <b>${due1}</b>.So, please pay the fee
                within 5 days.
              </p>
            </div>
            <div class="box-bottom">
              <p>Date: <b>${formattedDate}</b></p>
              <p>Accountant</p>
            </div>
          </div>
        </td>
        <td>
          <div class="print-box">
          <div class="box-top">
          <div class="box-top-left">
            <img src="./../content/logo.jpg" alt="CKA" />
          </div>
          <div class="box-top-right">
            <div class="box-top-text">
              <h4>CHILDREN KINGDOM ACADEMY</h4>
              <p>Siddharthanagar-06, Bhairahawa</p>
              <p>Phone: +977-9847155155, +977-9804415786</p>
            </div>
          </div>
        </div>
              <div class="box-mid">
              <hr />
              <p>Student Id: <b>undefined</b></p>
              <p>
                Dear Parents, your 
                <b>undefined</b> who studies in class
                <b>undefined</b> has pending due up to the month of
                <b>undefined</b> of Rs. <b>undefined</b>.So, please pay the fee
                within 5 days.
              </p>
            </div>
            <div class="box-bottom">
              <p>Date: <b>undefined</b></p>
              <p>Accountant</p>
            </div>
          </div>
        </td>`;
      feesTableBody.appendChild(feesTableRow);
    } else {
      let pronoun1;
      let pronoun2;
      if (data[i].gender == "male") {
        pronoun1 = "son";
      } else {
        pronoun1 = "daughter";
      }
      if (data[i + 1].gender == "male") {
        pronoun2 = "son";
      } else {
        pronoun2 = "daughter";
      }
      let feesTableRow = document.createElement("tr");
      let due1 = data[i].fees.debit - data[i].fees.credit;
      let due2 = data[i + 1].fees.debit - data[i + 1].fees.credit;
      feesTableRow.innerHTML = `<td>
          <div class="print-box">
          <div class="box-top">
          <div class="box-top-left">
            <img src="./../content/logo.jpg" alt="CKA" />
          </div>
          <div class="box-top-right">
            <div class="box-top-text">
              <h4>CHILDREN KINGDOM ACADEMY</h4>
              <p>Siddharthanagar-06, Bhairahawa</p>
              <p>Phone: +977-9847155155, +977-9804415786</p>
            </div>
          </div>
        </div>
              <div class="box-mid">
              <hr />
              <p>Student Id: <b>${data[i].studentId}</b></p>
              <p>
                Dear Parents, your ${pronoun1}
                <b>${data[i].name}</b> who studies in class
                <b>${data[i].class}</b> has pending due up to the month of
                <b>${currentMonth}</b> of Rs. <b>${due1}</b>.So, please pay the fee
                within 5 days.
              </p>
            </div>
            <div class="box-bottom">
              <p>Date: <b>${formattedDate}</b></p>
              <p>Accountant</p>
            </div>
          </div>
        </td>
        <td>
          <div class="print-box">
          <div class="box-top">
          <div class="box-top-left">
            <img src="./../content/logo.jpg" alt="CKA" />
          </div>
          <div class="box-top-right">
            <div class="box-top-text">
              <h4>CHILDREN KINGDOM ACADEMY</h4>
              <p>Siddharthanagar-06, Bhairahawa</p>
              <p>Phone: +977-9847155155, +977-9804415786</p>
            </div>
          </div>
        </div>
              <div class="box-mid">
              <hr />
              <p>Student Id: <b>${data[i + 1].studentId}</b></p>
              <p>
                Dear Parents, your ${pronoun2}
                <b>${data[i + 1].name}</b> who studies in class
                <b>${data[i + 1].class}</b> has pending due up to the month of
                <b>${currentMonth}</b> of Rs. <b>${due2}</b>.So, please pay the fee
                within 5 days.
              </p>
            </div>
            <div class="box-bottom">
              <p>Date: <b>${formattedDate}</b></p>
              <p>Accountant</p>
            </div>
          </div>
        </td>`;
      feesTableBody.appendChild(feesTableRow);
    }
  }
}
//main Logic
//
//
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
  // fetchData();
  if (window.innerWidth < 768) {
    sideBar.classList.add("close");
  } else {
    sideBar.classList.remove("close");
  }
});
//
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
