const checkbox = document.querySelectorAll(".custom-checkbox");
const input = document.querySelectorAll(".goal-input");
const error = document.querySelector(".warning");
const progressBar = document.querySelector(".bar");
const progressValue = document.querySelector(".progress-value");
checkbox.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allInput = [...input].every((input) => {
      return input.value;
    });
    if (allInput) {
      checkbox.parentElement.classList.toggle("completed");
      progressValue.style.width = "99.9%";
    }
    if (!allInput) {
      error.parentElement.classList.add("show-error");
    }
  });
});

input.forEach((input) => {
  input.addEventListener("focus", () => {
    error.parentElement.classList.remove("show-error");
  });
});
