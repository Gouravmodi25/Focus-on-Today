const checkbox = document.querySelectorAll(".custom-checkbox");
const input = document.querySelectorAll(".goal-input");
const error = document.querySelector(".warning");
const progressBar = document.querySelector(".bar");
const progressValue = document.querySelector(".progress-value");
const progressSpanValue = document.querySelector(".progress-value p");
const barLabel = document.querySelector(".bar-label");

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let allGoalsLength = Object.values(allGoals).length;
let completedGoalsCount = Object.values(allGoals).filter((item) => {
  return item.completed;
}).length;
let uncompletedGoals = Object.values(allGoals).filter((item) => {
  return item.completed == false;
}).length;
console.log(uncompletedGoals);
progressValue.style.width = `${(completedGoalsCount / allGoalsLength) * 100}%`;
progressSpanValue.innerText = `${completedGoalsCount}/${allGoalsLength} completed`;
switch (completedGoalsCount) {
  case 1:
    barLabel.innerText = "Well begun is Half done!";
    break;
  case 2:
    barLabel.innerText = "Just a way by completing your goals!";
    break;
  case 3:
    barLabel.innerText =
      "Whoa! You just completed all the goals, time for chill :D";
  default:
    barLabel.innerText = "Raise the bar by completing your goals!";
    break;
}

checkbox.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allInput = [...input].every((input) => {
      return input.value;
    });
    if (allInput) {
      checkbox.parentElement.classList.toggle("completed");
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
      completedGoalsCount = Object.values(allGoals).filter((item) => {
        return item.completed;
      }).length;
      uncompletedGoals = Object.values(allGoals).filter((item) => {
        return item.completed == false;
      }).length;
      allGoalsLength = Object.values(allGoals).length;
      progressValue.style.width = `${(completedGoalsCount / 4) * 100}%`;
      progressSpanValue.innerText = `${completedGoalsCount}/${allGoalsLength} completed`;
      switch (completedGoalsCount) {
        case 1:
          barLabel.innerText = "Well begun is Half done!";
          break;
        case 2:
          barLabel.innerText = "Just a way by completing your goals!";
          break;
        case 3:
          barLabel.innerText =
            "Whoa! You just completed all the goals, time for chill :D";
        default:
          barLabel.innerText = "Raise the bar by completing your goals!";
          break;
      }
    }
    if (!allInput) {
      error.parentElement.classList.add("show-error");
    }
  });
});

input.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;
    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    error.parentElement.classList.remove("show-error");
  });
  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    allGoals[input.id] = {
      name: input.value,
      completed: false,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
