const projects = [
  {
    title: "Lab Consumable Expiry Tracker",
    category: ".NET Full-Stack Web Application",
    period: "Formulatrix Bootcamp Batch 20, 2026",
    description:
      "Aplikasi manajemen inventaris laboratorium berbasis FEFO. Sistem menggunakan React dan TypeScript pada frontend, .NET Web API pada backend, JWT untuk autentikasi, serta PostgreSQL untuk pengelolaan stok dan alokasi otomatis berdasarkan tanggal kedaluwarsa.",
    stacks: [
      "C#",
      ".NET Web API",
      "React",
      "TypeScript",
      "PostgreSQL",
      "JWT",
      "Clean Architecture",
    ],
    accent: "from-emerald-400/25 via-cyan-400/10 to-transparent",
    image: "img/img-lab-consumabletracker.png",
    repo: "https://github.com/zippo538/LabConsumeableTracker",
  },
  {
    title: "Web-Based Chess Game",
    category: ".NET Web API",
    period: "Formulatrix Bootcamp Batch 20, 2026",
    description:
      "Permainan catur berbasis web dengan mesin permainan modular. Proyek menerapkan object-oriented programming, design patterns, penanganan error khusus, unit testing, validasi langkah, dan evaluasi status papan.",
    stacks: ["C#", "OOP", "Design Patterns", "Unit Testing", "Game Logic"],
    accent: "from-violet/30 via-fuchsia-400/10 to-transparent",
    image: "img/img-chess-formulatrix.png",
    repo: "https://github.com/zippo538/ChessFormulatrix2",
  },
  {
    title: "NLP Chatbot with Negative Word Filtering",
    category: "Artificial Intelligence",
    period: "Dibimbing Bootcamp ML/AI Batch 7, 2025",
    description:
      "Chatbot NLP berbasis Haystack untuk menjawab pertanyaan pada domain tertentu. Pipeline penyaringan kata negatif membantu memblokir ujaran kasar, kebencian, dan konten tidak pantas. Retriever dan API eksternal mendukung respons yang lebih kontekstual.",
    stacks: ["Python", "Haystack", "LLM", "FastAPI", "Docker", "NLP"],
    image: "img/1.png",
    repo: "https://github.com/zippo538/final_project",
  },
  {
    title: "House Price Prediction Platform",
    category: "Machine Learning & MLOps",
    period: "Dibimbing Bootcamp ML/AI Batch 7, 2025",
    description:
      "Platform prediksi harga rumah end-to-end dengan machine learning dan hyperparameter tuning. Model disajikan melalui FastAPI, dikemas menggunakan Docker, dan dikelola dengan MLflow untuk pelacakan eksperimen, metrik, serta versi model.",
    stacks: [
      "Python",
      "FastAPI",
      "Docker",
      "MLflow",
      "Machine Learning",
      "Streamlit",
    ],
    image: "img/2.png",
    repo: "https://github.com/zippo538/MlopsMahindraDay2",
    live: "https://www.linkedin.com/feed/update/urn:li:activity:7390809735198855169/",
  },
  {
    title: "MyCuan P2P Lending",
    category: "Backend Web Development",
    period: "TSA KOMINFO x Rakamin, 2023",
    description:
      "Sistem kredit peer-to-peer lending dengan backend web dan rancangan basis data relasional. Proyek berfokus pada alur inti peminjaman, pengelolaan data pengguna, dan administrasi layanan keuangan digital.",
    stacks: ["PHP", "Laravel", "Filament", "MySQL", "Relational Database"],
    image: "img/4.png",
    repo: "https://github.com/FinPro-ITPerbankan2023/FinPro-MyCuan",
  },
];

const grid = document.getElementById("projectGrid");
const modal = document.getElementById("projectModal");
const closeButton = document.getElementById("closeModal");
let lastFocusedElement = null;

function visualMarkup(project, modalView = false) {
  const height = modalView ? "h-64" : "h-52";
  if (project.image)
    return `<div class="${height} overflow-hidden rounded-2xl border border-white/10 bg-white/5"><img src="${project.image}" alt="Tampilan ${project.title}" class="h-full w-full object-cover transition duration-500 group-hover:scale-105"></div>`;
  return `<div class="${height} relative grid place-items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${project.accent}"><div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.10),transparent_60%)]"></div><span class="relative text-5xl font-black tracking-tight text-white/80">${project.mark}</span></div>`;
}

function stackMarkup(stack) {
  return `<span class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">${stack}</span>`;
}

function renderProjects() {
  grid.innerHTML = projects
    .map(
      (project, index) =>
        `<article class="group flex flex-col rounded-[1.75rem] border border-white/10 bg-panel/70 p-4 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-2 hover:border-cyan/30 hover:shadow-glow">${visualMarkup(project)}<div class="flex flex-1 flex-col px-1 pb-1 pt-5"><p class="text-xs font-semibold uppercase tracking-widest text-cyan">${project.category}</p><h3 class="mt-2 text-xl font-bold leading-snug">${project.title}</h3><p class="mt-2 text-sm text-slate-500">${project.period}</p><p class="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">${project.description}</p><button data-project="${index}" class="mt-6 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:border-cyan/40 hover:text-cyan">Lihat detail</button></div></article>`,
    )
    .join("");
  grid
    .querySelectorAll("[data-project]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        openModal(projects[Number(button.dataset.project)], button),
      ),
    );
}

function openModal(project, trigger) {
  lastFocusedElement = trigger;
  document.getElementById("modalCategory").textContent = project.category;
  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalDescription").textContent = project.description;
  document.getElementById("modalVisual").innerHTML = visualMarkup(
    project,
    true,
  );
  document.getElementById("modalStacks").innerHTML = project.stacks
    .map(stackMarkup)
    .join("");
  const links = [];
  if (project.live)
    links.push(
      `<a href="${project.live}" target="_blank" rel="noopener" class="rounded-full bg-gradient-to-r from-violet to-cyan px-5 py-2.5 text-sm font-bold text-ink">Lihat Demo</a>`,
    );
  if (project.repo)
    links.push(
      `<a href="${project.repo}" target="_blank" rel="noopener" class="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold transition hover:border-cyan/40">Source Code</a>`,
    );
  document.getElementById("modalLinks").innerHTML = links.join("");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
  closeButton.focus();
}

function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
  lastFocusedElement?.focus();
}

closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden"))
    closeModal();
});



document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastUpdated").textContent =
  new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
renderProjects();
