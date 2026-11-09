/**
 * JABATAN CHALLENGE — OPS TEMBAK GAGAK v2
 * Logik Klien Frontend & Pengendali Rangkaian Berkualiti Tinggi
 */

// =========================================================================
// ⚙️ TETAPAN PENTADBIR & KONFIGURASI SISTEM
// =========================================================================
const ADMIN_START_TIME = new Date("2026-10-25T09:40:00").getTime();
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxisPL5gkx98dVYXRbTq--BUXjo_RuIBWxBvLkyPnj5VGARKnqVnkzyeU056wnqXAYryA/exec";

const KL_QUESTIONS = [
  { q: "1. Apakah hasil terbesar dalam DBKL?", options: ["Caj pembangunan", "Kadar taksiran", "Lesen perniagaan", "Sewaan harta datuk bandar"], ans: 1 },
  { q: "2. Siapakah nama Datuk Bandar Kuala Lumpur yang ke 15?", options: ["Datuk Seri Fadlun Mak Ujud", "Datuk Seri Mahadi Che Ngah", "Datuk Haji Kamarulzaman Mat Salleh", "Datuk Seri Dr. Maimunah Mohd Sharif"], ans: 3 },
  { q: "3. Di manakah letaknya Unit Penswastaan dan Takaful, JKEW?", options: ["Tingkat 1 Menara 1", "Tingkat 14 Menara 2", "Tingkat 6 Menara 2", "Tingkat 14 Menara 1"], ans: 2 },
  { q: "4. Portal yang boleh digunakan untuk membayar cukai taksiran", options: ["Bayar@KL", "DBayar", "DBKLBayar", "Tempah@KL"], ans: 0 },
  { q: "5. Berapakah jumlah bahagian yang terdapat dalam Jabatan Kewangan?", options: ["2", "3", "4", "5"], ans: 2 },
  { q: "6. DBKL diterajui oleh Datuk Bandar Kuala Lumpur. Betul atau salah?", options: ["Betul", "Salah"], ans: 0 },
  { q: "7. Siapakah yang melantik Datuk Bandar Kuala Lumpur?", options: ["Yang di-Pertuan Agong", "Perdana Menteri", "Menteri Wilayah Persekutuan", "Jabatan Perkhidmatan Awam"], ans: 0 },
  { q: "8. Berapakah bilangan parlimen di bawah pentadbiran DBKL?", options: ["10", "11", "12", "13"], ans: 1 },
  { q: "9. Kajang merupakan salah satu parlimen di bawah pentadbiran DBKL. Betul atau salah?", options: ["Betul", "Salah"], ans: 1 },
  { q: "10. Berapa kalikah cukai taksiran perlu dibayar dalam setahun?", options: ["Setahun sekali", "Dua kali setahun", "Tiga kali setahun", "Empat kali setahun"], ans: 1 },
  { q: "11. Berapakah jumlah jabatan yang terdapat di DBKL?", options: ["22", "24", "26", "28"], ans: 2 },
  { q: "12. Bagaimanakah cara memohon rumah PPR DBKL?", options: ["Melalui sistem ePerumahan DBKL", "Melalui sistem eRakyat DBKL", "Melalui sistem eRahmah DBKL", "Melalui sistem eKota DBKL"], ans: 0 },
  { q: "13. Di manakah orang awam boleh mendapatkan maklumat tender terkini DBKL?", options: ["Melalui sistem e-Tender DBKL", "Melalui sistem e-Maklumat DBKL", "Melalui sistem e-Perolehan dan Pengurusan Projek DBKL", "Melalui sistem e-Kontrak DBKL"], ans: 2 },
  { q: "14. Di submodul DCoS manakah penyediaan Borang Tempahan / Purchase Order boleh dilaksanakan?", options: ["HCM", "EBS", "DREAMS", "Hyperion"], ans: 1 },
  { q: "15. Bagaimanakah cara membuat aduan kepada DBKL?", options: ["Melalui sistem e-Pengaduan@KL", "Melalui sistem Aduan@KL", "Melalui sistem e-Report@KL", "Melalui sistem Adu@KL"], ans: 3 },
  { q: "16. Nama penuh sistem kewangan berkomputer DBKL", options: ["DBKL system", "Oracle", "DBKL Core System", "DBKLBayar"], ans: 2 },
  { q: "17. Namakan Visi DBKL", options: ["Dinamik Bijaksana Kreatif Lestari", "Bandar Raya Sejahtera Untuk Semua Menjelang 2030", "Malaysia Madani", "Bersedia Menyumbang Bandaraya Cemerlang"], ans: 1 },
  { q: "18. Berapakah bilangan Pengarah Eksekutif yang terdapat dalam DBKL?", options: ["1", "2", "3", "4"], ans: 3 },
  { q: "19. Apakah nama penuh bagi Sistem Pengurusan Antirasuah DBKL?", options: ["ABMS - Anti-Bribery Malaysia System", "ABMS - Anti-Bribery Management System", "ABSM - Anti-Bribery Solution Management", "MSAB - Malaysia System for Anti Bribery"], ans: 1 },
  { q: "20. Sistem Br1D 2.0 merupakan sistem di bawah seliaan jabatan mana?", options: ["Jabatan Pelaksanaan Projek dan Penyelenggaraan Bangunan", "Jabatan Kawalan Bangunan", "Jabatan Kewangan", "Jabatan Perancangan Infrastruktur"], ans: 1 },
  { q: "21. Jabatan manakah yang melapor terus kepada Datuk Bandar Kuala Lumpur?", options: ["Jabatan Integriti", "Jabatan Kewangan", "Jabatan Penguatkuasaan", "Jabatan Pengurusan Sumber Manusia"], ans: 0 },
  { q: "22. Siapakah Datuk Bandar kedua yang mengetuai DBKL?", options: ["YBhg. Dato' Dr. Mazlan Ahmad", "YBhg. Tan Sri Dato' Lokman Yusof", "YBhg. Tan Sri Yaakob Abdul Latiff", "YBhg. Datuk Haji Mohmad Shaid Mohd Taufek"], ans: 2 },
  { q: "23. Berapakah keluasan Kuala Lumpur?", options: ["234km²", "243km²", "254km²", "299km²"], ans: 1 },
  { q: "24. Yang manakah merupakan sumber perundangan DBKL?", options: ["Akta Bandaraya Kuala Lumpur 1971", "Akta Bandaraya Kuala Lumpur 1972", "Akta Bandaraya Kuala Lumpur 1973", "Akta Bandaraya Kuala Lumpur 1974"], ans: 0 },
  { q: "25. Jabatan Ukur Bahan (JUB) terletak di bawah sektor", options: ["Pengurusan", "Pengurusan Projek", "Perancangan", "Pembangunan Sosio Ekonomi"], ans: 1 },
  { q: "26. Belanja Elaun Lebih Masa diperuntukkan dalam Peruntukan", options: ["Mengurus", "Pembangunan", "Kerajaan", "Swasta"], ans: 0 },
  { q: "27. Bayaran Cagaran boleh diterima dalam portal DBKLBayar", options: ["Betul", "Salah"], ans: 0 },
  { q: "28. Unit yang menguruskan permohonan pendahuluan / advance kakitangan DBKL", options: ["Unit Pembayaran", "Unit Pembiayaan Pembangunan", "Unit Perakuanan", "Unit Maklumat Kewangan Berkomputer"], ans: 0 },
  { q: "29. Kelulusan pertukaran dan pembelian aset kecil DBKL diuruskan oleh", options: ["Unit Pembayaran", "Unit Belanjawan dan Kawalan Peruntukan", "Unit Perakuanan", "Unit Maklumat Kewangan Berkomputer"], ans: 1 },
  { q: "30. Kompaun Trafik boleh dibayar menggunakan peranti eZpay.", options: ["Betul", "Salah"], ans: 0 },
  { q: "31. Berapakah nilai teras Malaysia MADANI?", options: ["4", "5", "6", "7"], ans: 2 },
  { q: "32. Frasa 'Saya Yang Menjalankan Amanah' dalam surat rasmi mula digunakan pada tahun", options: ["2017", "2018", "2019", "2020"], ans: 1 },
  { q: "33. Jabatan yang menguruskan permohonan lesen penjaja di Kuala Lumpur", options: ["Jabatan Kewangan", "Jabatan Audit Dalam", "Jabatan Pelesenan dan Pembangunan Penjaja", "Jabatan Pelesenan dan Pembangunan Perniagaan"], ans: 3 },
  { q: "34. Pengurusan Pejabat Cawangan Segambut terletak dalam sektor", options: ["Pengurusan", "Pengurusan Projek", "Perancangan", "Pembangunan Sosio Ekonomi"], ans: 3 },
  { q: "35. Berikut merupakan pensijilan MS-ISO DBKL kecuali", options: ["ISMS", "ABMS", "QMS", "EKSA"], ans: 3 }
];

