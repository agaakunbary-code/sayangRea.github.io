// Generator Love Melayang Naik di Background
function createFloatingHeart() {
  const container = document.getElementById('hearts-container');
  if (!container) return;

  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.innerHTML = '❤️';
  
  // Random posisi horizontal, ukuran, dan durasi animasi
  const randomX = Math.random() * window.innerWidth;
  const randomSize = Math.random() * 16 + 10; // 10px sampai 26px
  const randomDuration = Math.random() * 5 + 5; // 5s sampai 10s
  const randomDelay = Math.random() * 3;

  heart.style.left = randomX + 'px';
  heart.style.fontSize = randomSize + 'px';
  heart.style.animationDuration = randomDuration + 's';
  heart.style.animationDelay = randomDelay + 's';

  container.appendChild(heart);

  // Hapus elemen setelah animasi selesai agar tidak membebani memori
  setTimeout(() => {
    heart.remove();
  }, (randomDuration + randomDelay) * 1000);
}

// Buat love baru setiap 400ms
setInterval(createFloatingHeart, 400);

let currentSlide = 1;
const totalSlides = 5;
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

// Fungsi Pindah Slide
function changeSlide(direction) {
  const nextSlide = currentSlide + direction;
  if (nextSlide >= 1 && nextSlide <= totalSlides) {
    if(!isPlaying && direction === 1) {
      toggleMusic();
    }

    document.getElementById(`slide-${currentSlide}`).classList.remove('active');
    currentSlide = nextSlide;
    document.getElementById(`slide-${currentSlide}`).classList.add('active');

    updateNav();
  }
}

// Update Navigasi (Tombol & Indicator Dot)
function updateNav() {
  document.getElementById('btn-prev').disabled = (currentSlide === 1);
  
  const nextBtn = document.getElementById('btn-next');
  if (currentSlide === totalSlides) {
    nextBtn.innerText = 'Selesai ❤️';
  } else {
    nextBtn.innerText = 'Lanjut';
  }

  // Update Dots
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === currentSlide - 1) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Toggle Play/Pause Musik
function toggleMusic() {
  if (!bgMusic) return;
  const musicIcon = document.getElementById('music-icon');
  const musicText = document.getElementById('music-text');

  if (isPlaying) {
    bgMusic.pause();
    musicIcon.innerText = '🎵';
    musicText.innerText = 'Play Musik';
    isPlaying = false;
  } else {
    bgMusic.play().then(() => {
      musicIcon.innerText = '⏸️';
      musicText.innerText = 'Pause';
      isPlaying = true;
    }).catch(err => {
      console.log("Autoplay ditahan browser, klik manual tombolnya.");
    });
  }
}

// Buka Popup Surat
function openLetter() {
  document.getElementById('letter-modal').classList.add('show');
}

// Tutup Popup Surat
function closeLetter() {
  document.getElementById('letter-modal').classList.remove('show');
}