"use strict";
import "../sass/main.scss";

// Main function to calculate the tip
export const calcTip = function (bill, percent, person) {
  if (person === 0) throw new Error("Number of people cannot be zero"); // Handle zero people
  const totalTip = (bill * percent) / 100;
  const tip = totalTip / person;
  const total = (bill + totalTip) / person;

  return { tip: tip, total: total };
};

// Function to render the output values in the DOM
export const renderOutput = function (obj) {
  const outputTip = document.getElementById("tip");
  const outputTotal = document.getElementById("total");
  outputTip.textContent = obj.tip.toFixed(2);
  outputTotal.textContent = obj.total.toFixed(2);
};

// Verifier function to check input values and trigger calculations
export const verifier = function (bill, percent, person) {
  if (bill === undefined || percent === undefined || person === undefined) return;
  renderOutput(calcTip(bill, percent, person));
};

// Immediately Invoked Function Expression (IIFE) to manage DOM events
(function () {
  const inpBill = document.getElementById("bill");
  const parcents = document.querySelector(".percentages-container");
  const inpCustom = document.querySelector(".input-custom");
  const inpPerson = document.getElementById("persons");
  const allRadio = document.querySelectorAll(".radio-parcent");
  const errorMsgEl = document.querySelector(".error-msg");
  const btnReset = document.querySelector(".btn-reset");

  // Event listener for percentage buttons
  if (parcents) {
    parcents.addEventListener("click", function (event) {
      const radioEl = event.target.closest(".radio-parcent");
      if (!radioEl) return;

      const curPers = +radioEl.value;
      inpCustom.value = "";

      verifier(+inpBill.value, curPers, +inpPerson.value);
    });
  }

  // Event listener for custom percentage input
  if (inpCustom) {
    inpCustom.addEventListener("input", function () {
      const curPers = +inpCustom.value;
      allRadio.forEach((radio) => {
        if (radio.checked) radio.checked = false;
      });

      verifier(+inpBill.value, curPers, +inpPerson.value);
    });
  }

  // Event listener for bill input
  if (inpBill) {
    inpBill.addEventListener("input", function () {
      verifier(+inpBill.value, +inpCustom.value || +document.querySelector(".radio-parcent:checked")?.value, +inpPerson.value);
    });
  }

  // Event listener for number of people input
  if (inpPerson) {
    inpPerson.addEventListener("input", function () {
      if (+inpPerson.value < 1) {
        inpPerson.style.outline = "2px solid var(--red)";
        errorMsgEl.textContent = "Can't be zero"; // Display error message
      } else {
        inpPerson.style.outline = null;
        errorMsgEl.textContent = ""; // Clear error message
        verifier(+inpBill.value, +inpCustom.value || +document.querySelector(".radio-parcent:checked")?.value, +inpPerson.value);
      }
    });
  }

  // Reset function to clear all inputs and outputs
  const reset = function () {
    inpBill.value = "";
    inpCustom.value = "";
    inpPerson.value = "";
    allRadio.forEach((radio) => (radio.checked = false));
    renderOutput({ tip: 0, total: 0 }); // Reset outputs to "0.00"
  };

  // Event listener for reset button
  if (btnReset) {
    btnReset.addEventListener("click", reset);
  }
})();