const CONFIG = {
  TOTAL_TIME: 60,
  QUIZ_TIME: 15,
  NORMAL_SPEED_MS: 900,
  FRENZY_SPEED_MS: 500,
  BONUS_POINTS: 20,
  QUIZ_PENALTY: 5,
  CROWS_PER_QUIZ: 3,
  FETCH_TIMEOUT_MS: 9000,
  REFRESH_COOLDOWN_MS: 10000,
  POLL_INTERVAL_MS: 50000,
  TARGET_TYPES: {
    CROW: { key: 'CROW', emoji: '🐦‍⬛', points: 10, color: 'text-emerald-400' },
    BIRD: { key: 'BIRD', emoji: '🕊️', points: -10, color: 'text-rose-400' },
    BOMB: { key: 'BOMB', emoji: '💣', points: -15, color: 'text-rose-600' }
  }
};

const PAIR_PRESETS = [
  [CONFIG.TARGET_TYPES.BIRD, CONFIG.TARGET_TYPES.CROW],
  [CONFIG.TARGET_TYPES.BIRD, CONFIG.TARGET_TYPES.BOMB],
  [CONFIG.TARGET_TYPES.BOMB, CONFIG.TARGET_TYPES.CROW]
];

// Keadaan Permainan
let score = 0;
let timeLeft = CONFIG.TOTAL_TIME;
let gameTimer = null;
let moveTimer = null;
let quizTimer = null;
let quizTimeLeft = CONFIG.QUIZ_TIME;
let isPlaying = false;
let isPausedForQuiz = false;
let isSubmitting = false;
let currentSpeed = CONFIG.NORMAL_SPEED_MS;
let crowStreak = 0;

