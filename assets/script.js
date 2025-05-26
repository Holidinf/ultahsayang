const slidesText = {
  1: "Semoga aku jadi orang pertama yang ngucapin selamat ulang tahun. Tapi yang paling bikin aku bahagia, aku masih bisa nemenin kamu di hari spesial ini, sayang.",
  3: `Semoga di umur sayang sekarang semesta lebih berpihak, semoga bisa mendapatkan hal yang selama ini diperjuangkan.\n\nSemoga senantiasa diberi kebahagiaan.\n\nI love you on your birthday, and everyday, now and forever.`,
  4: `Aku mau ucapin banyak-banyak terima kasih buat selama ini. Terima kasih udah jalan sejauh ini, nerima kurang lebihnya aku, atas semua sabar dan effort sayang.\n\nMaaf aku belum bisa jadi yang paling ngerti sayang, belum bisa jadi cowok yang selalu bisa jaga sayang sepenuhnya.\n\nTapi aku beneran beruntung banget punya sayang. Jangan bosen ya, jangan jauh. Tetap sama aku, karena aku udah cukup berantakan kalau tanpa sayang. 💌`,
};

let typingTimeouts = {}; // Simpan timeout ID untuk masing-masing slide
let activeTypingSlide = null;

function typeText(text, elementId, btnId, slideIndex) {
  // Hentikan efek mengetik sebelumnya jika ada
  if (typingTimeouts[slideIndex]) {
    clearTimeout(typingTimeouts[slideIndex]);
  }

  let i = 0;
  const el = document.getElementById(elementId);
  const btn = document.getElementById(btnId);
  el.innerHTML = "";
  btn.style.display = "none";

  function typeChar() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      typingTimeouts[slideIndex] = setTimeout(typeChar, 60);
    } else {
      btn.style.display = "inline-block";
    }
  }

  typeChar();
}

function handleTypingForSlide(slideIndex) {
  if (activeTypingSlide === slideIndex) return;
  activeTypingSlide = slideIndex;

  const text = slidesText[slideIndex];
  const elementId = `slide${slideIndex}Text`;
  const btnId = `slide${slideIndex}Btn`;

  if (text && document.getElementById(elementId)) {
    typeText(text, elementId, btnId, slideIndex);
  }
}

function nextSlide() {
  const container = document.getElementById("sliderContainer");
  const currentSlide = Math.round(container.scrollLeft / window.innerWidth);
  const targetSlide = currentSlide + 1;

  container.scrollBy({
    left: window.innerWidth,
    behavior: "smooth",
  });

  setTimeout(() => {
    handleTypingForSlide(targetSlide);
  }, 600); // setelah scroll selesai
}

function goToFirstSlide() {
  nextSlide();
}

const giftWords = [
  "Aku berharap semua doa baikku buat sayang bisa dikabulin satu-satu 🥺",
  "Semoga hari-hari sayang penuh warna kayak pelangi 🌈",
  "Aku ngga bisa kasih kado mahal, tapi aku bisa janji terus ada buat sayang 💖",
  "Hari ini hari sayang, dan aku bangga jadi bagian dari hidup sayang 🎉",
];

function chooseGift(index) {
  Swal.fire({
    title: "🎁 Kado Terpilih",
    text: giftWords[index],
    confirmButtonText: "Lanjut yuk 💘",
  }).then(() => {
    nextSlide();
  });
}

window.onload = () => {
  handleTypingForSlide(1); // mulai dari slide 1

  const container = document.getElementById("sliderContainer");
  container.addEventListener("scroll", () => {
    const scrollX = container.scrollLeft;
    const currentSlide = Math.round(scrollX / window.innerWidth);
    handleTypingForSlide(currentSlide);
  });
};

function goToFirstSlide() {
  const music = document.getElementById("bgMusic");
  if (music) {
    music.play().catch((e) => {
      console.log("Autoplay gagal: ", e);
    });
  }
  nextSlide();
}
