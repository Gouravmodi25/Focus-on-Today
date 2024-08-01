const checkbox = document.querySelectorAll(".custom-checkbox");
const input = document.querySelectorAll(".goal-input");
const error = document.querySelector(".warning");
const progressBar = document.querySelector(".bar");
const progressValue = document.querySelector(".progress-value");

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

checkbox.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allInput = [...input].every((input) => {
      return input.value;
    });
    if (allInput) {
      checkbox.parentElement.classList.toggle("completed");
      progressValue.style.width = "99.9%";
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
      console.log(inputId);
    }
    if (!allInput) {
      error.parentElement.classList.add("show-error");
    }
  });
});

input.forEach((input) => {
  input.value = allGoals[input.id].name;
  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }
  input.addEventListener("focus", () => {
    error.parentElement.classList.remove("show-error");
  });
  input.addEventListener("input", (e) => {
    allGoals[input.id] = {
      name: input.value,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
    console.log(allGoals);
  });
});