let slot1Data = null;
let slot2Data = null;
let isFetchingBoard = false;
let lastRefreshTime = 0;
let serverTimeOffset = 0;

// Rujukan Elemen DOM
const targetBtn1 = document.getElementById('targetBtn1');
const targetBtn2 = document.getElementById('targetBtn2');
const arena = document.getElementById('gameArena');
const frenzyBadge = document.getElementById('frenzyBadge');
const timerText = document.getElementById('timerText');
const scoreText = document.getElementById('scoreText');
const topScoreText = document.getElementById('topScoreText');
const crowStreakText = document.getElementById('crowStreakText');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreVal = document.getElementById('finalScoreVal');
const playerNameInput = document.getElementById('playerNameInput');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const saveBtnText = document.getElementById('saveBtnText');
const saveStatusMsg = document.getElementById('saveStatusMsg');
const playAgainBtn = document.getElementById('playAgainBtn');
const startGameBtn = document.getElementById('startGameBtn');
const leaderboardList = document.getElementById('leaderboardList');
const refreshBoardBtn = document.getElementById('refreshBoardBtn');
const refreshBtnLabel = document.getElementById('refreshBtnLabel');

const lockedScreen = document.getElementById('lockedScreen');
const lockTargetTimeText = document.getElementById('lockTargetTimeText');
const lockCountdownText = document.getElementById('lockCountdownText');
const limitModal = document.getElementById('limitModal');
const closeLimitModalBtn = document.getElementById('closeLimitModalBtn');

const quizModal = document.getElementById('quizModal');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizFeedback = document.getElementById('quizFeedback');
const quizTimerText = document.getElementById('quizTimerText');
const quizProgressBar = document.getElementById('quizProgressBar');

if (closeLimitModalBtn) {
  closeLimitModalBtn.onclick = () => {
    limitModal.style.display = 'none';
  };
}

// =========================================================================
// 🕒 PENYELARASAN MASA & KAWALAN WAKTU RASMI
// =========================================================================
let lockCheckInterval = null;

