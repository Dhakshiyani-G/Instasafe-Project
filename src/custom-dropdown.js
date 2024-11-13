// Get references to HTML elements
const valueInput = document.getElementById("valueInput");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const convertButton = document.getElementById("convertButton");
const resultLabel = document.getElementById("resultLabel");

// Function to restrict input length to 2 digits for the number input
valueInput.addEventListener("input", function () {
  if (valueInput.value.length > 2) {
    valueInput.value = valueInput.value.slice(0, 2);
  }
  checkInputs();
});

// Function to check if all inputs are filled to enable the button
function checkInputs() {
  const value = valueInput.value;
  const from = fromUnit.value;
  const to = toUnit.value;
  convertButton.disabled = !(value && from && to);
}

// Event listeners for select fields
fromUnit.addEventListener("change", checkInputs);
toUnit.addEventListener("change", checkInputs);

// Function to perform temperature conversion
function convertTemperature(value, from, to) {
  if (isNaN(value)) {
    return "Invalid input"; // Handle non-numeric input
  }

  let convertedValue;

  if (from === to) {
    return value; // Same unit, no conversion needed
  }

  // Convert 'value' to Celsius first, then to target unit
  if (from === "Celsius") {
    if (to === "Fahrenheit") {
      convertedValue = (value * 9) / 5 + 32;
    } else if (to === "Kelvin") {
      convertedValue = parseFloat(value) + 273.15;
    }
  } else if (from === "Fahrenheit") {
    if (to === "Celsius") {
      convertedValue = ((value - 32) * 5) / 9;
    } else if (to === "Kelvin") {
      convertedValue = ((value - 32) * 5) / 9 + 273.15;
    }
  } else if (from === "Kelvin") {
    if (to === "Celsius") {
      convertedValue = value - 273.15;
    } else if (to === "Fahrenheit") {
      convertedValue = ((value - 273.15) * 9) / 5 + 32;
    }
  }

  return convertedValue !== undefined
    ? convertedValue
    : "Conversion error";
}

// Event listener for the Convert button
convertButton.addEventListener("click", function () {
  const value = parseFloat(valueInput.value);
  const from = fromUnit.value;
  const to = toUnit.value;
  const result = convertTemperature(value, from, to);
  resultLabel.textContent = `The converted value is: ${result}`;
});
