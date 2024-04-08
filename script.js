var input_value = document.querySelector("#input-area");
const numpad = document.querySelector("#numpad");
const buttons = numpad.querySelectorAll(":scope > button");
const reset = numpad.querySelector(":scope > button:nth-child(17)");
const result = numpad.querySelector(":scope > button:nth-child(18)");
const keys_to_prevent_at_beginning = ["+", "/", "*", ".", "-"];

document.addEventListener("keyup", e => {
  if (input_value.value == "")
    return (input_value.value = e.target.value.replace(/[^0-9\-]/g, ""));

  return (input_value.value = e.target.value.replace(/[^0-9+\-*/]/g, ""));
});

document.addEventListener("keydown", e => {
  input_value.focus();
  // const keys_to_prevent = ["+", "/", "*", "."];
  // if (keys_to_prevent.includes(e.key) && input_value.value == "") {
  //   e.preventDefault();
  // }
  // if (
  //   input_value.value == "" && !(e.key < 48 || e.key > 57 || e.key < 96 || e.key > 105)
  // ) {
  //   e.preventDefault();
  // }
  // if (
  //   ["109", "106", "110", "111", "107", "189", "190", "191", ""].indexOf(
  //     e.key
  //   ) !== -1
  // )
  //   return;
  // if (!(e.key < 48 || e.key > 57) && !(e.key < 96 || e.key > 105)) {
  //   e.preventDefault();
  // }
  // if (e.key != Number || !e.key.includes(keys_to_prevent)) e.preventDefault();

  if (
    [46, 8, 9, 27, 13].indexOf(e.key) !== -1 ||
    // Allow: Ctrl+A
    (e.key === 65 && e.ctrlKey === true) ||
    // Allow: home, end, left, right
    (e.key >= 35 && e.key <= 39)
  ) {
    return;
  }
  // Ensure that it is a number and stop the keypress
  // if (!(e.key < 48 || e.key > 57) || !(e.key < 96 || e.key > 105)) {
  //   e.preventDefault();
  // }
});

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.textContent != "DEL" && button.textContent != "=")
      input_value.value += button.textContent;
    input_value.focus();
  });
});

reset.addEventListener("click", () => {
  input_value.value = "";
  input_value.blur();
});

result.addEventListener("click", () => {
  if (/(--)|(\+\+)|(\*\*)|(\/\/)|([\-+*/]\s*[+\-*/])/.test(input_value.value)) {
    alert("Invalid expression");
    return;
  }
  try {
    input_value.value = eval(input_value.value);
    if (!isFinite(input_value.value)) {
      alert("Invalid expression");
      input_value.value = "";
    }
  } catch (error) {}
});
