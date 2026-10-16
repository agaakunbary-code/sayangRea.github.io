// Generate falling hearts strictly inside container
const heartsContainer = document.getElementById('heartsContainer');
const heartSymbols = ['❤️', '🤍', '✨', '💖'];
for (let i = 0; i < 18; i++) {
    const heart = document.createElement('div');
    heart.classList.add('falling-heart');
    heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = -Math.random() * 20 + 'px';
    heart.style.animationDuration = (Math.random() * 4 + 3) + 's';
    heart.style.animationDelay = (Math.random() * 5) + 's';
    heartsContainer.appendChild(heart);
}

// Slide Management
let currentSlide = 1;
const totalSlides = 6;

function showSlide(slideNum) {
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    document.getElementById(`slide${slideNum}`).classList.add('active');

    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === (slideNum - 1));
    });
    currentSlide = slideNum;
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    }
}

// Slide 1: Passcode Logic (Default: 170926)
let enteredPin = "";
const correctPin = "170926";

function pressNum(num) {
    if (enteredPin.length < 6) {
        enteredPin += num;
        updatePinDots();
    }
}

function clearPin() {
    enteredPin = "";
    updatePinDots();
    document.getElementById('errorMsg').innerText = "";
}

function updatePinDots() {
    const dots = document.querySelectorAll('#pinDots .dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('filled', index < enteredPin.length);
    });
}

function submitPin() {
    if (enteredPin === correctPin) {
        nextSlide();
    } else {
        document.getElementById('errorMsg').innerText = "Tanggal jadiannya salah! Coba lagi ya 😜";
        setTimeout(clearPin, 1200);
    }
}

// Slide 3: Photo Album Data
const photos = [
    { url: "WhatsApp Image 2026-10-15 at 05.25.35.jpeg?auto=format&fit=crop&w=400&q=80", caption: "ini pap paling cantik dan gemas menurut akuu. bukan brarti kamu kalo pap ga cantik, tapi disini kamu cantik bangett sukaaa❤️" },
    { url: "WhatsApp Image 2026-10-15 at 05.25.37.jpeg?auto=format&fit=crop&w=400&q=80", caption: "ini juja aku suka karna kek cewe cantik percaya dirii gitu, badas bangetlah pokonyaa. tapi kalo orang cantik emang harus pd mampus sihh" },
    { url: "WhatsApp Image 2026-10-15 at 05.25.39.jpeg?auto=format&fit=crop&w=400&q=80", caption: "aku sukaa pap cemberut kamuu, tapi yang ini ga kalahh cantik sayangg. senyum kamu manis bangettt" }
];
let currentPhotoIdx = 0;

function nextPhoto() {
    currentPhotoIdx = (currentPhotoIdx + 1) % photos.length;
    updatePhoto();
}

function prevPhoto() {
    currentPhotoIdx = (currentPhotoIdx - 1 + photos.length) % photos.length;
    updatePhoto();
}

function updatePhoto() {
    document.getElementById('polaroidImg').src = photos[currentPhotoIdx].url;
    document.getElementById('polaroidCaption').innerText = photos[currentPhotoIdx].caption;
    document.getElementById('photoCount').innerText = `${currentPhotoIdx + 1} / ${photos.length}`;
}

// Slide 5: Open Secret Letter
function openLetter() {
    document.getElementById('envelopeBox').style.display = 'none';
    document.getElementById('letterContent').style.display = 'block';
    document.getElementById('letterNextBtn').style.display = 'inline-block';
}

// Slide 6: Runaway Button
function moveButton() {
    const btn = document.getElementById('runawayBtn');
    const randomX = (Math.random() - 0.5) * 120;
    const randomY = (Math.random() - 0.5) * 80;
    btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}
// --- FITUR BACKSOUND HANYA IKON DI DALAM KOTAK ---
document.addEventListener("DOMContentLoaded", function() {
    // 1. Buat elemen audio (Ganti URL dengan link lagu favorit kalian)
    const bgMusic = new Audio("ssstik.io_1792164581911.mp3"); 
    bgMusic.loop = true;
    bgMusic.volume = 0.5;

    // 2. Buat tombol ikon musik di pojok atas dalam kotak kontainer
    const musicBtn = document.createElement("button");
    musicBtn.innerHTML = '<i class="fa-solid fa-music" style="opacity: 0.4;"></i>';
    
    // Styling tombol bulat rapi di dalam kotak
    Object.assign(musicBtn.style, {
        position: "absolute",
        top: "15px",
        right: "15px",
        zIndex: "99",
        background: "#fff0f0",
        color: "#ff8080",
        border: "1px solid #ff8080",
        borderRadius: "50%",
        width: "35px",
        height: "35px",
        fontSize: "14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        transition: "all 0.2s ease"
    });

    // Masukkan tombol ke dalam .container
    const container = document.querySelector('.container');
    if (container) {
        container.style.position = "relative";
        container.appendChild(musicBtn);
    }

    let isPlaying = false;

    // Fungsi Play/Pause bolak-balik saat tombol diklik
    musicBtn.addEventListener("click", function() {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fa-solid fa-music" style="opacity: 0.4;"></i>';
            musicBtn.style.background = "#fff0f0";
        } else {
            bgMusic.play().then(() => {
                musicBtn.innerHTML = '<i class="fa-solid fa-music fa-spin"></i>';
                musicBtn.style.background = "#ffe0e0";
            }).catch(e => {
                console.log("Autoplay dicegah browser:", e);
            });
        }
        isPlaying = !isPlaying;
    });

    // Otomatis putar musik saat ada interaksi pertama (klik layar/PIN)
    const triggerAutoplay = function() {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicBtn.innerHTML = '<i class="fa-solid fa-music fa-spin"></i>';
                musicBtn.style.background = "#ffe0e0";
            }).catch(() => {});
        }
        window.removeEventListener("click", triggerAutoplay);
    };
    window.addEventListener("click", triggerAutoplay);
});