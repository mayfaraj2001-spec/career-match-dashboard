const jobsContainer = document.getElementById("jobsContainer");
const totalJobsElement = document.getElementById("totalJobs");
const savedJobsElement = document.getElementById("savedJobs");
const appliedJobsElement = document.getElementById("appliedJobs");
const interviewJobsElement = document.getElementById("interviewJobs");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const typeFilter = document.getElementById("typeFilter");
const sortSelect = document.getElementById("sortSelect");
const clearFiltersButton = document.getElementById("clearFiltersButton");
const resultsMessage = document.getElementById("resultsMessage");

function getSavedJobs() {
  try {
    return JSON.parse(localStorage.getItem("savedJobs")) || [];
  } catch (error) {
    console.error("Could not load saved jobs:", error);
    return [];
  }
}

function getJobStatuses() {
  try {
    return JSON.parse(localStorage.getItem("jobStatuses")) || {};
  } catch (error) {
    console.error("Could not load job statuses:", error);
    return {};
  }
}

function toggleSavedJob(jobId) {
  const savedJobs = getSavedJobs();

  const updatedSavedJobs = savedJobs.includes(jobId)
    ? savedJobs.filter(id => id !== jobId)
    : [...savedJobs, jobId];

  localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));

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

  if (filteredJobs.length === 0) {
    jobsContainer.innerHTML = `
      <div class="empty-state">
        <h2>No jobs found</h2>
        <p>Try changing the search text or clearing the filters.</p>
      </div>
    `;

    totalJobsElement.textContent = 0;

    if (resultsMessage) {
      resultsMessage.textContent = "0 jobs displayed";
    }

    return;
  }

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

      <label for="status-${job.id}">
        <strong>Status:</strong>
      </label>

      <select
        id="status-${job.id}"
        class="status-select"
        data-job-id="${job.id}"
      >
        <option value="Not Applied" ${currentStatus === "Not Applied" ? "selected" : ""}>
          Not Applied
        </option>
        <option value="Applied" ${currentStatus === "Applied" ? "selected" : ""}>
          Applied
        </option>
        <option value="Interview" ${currentStatus === "Interview" ? "selected" : ""}>
          Interview
        </option>
        <option value="Rejected" ${currentStatus === "Rejected" ? "selected" : ""}>
          Rejected
        </option>
        <option value="Offer" ${currentStatus === "Offer" ? "selected" : ""}>
          Offer
        </option>
      </select>

      <br><br>

      <button
        type="button"
        class="save-job-button ${isSaved ? "saved" : ""}"
        data-job-id="${job.id}"
      >
        ${isSaved ? "Remove Saved Job" : "Save Job"}
      </button>
    `;

    jobsContainer.appendChild(jobCard);
  });

  totalJobsElement.textContent = filteredJobs.length;

  if (resultsMessage) {
    resultsMessage.textContent =
      `${filteredJobs.length} ${filteredJobs.length === 1 ? "job" : "jobs"} displayed`;
  }
}

function filterJobs() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedType = typeFilter.value;
  const selectedSort = sortSelect ? sortSelect.value : "default";

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

  if (selectedSort === "company") {
    filteredJobs.sort((a, b) =>
      a.company.localeCompare(b.company)
    );
  }

  if (selectedSort === "title") {
    filteredJobs.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  renderJobs(filteredJobs);
}

function clearFilters() {
  searchInput.value = "";
  categoryFilter.value = "all";
  typeFilter.value = "all";

  if (sortSelect) {
    sortSelect.value = "default";
  }

  filterJobs();
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

if (sortSelect) {
  sortSelect.addEventListener("change", filterJobs);
}

if (clearFiltersButton) {
  clearFiltersButton.addEventListener("click", clearFilters);
}

jobsContainer.addEventListener("click", event => {
  const saveButton = event.target.closest(".save-job-button");

  if (!saveButton) {
    return;
  }

  const jobId = Number(saveButton.dataset.jobId);
  toggleSavedJob(jobId);
});

jobsContainer.addEventListener("change", event => {
  if (!event.target.matches(".status-select")) {
    return;
  }

  const jobId = Number(event.target.dataset.jobId);
  updateStatus(jobId, event.target.value);
});

updateDashboard();
filterJobs();