// FUNGSI MEMBUAT LOVE TERBANG NAIK DI DALAM KOTAK APP
function spawnHeart() {
  const container = document.getElementById('hearts-container');
  const appContainer = document.querySelector('.app-container');
  if (!container || !appContainer) return;

  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.innerHTML = '🤍'; // Ikon love putih

  // Mengatur posisi horizontal acak Sesuai Lebar KOTAK (bukan seluruh layar)
  const containerWidth = appContainer.clientWidth;
  const startX = Math.random() * (containerWidth - 20); // Dikurangi dikit biar gak mepet pinggir
  
  // Ukuran love kecil (10px sampai 20px)
  const size = Math.random() * 10 + 10;
  // Durasi melayang (4 detik sampai 7 detik)
  const duration = Math.random() * 3 + 4;

  heart.style.left = startX + 'px';
  heart.style.fontSize = size + 'px';
  heart.style.animationDuration = duration + 's';

  container.appendChild(heart);

  // Hapus elemen love setelah animasinya selesai
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// Menjalankan pembuatan love setiap 350 milidetik
setInterval(spawnHeart, 350);

let currentSlide = 1;
const totalSlides = 5;
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

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

function updateNav() {
  document.getElementById('btn-prev').disabled = (currentSlide === 1);
  
  const nextBtn = document.getElementById('btn-next');
  if (currentSlide === totalSlides) {
    nextBtn.innerText = 'Selesai ❤️';
  } else {
    nextBtn.innerText = 'Lanjut';
  }

  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === currentSlide - 1) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

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

function openLetter() {
  document.getElementById('letter-modal').classList.add('show');
}

function closeLetter() {
  document.getElementById('letter-modal').classList.remove('show');
}