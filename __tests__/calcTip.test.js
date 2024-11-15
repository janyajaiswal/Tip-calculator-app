import { calcTip, verifier, renderOutput } from "../src/js/index"; // Adjust path as needed

describe("Tip Calculator Tests", () => {
  beforeEach(() => {
    // Set up a mock DOM structure with all required elements
    document.body.innerHTML = `
      <div class="percentages-container">
        <button class="radio-parcent" value="10">10%</button>
        <button class="radio-parcent" value="15">15%</button>
        <button class="radio-parcent" value="20">20%</button>
      </div>
      <input id="bill" value="100" />
      <input id="persons" value="2" />
      <input class="input-custom" />
      <div id="tip">0</div>
      <div id="total">0</div>
      <div class="error-msg"></div>
      <button class="btn-reset">Reset</button>
    `;
  });

  test("calcTip returns correct values", () => {
    const result = calcTip(100, 15, 2);
    expect(result.tip).toBeCloseTo(7.5, 2); // Tip per person
    expect(result.total).toBeCloseTo(57.5, 2); // Total per person
  });

  test("Percentage button click updates the percentage correctly", () => {
    const bill = 200;
    const percent = 15;
    const persons = 4;
    verifier(bill, percent, persons);

    const tipOutput = document.getElementById("tip");
    const totalOutput = document.getElementById("total");

    expect(tipOutput.textContent).toBe("7.50");
    expect(totalOutput.textContent).toBe("57.50");
  });

  test("calcTip handles zero bill correctly", () => {
    const result = calcTip(0, 15, 2);
    expect(result.tip).toBe(0);
    expect(result.total).toBe(0);
  });

  test("calcTip handles zero people gracefully", () => {
    expect(() => calcTip(100, 15, 0)).toThrow("Number of people cannot be zero");
  });

  test("calcTip handles large values", () => {
    const result = calcTip(100000, 20, 10);
    expect(result.tip).toBeCloseTo(2000, 2); // Tip per person
    expect(result.total).toBeCloseTo(12000, 2); // Total per person
  });

  test("Custom percentage input updates correctly", () => {
    const inpCustom = document.querySelector(".input-custom");
    inpCustom.value = "25";
    verifier(200, +inpCustom.value, 4);

    const tipOutput = document.getElementById("tip");
    const totalOutput = document.getElementById("total");

    expect(tipOutput.textContent).toBe("12.50");
    expect(totalOutput.textContent).toBe("62.50");
  });
});
