const texts = [
  "JUST FOR EDUCATIONAL PURPOSE",
  "BY ARMAAN MULANI",
  "1st YEAR FRONT-END PROJECT"
];

// CHANGING OFFERS SECTION ON THE TOP
const changingtext = document.getElementById("top-changing_offers");
let offerindex = 0;

function showNextText() {
    changingtext.textContent = texts[offerindex];
    
    // Fade in from left
    changingtext.style.opacity = 1;
    changingtext.style.transform = "translateX(0px)";


    setTimeout(() => {
        // Fade out to left
        changingtext.style.opacity = 0;
        changingtext.style.transform = "translateX(-50px)";

        // After fade-out, show next
        setTimeout(() => {
        offerindex = (offerindex + 1) % texts.length;
        showNextText();
        }, 500); // Match CSS transition duration

    }, 2000); // Visible duration
}

showNextText();


// NAVIGATE TO THE PRODUCT PAGE

const cards = document.querySelectorAll(".prod-card");
cards.forEach(card => {

  card.addEventListener("click", function() {
    const prodId = card.getAttribute("data-id");
    localStorage.setItem('selectedShoe', prodId);
    window.location.href = "/productpage/productpage.html";
  });
});

