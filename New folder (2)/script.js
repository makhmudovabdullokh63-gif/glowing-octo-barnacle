const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");

function setMenu(open) {
  nav.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuToggle.addEventListener("click", () => {
  setMenu(!nav.classList.contains("open"));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 700) setMenu(false);
});

const carousel = document.querySelector("#bookCarousel");
const cards = [...carousel.querySelectorAll(".book-card")];
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const pagination = document.querySelector("#pagination");

cards.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Go to course book ${index + 1}`);
  dot.addEventListener("click", () => {
    cards[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });
  pagination.appendChild(dot);
});

function currentIndex() {
  const center = carousel.scrollLeft + carousel.clientWidth / 2;
  let closest = 0;
  let distance = Infinity;
  cards.forEach((card, i) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const d = Math.abs(cardCenter - center);
    if (d < distance) { distance = d; closest = i; }
  });
  return closest;
}

function updatePagination() {
  const index = currentIndex();
  [...pagination.children].forEach((dot, i) => dot.classList.toggle("active", i === index));
}

function goTo(index) {
  const next = Math.max(0, Math.min(cards.length - 1, index));
  cards[next].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}

prevBtn.addEventListener("click", () => goTo(currentIndex() - 1));
nextBtn.addEventListener("click", () => goTo(currentIndex() + 1));

carousel.addEventListener("scroll", () => requestAnimationFrame(updatePagination));
carousel.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") { event.preventDefault(); goTo(currentIndex() - 1); }
  if (event.key === "ArrowRight") { event.preventDefault(); goTo(currentIndex() + 1); }
});
updatePagination();

document.querySelector("#year").textContent = new Date().getFullYear();