function checkGameAccessibility() {
  const adjustedNow = Date.now() + serverTimeOffset;
  const difference = ADMIN_START_TIME - adjustedNow;

  if (lockTargetTimeText) {
    lockTargetTimeText.textContent = new Date(ADMIN_START_TIME).toLocaleString('ms-MY', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  }

  if (difference > 0) {
    lockedScreen.classList.remove('hidden');
    startGameBtn.disabled = true;

    const totalHours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    lockCountdownText.textContent = `${pad(totalHours)}:${pad(minutes)}:${pad(seconds)}`;
  } else {
    lockedScreen.classList.add('hidden');
    startGameBtn.disabled = false;
    if (lockCheckInterval) {
      clearInterval(lockCheckInterval);
    }
  }
}

// =========================================================================
// 🔊 ENJIN AUDIO (WEB AUDIO API SINTESIS)
// =========================================================================
let audioCtx = null;
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playTone(typeKey) {
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const now = audioCtx.currentTime;

    if (typeKey === 'CROW') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(850, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(now + 0.08);
    } else if (typeKey === 'BONUS') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(now + 0.3);
    } else if (typeKey === 'BIRD') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.15);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(now + 0.15);
    } else if (typeKey === 'BOMB') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.25);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(now + 0.25);
    }
  } catch (e) {}
}

// =========================================================================
// 🌐 SISTEM KOMUNIKASI API (FETCH & CACHE RECOVERY)
// =========================================================================
function fetchBoardWithJitter(isUserAction = false) {
  const now = Date.now();
  if (isUserAction) {
    if (now - lastRefreshTime < CONFIG.REFRESH_COOLDOWN_MS) {
      const waitSec = Math.ceil((CONFIG.REFRESH_COOLDOWN_MS - (now - lastRefreshTime)) / 1000);
      saveStatusMsg.textContent = `Sila tunggu ${waitSec}s sebelum kemaskini semula.`;
      saveStatusMsg.className = "text-[10px] text-amber-400 font-semibold";
      return;
    }
    lastRefreshTime = now;
  }

  // Jitter rawak 100ms - 2500ms untuk menampung akses serentak
  const jitter = Math.floor(Math.random() * 2400) + 100;
  setTimeout(fetchTop10Leaderboard, jitter);
}

async function fetchTop10Leaderboard() {
  if (isFetchingBoard) return;
  isFetchingBoard = true;

  if (refreshBtnLabel) refreshBtnLabel.textContent = "Menyemak...";

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    // Penyelarasan masa pelayan melalui header HTTP
    const serverHeaderDate = response.headers.get("Date");
    if (serverHeaderDate) {
      const serverEpoch = new Date(serverHeaderDate).getTime();
      serverTimeOffset = serverEpoch - Date.now();
    }

    if (!response.ok) throw new Error('Rangkaian bermasalah');
    const data = await response.json();

    const rankedList = Array.isArray(data) ? data : (data.leaderboard || []);

    if (!rankedList.length) {
      leaderboardList.innerHTML = '<li class="text-center text-slate-500 italic py-2">Belum ada rekod pemain dalam sistem.</li>';
      topScoreText.textContent = '0';
      return;
    }

    topScoreText.textContent = rankedList[0].score !== undefined ? rankedList[0].score : '0';
    const badges = ['🥇', '🥈', '🥉'];

    leaderboardList.innerHTML = rankedList.slice(0, 10).map((item, idx) => {
      const isNegative = Number(item.score) < 0;
      const rankDisplay = isNegative ? '❌' : (badges[idx] || '#' + (idx + 1));

      return `
        <li class="flex items-center justify-between bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
          <div class="flex items-center gap-2 truncate pr-2">
            <span class="w-5 text-center font-bold text-xs ${!isNegative && idx < 3 ? '' : 'text-slate-500'}">
              ${rankDisplay}
            </span>
            <div class="flex flex-col truncate">
              <span class="text-slate-200 font-medium text-xs truncate">${escapeHtml(item.name)}</span>
              <span class="text-[9px] text-slate-500 font-mono leading-tight">${escapeHtml(item.time || '-')}</span>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="font-mono font-bold ${isNegative ? 'text-rose-400 bg-rose-400/10 border-rose-400/20' : 'text-amber-400 bg-amber-400/10 border-amber-400/20'} px-1.5 py-0.5 rounded text-xs border">
              ${item.score} pts
            </span>
          </div>
        </li>
      `;
    }).join('');

  } catch (err) {
    clearTimeout(timeoutId);
    if (!leaderboardList.children.length || leaderboardList.innerHTML.includes("Menghubungkan")) {
      leaderboardList.innerHTML = '<li class="text-center text-slate-500 py-2">Papan skor akan dikemaskini sebentar lagi...</li>';
    }
  } finally {
    isFetchingBoard = false;
    if (refreshBtnLabel) refreshBtnLabel.textContent = "Kemaskini";
  }
}

