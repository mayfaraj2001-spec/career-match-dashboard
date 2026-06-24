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

function getJobStatuses() {
  return JSON.parse(localStorage.getItem("jobStatuses")) || {};
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

function updateStatus(jobId, status) {
  const statuses = getJobStatuses();

  statuses[jobId] = status;

  localStorage.setItem("jobStatuses", JSON.stringify(statuses));

  updateDashboard();
}

function renderJobs(filteredJobs = jobs) {
  const savedJobs = getSavedJobs();
  const statuses = getJobStatuses();

  jobsContainer.innerHTML = "";

  filteredJobs.forEach(job => {
    const isSaved = savedJobs.includes(job.id);
    const currentStatus = statuses[job.id] || "Not Applied";

    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");

    jobCard.innerHTML = `
      <h2>${job.title}</h2>
      <h4>${job.company}</h4>

      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Category:</strong> ${job.category}</p>
      <p><strong>Type:</strong> ${job.type}</p>

      <p>${job.description}</p>

      <label><strong>Status:</strong></label>
      <select onchange="updateStatus(${job.id}, this.value)">
        <option value="Not Applied" ${currentStatus === "Not Applied" ? "selected" : ""}>Not Applied</option>
        <option value="Applied" ${currentStatus === "Applied" ? "selected" : ""}>Applied</option>
        <option value="Interview" ${currentStatus === "Interview" ? "selected" : ""}>Interview</option>
        <option value="Rejected" ${currentStatus === "Rejected" ? "selected" : ""}>Rejected</option>
      </select>

      <br><br>

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
  const statuses = getJobStatuses();

  let appliedCount = 0;
  let interviewCount = 0;

  Object.values(statuses).forEach(status => {
    if (status === "Applied") {
      appliedCount++;
    }

    if (status === "Interview") {
      interviewCount++;
    }
  });

  savedJobsElement.textContent = savedJobs.length;
  appliedJobsElement.textContent = appliedCount;
  interviewJobsElement.textContent = interviewCount;
}

searchInput.addEventListener("input", filterJobs);
categoryFilter.addEventListener("change", filterJobs);
typeFilter.addEventListener("change", filterJobs);

updateDashboard();
renderJobs();