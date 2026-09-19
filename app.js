const hobbies = [
  {
    name: "Snowboarding",
    image: "images/IMG_5186.JPG",
    alt: "Zitao snowboarding"
  },
  {
    name: "Basketball",
    image: "images/IMG_8430.JPG",
    alt: "Zitao playing basketball"
  }
];

const hobbyStage = document.getElementById("hobbyStage");
const hobbyButton = document.getElementById("hobbyButton");
const hobbyImage = document.getElementById("hobbyImage");
const hobbyName = document.getElementById("hobbyName");
const hobbyMessage = document.getElementById("hobbyMessage");
const dateOutput = document.getElementById("dateOutput");

let previousIndex = -1;

// Picks a random hobby. When more than one option exists,
// it avoids showing the same hobby twice in a row.
function getRandomHobbyIndex() {
  if (hobbies.length <= 1) return 0;

  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * hobbies.length);
  } while (nextIndex === previousIndex);

  return nextIndex;
}

// Reveals the selected hobby photo and updates the visible text.
function showRandomHobby() {
  const nextIndex = getRandomHobbyIndex();
  const hobby = hobbies[nextIndex];
  previousIndex = nextIndex;

  // Remove the reveal state first so repeated clicks animate cleanly.
  hobbyStage.classList.remove("has-result");

  window.setTimeout(() => {
    hobbyImage.src = hobby.image;
    hobbyImage.alt = hobby.alt;
    hobbyImage.removeAttribute("aria-hidden");
    hobbyName.textContent = hobby.name;
    hobbyMessage.textContent = `You got: ${hobby.name}. Shuffle again for another one.`;

    // Wait for the selected image before revealing it.
    if (hobbyImage.complete) {
      hobbyStage.classList.add("has-result");
    } else {
      hobbyImage.onload = () => hobbyStage.classList.add("has-result");
    }
  }, 160);
}

hobbyButton.addEventListener("click", showRandomHobby);

// Day.js formats the current date for the footer.
if (typeof dayjs !== "undefined") {
  dateOutput.textContent = `Viewed on ${dayjs().format("MMMM D, YYYY")}`;
} else {
  dateOutput.textContent = "Date unavailable";
}
