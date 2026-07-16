# CareerMatch Dashboard — Product Requirements Document

## 1. Project Goal

CareerMatch Dashboard is a web application that helps technology job seekers organize their job-search process.

The application allows users to browse jobs, search and filter opportunities, save relevant positions, and track the status of each application.

The main goal is to provide a simple and clear dashboard that helps users manage job opportunities in one place.

---

## 2. Problem

Job seekers often use several websites and documents to manage their job search.

This can make it difficult to:

- Remember which jobs were relevant
- Track application status
- Compare different opportunities
- Organize saved positions
- Understand overall job-search progress

CareerMatch Dashboard solves this problem by providing one organized interface for managing job opportunities.

---

## 3. Target Users

The main users are:

- Students and recent graduates
- Junior professionals
- Technology job seekers
- Users looking for cybersecurity, data, development, or project-management roles
- Users who want a simple way to track job applications

---

## 4. Main Use Case

A user opens the dashboard and views available technology jobs.

The user can:

1. Search for jobs by title, company, or description
2. Filter jobs by category
3. Filter jobs by work type
4. Sort jobs alphabetically
5. Save relevant jobs
6. Update the application status
7. View summary statistics
8. Return later and continue from the saved state

The saved jobs and statuses remain available after refreshing the page.

---

## 5. Scope

### In Scope

The project includes:

- Displaying job cards
- Searching by title, company, or description
- Filtering by professional category
- Filtering by work type
- Sorting by company or job title
- Saving and removing favorite jobs
- Tracking application status
- Dashboard summary statistics
- Saving data in LocalStorage
- Clear Filters button
- Empty-state message when no jobs are found
- Responsive layout for desktop and mobile
- Interactive and modern user interface

### Out of Scope

The project does not include:

- User authentication
- Backend database
- Real-time job API
- LinkedIn integration
- Resume upload
- Direct job applications
- Employer communication
- Cloud synchronization
- User accounts

---

## 6. Functional Requirements

### 6.1 Display Jobs

The system will display technology jobs as individual cards.

Each card will include:

- Job title
- Company
- Location
- Category
- Work type
- Description
- Application status
- Save button

### 6.2 Search Jobs

The user can search by:

- Job title
- Company name
- Job description

The results will update while the user types.

### 6.3 Filter Jobs

The user can filter jobs by:

- Category
- Work type

Available categories include:

- Cyber
- Data
- Project Management
- Development

Available work types include:

- Full Time
- Part Time
- Hybrid
- Remote

### 6.4 Sort Jobs

The user can sort jobs by:

- Company name
- Job title

### 6.5 Save Jobs

The user can save relevant jobs.

The user can also remove a job from the saved list by clicking the button again.

Saved job IDs will be stored in LocalStorage.

### 6.6 Track Application Status

The user can assign one of the following statuses:

- Not Applied
- Applied
- Interview
- Rejected
- Offer

The selected status will be stored in LocalStorage.

### 6.7 Dashboard Summary

The dashboard will display:

- Total jobs currently displayed
- Number of saved jobs
- Number of jobs marked as Applied
- Number of jobs marked as Interview

### 6.8 Clear Filters

The user can click a Clear Filters button to:

- Clear the search text
- Reset the category filter
- Reset the work-type filter
- Reset sorting
- Display the complete job list

### 6.9 Empty State

If no jobs match the search or filters, the system will display:

- A clear "No jobs found" message
- A suggestion to change or clear the filters

### 6.10 Persistent Data

The application will use LocalStorage to save:

- Saved job IDs
- Application statuses

The information will remain available after refreshing or reopening the page in the same browser.

---

## 7. User Stories

- As a job seeker, I want to view available jobs so I can discover relevant opportunities.
- As a user, I want to search by title or company so I can find jobs quickly.
- As a user, I want to filter jobs so I can focus on relevant categories and work types.
- As a user, I want to sort jobs so I can review them in an organized way.
- As a user, I want to save jobs so I can return to relevant positions later.
- As a user, I want to remove saved jobs if they are no longer relevant.
- As a user, I want to update my application status so I can track my progress.
- As a user, I want my information to remain after refreshing the page.
- As a user, I want to see summary statistics so I can understand my job-search activity.
- As a user, I want to clear all filters with one button.

---

## 8. Technical Stack

The project uses:

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage
- Git
- GitHub
- GitHub Pages

No external frameworks or libraries are required.

---

## 9. Project Structure

```text
career-match-dashboard/
├── index.html
├── PRD.md
├── tasks.md
├── README.md
└── src/
    ├── jobs.js
    ├── main.js
    └── style.css