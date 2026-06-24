const jobsContainer = document.getElementById("jobsContainer");
const totalJobsElement = document.getElementById("totalJobs");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const typeFilter = document.getElementById("typeFilter");

function renderJobs(filteredJobs = jobs) {
  jobsContainer.innerHTML = "";

  filteredJobs.forEach(job => {
    const jobCard = document.createElement("div");

    jobCard.classList.add("job-card");

    jobCard.innerHTML = `
      <h2>${job.title}</h2>
      <h4>${job.company}</h4>

      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Category:</strong> ${job.category}</p>
      <p><strong>Type:</strong> ${job.type}</p>

      <p>${job.description}</p>

      <button>Save Job</button>
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
      job.company.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      job.category === selectedCategory;

    const matchesType =
      selectedType === "all" ||
      job.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  renderJobs(filteredJobs);
}

searchInput.addEventListener("input", filterJobs);
categoryFilter.addEventListener("change", filterJobs);
typeFilter.addEventListener("change", filterJobs);

renderJobs();