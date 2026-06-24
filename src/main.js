const jobsContainer = document.getElementById("jobsContainer");
const totalJobsElement = document.getElementById("totalJobs");

function renderJobs() {
  jobsContainer.innerHTML = "";

  jobs.forEach(job => {
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

  totalJobsElement.textContent = jobs.length;
}

renderJobs();