// =========================================================================
// 🚀 PENYERAHAN MARKAH DENGAN EXPONENTIAL BACKOFF
// =========================================================================
async function submitScoreToSheet() {
  if (isSubmitting) return;

  const rawName = playerNameInput.value.trim();
  const name = rawName.length > 0 ? rawName : 'Pemain Anon';

  const storageKey = `tembak_gagak_plays_${name}`;
  const localPlays = parseInt(localStorage.getItem(storageKey) || '0', 10);

  if (localPlays >= 5) {
    limitModal.style.display = 'flex';
    saveStatusMsg.textContent = "Had 5 markah terbaik anda telah dipenuhi.";
    saveStatusMsg.className = "text-[10px] text-amber-400 font-semibold";
    return;
  }

  isSubmitting = true;
  saveScoreBtn.disabled = true;
  saveBtnText.textContent = "...";
  saveStatusMsg.textContent = "Menghantar markah ke sistem pusat...";
  saveStatusMsg.className = "text-[10px] text-amber-400 font-semibold";

  const payload = {
    name: name,
    score: score,
    timestamp: new Date().toISOString()
  };

  await executeSubmitWithRetry(payload, storageKey, localPlays, 1);
}

async function executeSubmitWithRetry(payload, storageKey, localPlays, attempt) {
  const MAX_ATTEMPTS = 3;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
    clearTimeout(timeoutId);

    const result = await response.json();

    if (result.status === "limit_reached") {
      localStorage.setItem(storageKey, "5");
      limitModal.style.display = 'flex';
      saveStatusMsg.textContent = "Had 5 markah anda telah dipenuhi.";
      saveStatusMsg.className = "text-[10px] text-amber-400 font-semibold";
      resetSubmitButton();
      return;
    }

    if (result.status === "error") {
      saveStatusMsg.textContent = result.message || "Ralat memproses rekod.";
      saveStatusMsg.className = "text-[10px] text-rose-400 font-semibold";
      resetSubmitButton();
      return;
    }

    const currentCount = result.count !== undefined ? result.count : (localPlays + 1);
    localStorage.setItem(storageKey, currentCount.toString());

    saveStatusMsg.textContent = `Tersimpan dalam sistem! (${currentCount}/5)`;
    saveStatusMsg.className = "text-[10px] text-emerald-400 font-semibold";

    setTimeout(() => {
      gameOverScreen.classList.add('hidden');
      startScreen.classList.remove('hidden');
      resetSubmitButton();
      saveStatusMsg.textContent = "";
      fetchBoardWithJitter();
    }, 1200);

  } catch (err) {
    clearTimeout(timeoutId);

    if (attempt < MAX_ATTEMPTS) {
      const backoffDelay = (Math.pow(2, attempt) * 1000) + Math.floor(Math.random() * 800);
      saveStatusMsg.textContent = `Talian sesak. Percubaan semula (${attempt}/${MAX_ATTEMPTS})...`;
      saveStatusMsg.className = "text-[10px] text-amber-400 font-semibold";

      setTimeout(() => {
        executeSubmitWithRetry(payload, storageKey, localPlays, attempt + 1);
      }, backoffDelay);
    } else {
      saveStatusMsg.textContent = "Talian pelayan sesak. Sila cuba tekan Simpan lagi.";
      saveStatusMsg.className = "text-[10px] text-rose-400 font-semibold";
      applyCooldownToSubmitButton(4);
    }
  }
}

function resetSubmitButton() {
  saveScoreBtn.disabled = false;
  saveBtnText.textContent = "Simpan";
  isSubmitting = false;
}

