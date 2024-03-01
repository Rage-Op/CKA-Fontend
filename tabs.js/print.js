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
let feeTableBody = document.querySelector("#fee-due-table-body");

window.addEventListener("load", () => {
  generateTable(0);
});

async function generateTable(studentBatch) {
  let getURL = "https://cka-backend.onrender.com/students";
  let response = await fetch(getURL);
  let data = await response.json();
  let studentCount = data.length;
  // let loopTimes = Math.ceil(studentCount / 12);
  for (studentBatch; studentBatch <= studentBatch + 12; studentBatch += 2) {
    let pronoun1, pronoun2;
    if (data[studentBatch].gender == "male") {
      pronoun1 = "son";
    } else {
      pronoun1 = "daughter";
    }
    if (data[studentBatch + 1].gender == "male") {
      pronoun2 = "son";
    } else {
      pronoun2 = "daughter";
    }
    let feesTableRow = document.createElement("tr");
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
        <p>Studentt Id: <b>${data[studentBatch].studentId}</b></p>
        <p>
          Dear Parents, your ${pronoun1}
          <b>${data[studentBatch].name}</b> who studies in class
          <b>${data[studentBatch].class}</b> has pending due up to the month of
          <b>${data[studentBatch].class}</b> is Rs. <b>${
      data[studentBatch].fees.debit
    }</b>.So, please pay the fee
          within 5 days.
        </p>
      </div>
      <div class="box-bottom">
        <p>Date: <b>${data.class}</b></p>
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
        <p>Studentt Id: <b>${data[studentBatch + 1].studentId}</b></p>
        <p>
          Dear Parents, your ${pronoun2}
          <b>${data[studentBatch + 1].class}</b> who studies in class
          <b>${
            data[studentBatch + 1].class
          }</b> has pending due up to the month of
          <b>${data[studentBatch + 1].class}</b> is Rs. <b>${
      data[studentBatch + 1].class
    }</b>.So, please pay the fee
          within 5 days.
        </p>
      </div>
      <div class="box-bottom">
        <p>Date: <b>${data[studentBatch + 1].class}</b></p>
        <p>Accountant</p>
      </div>
    </div>
  </td>`;
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
  fetchData();
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
