var input_value = document.querySelector("#input-area");
const numpad = document.querySelector("#numpad");
const buttons = numpad.querySelectorAll(":scope > button");
const reset = numpad.querySelector(":scope > button:nth-child(17)");

document.addEventListener("keydown", e => {
  input_value.focus();
  const keys_to_prevent = ["+", "/", "*", "."];
  if (keys_to_prevent.includes(e.key) && input_value.value == "") {
    e.preventDefault();
  }
});

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (
      button.textContent != "DEL" ||
      button.textContent != "RESET" ||
      button != "="
    )
      input_value.value += button.textContent;
    input_value.focus();
  });
});

reset.addEventListener("click", () => {
  input_value.value = "";
  input_value.blur();
});
