const jobsContainer = document.getElementById("jobsContainer");
const totalJobsElement = document.getElementById("totalJobs");
const savedJobsElement = document.getElementById("savedJobs");
const appliedJobsElement = document.getElementById("appliedJobs");
const interviewJobsElement = document.getElementById("interviewJobs");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const typeFilter = document.getElementById("typeFilter");

function getSavedJobs() {
  return JSON.parse(localStorage.getItem("savedJobs")) || [];
}

function saveJob(jobId) {
  const savedJobs = getSavedJobs();

  if (!savedJobs.includes(jobId)) {
    savedJobs.push(jobId);
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }

  updateDashboard();
  filterJobs();
}

function renderJobs(filteredJobs = jobs) {
  const savedJobs = getSavedJobs();

  jobsContainer.innerHTML = "";

  filteredJobs.forEach(job => {
    const isSaved = savedJobs.includes(job.id);

    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");

    jobCard.innerHTML = `
      <h2>${job.title}</h2>
      <h4>${job.company}</h4>

      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Category:</strong> ${job.category}</p>
      <p><strong>Type:</strong> ${job.type}</p>

      <p>${job.description}</p>

      <button onclick="saveJob(${job.id})">
        ${isSaved ? "Saved" : "Save Job"}
      </button>
    `;

    jobsContainer.appendChild(jobCard);
  });

  totalJobsElement.textContent = filteredJobs.length;
}

function filterJobs() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedType = typeFilter.value;

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchText) ||
      job.company.toLowerCase().includes(searchText) ||
      job.description.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "all" || job.category === selectedCategory;

    const matchesType =
      selectedType === "all" || job.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  renderJobs(filteredJobs);
}

function updateDashboard() {
  const savedJobs = getSavedJobs();

  savedJobsElement.textContent = savedJobs.length;
  appliedJobsElement.textContent = 0;
  interviewJobsElement.textContent = 0;
}

searchInput.addEventListener("input", filterJobs);
categoryFilter.addEventListener("change", filterJobs);
typeFilter.addEventListener("change", filterJobs);

updateDashboard();
renderJobs();