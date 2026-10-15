// ATUR TANGGAL JADIAN DI SINI (2 Digit)
const CORRECT_DAY = "17";   // Tanggal
const CORRECT_MONTH = "09"; // Bulan (01 - 12)
const CORRECT_YEAR = "2026"; // Tahun

let isUnlocked = false;

// Fungsi untuk mengisi angka tanggal 1-31 secara otomatis
function populateDays() {
  const daySelect = document.getElementById('date-day');
  if (!daySelect) return;
  
  daySelect.innerHTML = '<option value="">Tgl</option>';

  for (let i = 1; i <= 31; i++) {
    const val = i < 10 ? '0' + i : '' + i;
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = i;
    daySelect.appendChild(opt);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  populateDays();
});
// Buka Modal Lock
function openLockModal() {
  if (!isUnlocked) {
    const modal = document.getElementById('lock-modal');
    if (modal) {
      modal.classList.add('show');
    }
  }
}

// Cek Jawaban Tanggal
function checkDatePasscode() {
  const userDay = document.getElementById('date-day').value;
  const userMonth = document.getElementById('date-month').value;
  const userYear = document.getElementById('date-year').value;
  const errorMsg = document.getElementById('lock-error-msg');

  if (userDay === CORRECT_DAY && userMonth === CORRECT_MONTH && userYear === CORRECT_YEAR) {
    isUnlocked = true;
    errorMsg.style.display = 'none';
    document.getElementById('lock-modal').classList.remove('show');

    document.getElementById('lock-icon-display').innerText = '🔓';
    document.getElementById('lock-status-text').innerText = 'Kunci Terbuka! ❤️';
    document.getElementById('lock-sub-text').innerText = 'Klik "Lanjut" di bawah untuk melihat isinya!';

    document.getElementById('btn-next').disabled = false;

    toggleMusic();
  } else {
    errorMsg.style.display = 'block';
  }
}
function changeSlide(direction) {
  // Cegah berpindah slide jika kunci belum dibuka
  if (!isUnlocked && direction > 0) return;

  const nextSlide = currentSlide + direction;
  if (nextSlide >= 1 && nextSlide <= totalSlides) {
    document.getElementById(`slide-${currentSlide}`).classList.remove('active');
    currentSlide = nextSlide;
    document.getElementById(`slide-${currentSlide}`).classList.add('active');

    updateNav();
  }
}

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
// Variabel untuk menyimpan input sandi
let enteredPin = "";
const correctPin = "170926"; // 17 September 2026

function pressKey(num) {
  if (enteredPin.length < 6) {
    enteredPin += num;
    updatePinDisplay();
  }
}

function clearKey() {
  enteredPin = "";
  updatePinDisplay();
  document.getElementById('passcode-error').innerText = "";
}

function updatePinDisplay() {
  let displayStr = "";
  for (let i = 0; i < 6; i++) {
    if (i < enteredPin.length) {
      displayStr += enteredPin[i] + " ";
    } else {
      displayStr += "_ ";
    }
    
    // Memberikan spasi format tanggal DD / MM / YY
    if (i === 1 || i === 3) displayStr += "/ ";
  }
  document.getElementById('passcode-display').innerText = displayStr.trim();
}

function submitPasscode() {
  const errorText = document.getElementById('passcode-error');
  if (enteredPin === correctPin) {
    errorText.style.color = "#77dd77";
    errorText.innerText = "Sandi benar! Membuka hati... 🤍";
    setTimeout(() => {
      currentSlide++; // Lanjut ke slide berikutnya setelah sandi benar
      updateSlides();
      enteredPin = "";
      updatePinDisplay();
      errorText.innerText = "";
    }, 1000);
  } else {
    errorText.style.color = "#ff758f";
    errorText.innerText = "Sandi salah sayang, coba ingat lagi! 🥺";
    // Efek getar kecil / reset
    setTimeout(() => {
      enteredPin = "";
      updatePinDisplay();
    }, 800);
  }
}