function applyCooldownToSubmitButton(secondsLeft) {
  isSubmitting = true;
  saveScoreBtn.disabled = true;

  const interval = setInterval(() => {
    saveBtnText.textContent = `${secondsLeft}s`;
    secondsLeft--;
    if (secondsLeft < 0) {
      clearInterval(interval);
      resetSubmitButton();
    }
  }, 1000);
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

// =========================================================================
// 🎯 ARENA & SASARAN
// =========================================================================
function getRandomPositions(arenaW, arenaH, padding, minDistance) {
  const maxX = arenaW - padding * 2;
  const maxY = arenaH - padding * 2;

  let x1 = Math.floor(Math.random() * Math.max(maxX, 10)) + padding;
  let y1 = Math.floor(Math.random() * Math.max(maxY, 10)) + padding;

  let x2, y2, dist = 0, attempts = 0;
  do {
    x2 = Math.floor(Math.random() * Math.max(maxX, 10)) + padding;
    y2 = Math.floor(Math.random() * Math.max(maxY, 10)) + padding;
    dist = Math.hypot(x2 - x1, y2 - y1);
    attempts++;
  } while (dist < minDistance && attempts < 15);

  return { x1, y1, x2, y2 };
}

function moveTargets() {
  if (!isPlaying || isPausedForQuiz) return;

  const selectedPair = PAIR_PRESETS[Math.floor(Math.random() * PAIR_PRESETS.length)];

  if (Math.random() > 0.5) {
    slot1Data = selectedPair[0];
    slot2Data = selectedPair[1];
  } else {
    slot1Data = selectedPair[1];
    slot2Data = selectedPair[0];
  }

  targetBtn1.textContent = slot1Data.emoji;
  targetBtn2.textContent = slot2Data.emoji;

  targetBtn1.style.pointerEvents = 'auto';
  targetBtn2.style.pointerEvents = 'auto';

  targetBtn1.classList.remove('hidden');
  targetBtn2.classList.remove('hidden');

  const arenaW = arena.clientWidth;
  const arenaH = arena.clientHeight;
  const padding = 38;
  const minDistance = 75;

  const coords = getRandomPositions(arenaW, arenaH, padding, minDistance);

  targetBtn1.style.left = `${coords.x1}px`;
  targetBtn1.style.top = `${coords.y1}px`;
  targetBtn2.style.left = `${coords.x2}px`;
  targetBtn2.style.top = `${coords.y2}px`;
}

function resetMoveTimer(speed) {
  clearInterval(moveTimer);
  if (isPlaying && !isPausedForQuiz) {
    moveTimer = setInterval(moveTargets, speed);
  }
}

function spawnHitPopup(x, y, points, colorClass) {
  const popup = document.createElement('span');
  const prefix = points > 0 ? `+${points}` : `${points}`;
  popup.className = `hit-popup absolute font-black font-mono text-base sm:text-lg drop-shadow ${colorClass}`;
  popup.textContent = prefix;
  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;
  arena.appendChild(popup);
  setTimeout(() => popup.remove(), 600);
}

function updateCrowStreakDisplay() {
  crowStreakText.textContent = `${crowStreak}/${CONFIG.CROWS_PER_QUIZ}`;
}

// =========================================================================
// 🧠 MODAL KUIZ BONUS KL
// =========================================================================
function triggerRandomKLQuiz() {
  isPausedForQuiz = true;
  clearInterval(moveTimer);
  clearInterval(gameTimer);
  clearInterval(quizTimer);

  targetBtn1.classList.add('hidden');
  targetBtn2.classList.add('hidden');

  const randomItem = KL_QUESTIONS[Math.floor(Math.random() * KL_QUESTIONS.length)];
  quizQuestion.textContent = randomItem.q;
  quizFeedback.textContent = "";
  quizOptions.innerHTML = "";

  quizTimeLeft = CONFIG.QUIZ_TIME;
  quizTimerText.textContent = `${quizTimeLeft}s`;
  quizProgressBar.style.width = '100%';
  quizProgressBar.className = "bg-amber-400 h-full transition-all duration-1000 ease-linear";

  randomItem.options.forEach((optText, index) => {
    const btn = document.createElement('button');
    btn.type = "button";
    btn.className = "w-full text-left bg-slate-800 hover:bg-slate-700 active:bg-amber-500 active:text-slate-950 border border-slate-700 hover:border-amber-400 text-slate-100 text-xs py-2.5 px-3 rounded-xl font-semibold transition cursor-pointer";
    btn.textContent = `${String.fromCharCode(65 + index)}. ${optText}`;
    btn.onclick = () => handleQuizAnswer(index === randomItem.ans, btn, randomItem.ans);
    quizOptions.appendChild(btn);
  });

  quizModal.style.display = 'flex';

  quizTimer = setInterval(() => {
    quizTimeLeft--;
    quizTimerText.textContent = `${quizTimeLeft}s`;

    const percentage = Math.max(0, (quizTimeLeft / CONFIG.QUIZ_TIME) * 100);
    quizProgressBar.style.width = `${percentage}%`;

    if (quizTimeLeft <= 5) {
      quizProgressBar.className = "bg-rose-500 h-full transition-all duration-1000 ease-linear";
    }

    if (quizTimeLeft <= 0) {
      clearInterval(quizTimer);
      handleQuizTimeout(randomItem.ans);
    }
  }, 1000);
}

function handleQuizTimeout(correctIndex) {
  const allButtons = quizOptions.querySelectorAll('button');
  allButtons.forEach((b, idx) => {
    b.disabled = true;
    if (idx === correctIndex) {
      b.className = "w-full text-left bg-emerald-600/80 border border-emerald-400 text-white text-xs py-2.5 px-3 rounded-xl font-bold transition";
    }
  });

  score -= CONFIG.QUIZ_PENALTY;
  scoreText.textContent = score;
  spawnHitPopup(arena.clientWidth / 2 - 20, arena.clientHeight / 2 - 20, -CONFIG.QUIZ_PENALTY, 'text-rose-500');
  playTone('BIRD');

  quizFeedback.textContent = `Masa tamat! -${CONFIG.QUIZ_PENALTY} Pts. ⏳`;
  quizFeedback.className = "text-xs font-bold text-rose-400 min-h-[18px] mt-2";

  crowStreak = 0;
  updateCrowStreakDisplay();

  setTimeout(() => {
    quizModal.style.display = 'none';
    resumeGameAfterQuiz();
  }, 1200);
}

function handleQuizAnswer(isCorrect, clickedBtn, correctIndex) {
  clearInterval(quizTimer);
  const allButtons = quizOptions.querySelectorAll('button');
  allButtons.forEach((b, idx) => {
    b.disabled = true;
    if (!isCorrect && Number(idx) === Number(correctIndex)) {
      b.className = "w-full text-left bg-emerald-600/70 border border-emerald-400 text-white text-xs py-2.5 px-3 rounded-xl font-semibold";
    }
  });

  if (isCorrect) {
    clickedBtn.className = "w-full text-left bg-emerald-600 border border-emerald-400 text-white text-xs py-2.5 px-3 rounded-xl font-bold transition";
    quizFeedback.textContent = `TEPAT! +${CONFIG.BONUS_POINTS} Pts Bonus KL! 🎉`;
    quizFeedback.className = "text-xs font-bold text-emerald-400 min-h-[18px] mt-2";
    playTone('BONUS');

    score += CONFIG.BONUS_POINTS;
    scoreText.textContent = score;
    spawnHitPopup(arena.clientWidth / 2 - 20, arena.clientHeight / 2 - 20, CONFIG.BONUS_POINTS, 'text-emerald-400');
  } else {
    clickedBtn.className = "w-full text-left bg-rose-600 border border-rose-400 text-white text-xs py-2.5 px-3 rounded-xl font-bold transition";
    quizFeedback.textContent = `Kurang Tepat! -${CONFIG.QUIZ_PENALTY} Pts. ❌`;
    quizFeedback.className = "text-xs font-bold text-rose-400 min-h-[18px] mt-2";
    playTone('BIRD');

    score -= CONFIG.QUIZ_PENALTY;
    scoreText.textContent = score;
    spawnHitPopup(arena.clientWidth / 2 - 20, arena.clientHeight / 2 - 20, -CONFIG.QUIZ_PENALTY, 'text-rose-500');
  }

  crowStreak = 0;
  updateCrowStreakDisplay();

  setTimeout(() => {
    quizModal.style.display = 'none';
    resumeGameAfterQuiz();
  }, 1100);
}

function resumeGameAfterQuiz() {
  if (!isPlaying) return;
  isPausedForQuiz = false;

  gameTimer = setInterval(tickGameTimer, 1000);
  moveTargets();
  resetMoveTimer(currentSpeed);
}

// =========================================================================
// ⏱️ GELUNG UTAMA PERMAINAN
// =========================================================================
function tickGameTimer() {
  timeLeft--;
  timerText.textContent = `${timeLeft}s`;

  if (timeLeft <= 10 && currentSpeed !== CONFIG.FRENZY_SPEED_MS) {
    currentSpeed = CONFIG.FRENZY_SPEED_MS;
    resetMoveTimer(currentSpeed);

    frenzyBadge.classList.remove('hidden');
    targetBtn1.classList.add('target-fast');
    targetBtn2.classList.add('target-fast');
    timerText.className = "text-2xl sm:text-3xl md:text-4xl font-black text-rose-500 font-mono transition-transform scale-110";
  }

  if (timeLeft <= 0) {
    endGame();
  }
}

function handleShot(slotIndex, e) {
  if (!isPlaying || isPausedForQuiz) return;
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const clickedBtn = slotIndex === 1 ? targetBtn1 : targetBtn2;
  clickedBtn.style.pointerEvents = 'none';

  const isCrow = clickedBtn.textContent.includes('🐦‍⬛');
  const targetData = slotIndex === 1 ? slot1Data : slot2Data;

  if (!targetData) return;

  playTone(targetData.key);
  score += targetData.points;
  scoreText.textContent = score;

  const rect = arena.getBoundingClientRect();
  const clientX = (e && e.clientX) || (e && e.touches && e.touches[0] && e.touches[0].clientX) || (rect.left + rect.width / 2);
  const clientY = (e && e.clientY) || (e && e.touches && e.touches[0] && e.touches[0].clientY) || (rect.top + rect.height / 2);

  const clickX = clientX - rect.left;
  const clickY = clientY - rect.top;
  spawnHitPopup(clickX, clickY, targetData.points, targetData.color);

  if (isCrow || targetData.key === 'CROW') {
    crowStreak++;
    updateCrowStreakDisplay();

    if (crowStreak >= CONFIG.CROWS_PER_QUIZ) {
      triggerRandomKLQuiz();
      return;
    }
  }

  moveTargets();
  resetMoveTimer(currentSpeed);
}

function startGame() {
  initAudio();
  score = 0;
  timeLeft = CONFIG.TOTAL_TIME;
  currentSpeed = CONFIG.NORMAL_SPEED_MS;
  crowStreak = 0;
  isPlaying = true;
  isPausedForQuiz = false;

  updateCrowStreakDisplay();
  scoreText.textContent = '0';
  timerText.textContent = `${timeLeft}s`;
  timerText.className = "text-xl sm:text-2xl md:text-3xl font-black text-rose-400 font-mono transition-colors";
  saveStatusMsg.textContent = '';
  frenzyBadge.classList.add('hidden');
  quizModal.style.display = 'none';
  limitModal.style.display = 'none';
  targetBtn1.classList.remove('target-fast');
  targetBtn2.classList.remove('target-fast');

  startScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');

  moveTargets();
  resetMoveTimer(currentSpeed);

  clearInterval(gameTimer);
  clearInterval(quizTimer);
  gameTimer = setInterval(tickGameTimer, 1000);
}

function endGame() {
  isPlaying = false;
  isPausedForQuiz = false;
  clearInterval(gameTimer);
  clearInterval(moveTimer);
  clearInterval(quizTimer);

  quizModal.style.display = 'none';
  limitModal.style.display = 'none';
  frenzyBadge.classList.add('hidden');
  targetBtn1.classList.remove('target-fast');
  targetBtn2.classList.remove('target-fast');
  targetBtn1.classList.add('hidden');
  targetBtn2.classList.add('hidden');

  finalScoreVal.textContent = score;
  gameOverScreen.classList.remove('hidden');
  playerNameInput.value = '';
  setTimeout(() => playerNameInput.focus(), 200);
}

// Event Listeners
targetBtn1.addEventListener('pointerdown', (e) => handleShot(1, e));
targetBtn2.addEventListener('pointerdown', (e) => handleShot(2, e));

startGameBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', startGame);
saveScoreBtn.addEventListener('click', submitScoreToSheet);
refreshBoardBtn.addEventListener('click', () => fetchBoardWithJitter(true));

playerNameInput.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

playerNameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') submitScoreToSheet();
});

arena.addEventListener('pointerdown', (e) => {
  if (e.target === arena) initAudio();
});

// Penyelarasan Kunci Pelancaran
lockCheckInterval = setInterval(checkGameAccessibility, 1000);
checkGameAccessibility();

// Pemuatan Pertama & Polling Terkawal
window.addEventListener('DOMContentLoaded', () => {
  fetchBoardWithJitter(false);
  setInterval(() => {
    if (!isPlaying && !isSubmitting) {
      fetchTop10Leaderboard();
    }
  }, CONFIG.POLL_INTERVAL_MS);
});