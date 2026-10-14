
(() => {
  // 1. Navigasi antarhalaman
  const pages = [...document.querySelectorAll(".page")];
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const mainNav = document.getElementById("mainNav");
  const menuToggle = document.getElementById("menuToggle");
  const topButton = document.getElementById("topButton");

  function showPage() {
    const requested = (window.location.hash || "#home").slice(1);

    // Pastikan halaman yang dipilih tersedia
    const pageId = pages.some(page => page.id === requested)
      ? requested
      : "home";

    // Tampilkan halaman yang dipilih
    pages.forEach(page => {
      page.classList.toggle("active", page.id === pageId);
    });

    // Tandai menu navigasi yang aktif
    navLinks.forEach(link => {
      const isActive = link.dataset.page === pageId;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    // Tutup menu mobile setelah berpindah halaman
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka navigasi");

    // Kembali ke bagian atas halaman
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // Ubah judul tab browser
    const currentPage = pages.find(page => page.id === pageId);

    document.title =
      `${currentPage?.dataset.title || "Beranda"} | #SaringSebelumSharing`;
  }

  // Jalankan navigasi ketika alamat halaman berubah
  window.addEventListener("hashchange", showPage);

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // 2. Menu hamburger untuk perangkat mobile
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Tutup navigasi" : "Buka navigasi"
    );
  });

  // 3. Navigasi sub-bab
  document.querySelectorAll(".subnav-link").forEach(link => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".subnav-link").forEach(item => {
        item.classList.remove("active");
      });

      link.classList.add("active");
    });
  });

  // 4. Checklist pemeriksaan informasi
  const checks = [
    ...document.querySelectorAll(
      '#verifyChecklist input[type="checkbox"]'
    )
  ];

  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const checkResult = document.getElementById("checkResult");

  function updateChecklist() {
    const done = checks.filter(check => check.checked).length;
    const total = checks.length;

    // Perbarui progress bar
    progressBar.style.width = `${(done / total) * 100}%`;

    // Perbarui jumlah checklist yang selesai
    progressText.textContent = `${done} dari ${total} selesai`;

    // Tampilkan pesan sesuai kemajuan pengguna
    if (done === total) {
      checkResult.textContent =
        "Bagus! Kamu sudah memeriksa poin-poin utama. " +
        "Tetap gunakan penilaian kritis sebelum membagikan.";
    } else if (done === 0) {
      checkResult.textContent =
        "Mulai periksa informasi satu per satu.";
    } else {
      checkResult.textContent =
        "Teruskan pemeriksaan. Jangan bagikan jika masih ada " +
        "hal penting yang belum jelas.";
    }
  }

  checks.forEach(check => {
    check.addEventListener("change", updateChecklist);
  });

  // 5. Tombol komitmen kampanye
  const pledgeButton = document.getElementById("pledgeButton");
  const pledgeFeedback = document.getElementById("pledgeFeedback");

  pledgeButton.addEventListener("click", () => {
    const alreadyPledged =
      pledgeButton.dataset.pledged === "true";

    // Ubah status komitmen
    pledgeButton.dataset.pledged = String(!alreadyPledged);

    if (alreadyPledged) {
      pledgeButton.innerHTML =
        'Saya ikut berkomitmen <span>♡</span>';

      pledgeFeedback.textContent =
        "Kamu dapat berkomitmen kembali kapan saja.";
    } else {
      pledgeButton.innerHTML =
        'Komitmen dicatat <span>✓</span>';

      pledgeFeedback.textContent =
        "Terima kasih! Mulai dari satu pesan yang kamu periksa " +
        "dengan cermat.";
    }

    pledgeButton.setAttribute(
      "aria-pressed",
      String(!alreadyPledged)
    );
  });

  // 6. Tombol kembali ke atas
  window.addEventListener("scroll", () => {
    topButton.classList.toggle(
      "visible",
      window.scrollY > 500
    );
  }, { passive: true });

  topButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // 7. Tahun otomatis pada footer
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // Tampilkan halaman yang sesuai ketika website dibuka
  showPage();
})();
