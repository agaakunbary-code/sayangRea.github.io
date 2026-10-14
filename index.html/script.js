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
// =========================================================
// ATUR TANGGAL JADIAN KAMU DI SINI YAA!
// Contoh format: Tanggal '15', Bulan '09' (September), Tahun '2025'
// =========================================================
const CORRECT_DAY = "17";   // Ganti dengan tanggal jadian kamu (2 digit, misal: "05", "12", "20")
const CORRECT_MONTH = "09"; // Ganti dengan 2 digit bulan jadian (misal: "01" = Jan, "09" = Sept)
const CORRECT_YEAR = "2026"; // Ganti dengan tahun jadian (misal: "2025" / "2026")

let isUnlocked = false; // Status awal terkunci

// Auto-populate tanggal 1 - 31 ke dropdown
window.addEventListener('DOMContentLoaded', () => {
  const daySelect = document.getElementById('date-day');
  for (let i = 1; i <= 31; i++) {
    const val = i < 10 ? '0' + i : '' + i;
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = i;
    daySelect.appendChild(opt);
  }
});

// Buka Modal Lock
function openLockModal() {
  if (!isUnlocked) {
    document.getElementById('lock-modal').classList.add('show');
  }
}

// Cek Jawaban Tanggal
function checkDatePasscode() {
  const userDay = document.getElementById('date-day').value;
  const userMonth = document.getElementById('date-month').value;
  const userYear = document.getElementById('date-year').value;
  const errorMsg = document.getElementById('lock-error-msg');

  if (userDay === CORRECT_DAY && userMonth === CORRECT_MONTH && userYear === CORRECT_YEAR) {
    // KUNCI BENAR
    isUnlocked = true;
    errorMsg.style.display = 'none';
    document.getElementById('lock-modal').classList.remove('show');

    // Ubah tampilan card lock di slide 1
    document.getElementById('lock-icon-display').innerText = '🔓';
    document.getElementById('lock-status-text').innerText = 'Kunci Terbuka! ❤️';
    document.getElementById('lock-sub-text').innerText = 'Klik "Lanjut" di bawah untuk melihat isinya!';

    // Aktifkan tombol navigasi "Lanjut"
    document.getElementById('btn-next').disabled = false;

    // Otomatis putar musik begitu sukses buka kunci
    toggleMusic();
  } else {
    // KUNCI SALAH
    errorMsg.style.display = 'block';
  }
}

// Generator Love Melayang di Dalam App Container
function spawnHeart() {
  const container = document.getElementById('hearts-container');
  const appContainer = document.querySelector('.app-container');
  if (!container || !appContainer) return;

  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.innerHTML = '🤍';

  const containerWidth = appContainer.clientWidth;
  const startX = Math.random() * (containerWidth - 20);
  const size = Math.random() * 10 + 10;
  const duration = Math.random() * 3 + 4;

  heart.style.left = startX + 'px';
  heart.style.fontSize = size + 'px';
  heart.style.animationDuration = duration + 's';

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

setInterval(spawnHeart, 350);

let currentSlide = 1;
const totalSlides = 5;
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

function changeSlide(direction) {
  if (!isUnlocked && direction > 0) return; // Mencegah lanjut kalau belum dikunci

  const nextSlide = currentSlide + direction;
  if (nextSlide >= 1 && nextSlide <= totalSlides) {
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

  // Jika kunci belum dibuka, tombol lanjut tetap mati
  if (!isUnlocked) {
    nextBtn.disabled = true;
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
      console.log("Autoplay ditahan browser.");
    });
  }
}

function openLetter() {
  document.getElementById('letter-modal').classList.add('show');
}

function closeLetter() {
  document.getElementById('letter-modal').classList.remove('show');
}