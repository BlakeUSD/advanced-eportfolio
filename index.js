TEMPLATE_ID = "template_ptmmqml"
SERVICE_ID = "service_7as0x5x"
PUBLIC_KEY = "Q-ktIH9urgG4gFffv"

let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

// Functionality for SVG shapes
function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  // get mouse position and scale it
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  //loop over shapes array
  for (let i = 0; i < shapes.length; ++i) {
    // determine if a shape is odd or even, then return a boolean integer for either case
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    // Move and rotate shapes based on mouse movement and their boolean
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px) rotate(${x * boolInt * 10}deg)`
  }
}

// Toggle Theme between Light and Dark
function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList.add("dark-theme");
  }
  else {
    document.body.classList.remove("dark-theme");
  }
}

// Functionality for contact form
async function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  const form = document.getElementById("contact__form");

  loading.classList.add("modal__overlay--visible");
  await emailjs.sendForm(
    SERVICE_ID,
    TEMPLATE_ID,
    event.target,
    PUBLIC_KEY
  )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList.add("modal__overlay--visible");
    })
    .catch((err) => {
      console.log(err)
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly at dellano.blake@outlook.com"
      );
    });
  // Remove success state, clear form, and close the modal
  setTimeout(() => {
    success.classList.remove("modal__overlay--visible");
    form.reset();
    toggleModal()
  }, 3000)
}

// Functionality for toggling modal
function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  } else {
    isModalOpen = true;
    return document.body.classList.add("modal--open");
  }
}

