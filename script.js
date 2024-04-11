var input_value = document.querySelector("#input-area");
const numpad = document.querySelector("#numpad");
const buttons = numpad.querySelectorAll(":scope > button");
const reset = numpad.querySelector(":scope > button:nth-child(17)");
const result = numpad.querySelector(":scope > button:nth-child(18)");
const del = numpad.querySelector(":scope > button:nth-child(4)");
const keys_to_prevent_at_beginning = ["+", "/", "*", ".", "-"];

function sanitizeExpression(expression) {
  return expression.replace(/x/g, "*");
}

const calc = () => {
  input_value.value = sanitizeExpression(input_value.value);
  try {
    input_value.value = eval(input_value.value);
    if (!isFinite(input_value.value)) {
      alert("Invalid expression");
      input_value.value = "";
    }
  } catch (error) {}
};

const append = operator => {
  if (
    input_value.value.slice(-1) !== "-" &&
    input_value.value.slice(-1) !== "+" &&
    input_value.value.slice(-1) !== "/" &&
    input_value.value.slice(-1) !== "x" &&
    input_value.value.slice(-1) !== "." &&
    input_value.value !== ""
  )
    input_value.value += operator;
};

// document.addEventListener("keyup", e => {
//   if (e.key == "-" && input_value.value == "") {
//     console.log("working");
//     return (input_value.value = e.target.value.replace(/[^0-9\-]/g, ""));
//   }

//   return (input_value.value = e.target.value.replace(/[^0-9+\-*./]/g, ""));
// });

// document.addEventListener("keydown", e => {
//   input_value.focus();
//   console.log(e);
//   if (e.key == "Enter") calc();

//   if (
//     [46, 8, 9, 27, 13].indexOf(e.key) !== -1 ||
//     (e.key === 65 && e.ctrlKey === true) ||
//     (e.key >= 48 && e.key <= 57)
//   ) {
//     return;
//   } else {
//     e.preventDefault();
//     return false;
//   }
// });

buttons.forEach(button => {
  button.addEventListener("click", e => {
    if (input_value.value == "" && e.target.textContent == "-")
      input_value.value = "-";

    if (
      e.target.textContent !== "DEL" &&
      e.target.textContent != "=" &&
      e.target.textContent != "-" &&
      e.target.textContent != "+" &&
      e.target.textContent != "/" &&
      e.target.textContent != "." &&
      e.target.textContent != "x"
    )
      input_value.value += button.textContent;
  });
});

reset.addEventListener("click", () => {
  input_value.value = "";
  input_value.blur();
});

result.addEventListener("click", calc);

del.addEventListener("click", () => {
  input_value.value = input_value.value.slice(0, -1);
});
