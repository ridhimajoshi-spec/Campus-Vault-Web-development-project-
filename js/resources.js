
// Get HTML elements
const searchInput = document.getElementById("searchInput");
const semesterFilter = document.getElementById("semesterFilter");
const typeFilter = document.getElementById("typeFilter");

const resourceContainer = document.getElementById("resourceContainer");
const noResults = document.getElementById("noResults");

// Load saved resources from LocalStorage
const savedResources = JSON.parse(
    localStorage.getItem("campusResources")
) || [];

// Display newly uploaded resources
savedResources.forEach(function(resource) {

    const card = document.createElement("div");

    card.className = "resource-card";

    card.dataset.semester = resource.semester;
    card.dataset.type = resource.type;

    card.innerHTML = `
        <span class="resource-tag">${resource.type}</span>

        <h3>${escapeHTML(resource.title)}</h3>

        <p>Subject: ${escapeHTML(resource.subject)}</p>
        <p>Semester: ${escapeHTML(resource.semester)}</p>
        <p>Academic Year: ${escapeHTML(resource.year)}</p>
        <p>Contributor: ${escapeHTML(resource.contributor)}</p>

        <a href="${safeResourceLink(resource.link)}"
           target="_blank"
           rel="noopener noreferrer"
           class="resource-link">
           View Resource
        </a>
    `;

    resourceContainer.appendChild(card);

});

// Escape user-provided text before displaying it
function escapeHTML(value) {
    const element = document.createElement("span");
    element.textContent = String(value ?? "");
    return element.innerHTML;
}

// Accept only HTTP or HTTPS resource links
function safeResourceLink(value) {
    try {
        const url = new URL(value);

        if (url.protocol === "https:" || url.protocol === "http:") {
            return url.href;
        }

    } catch (error) {
        // Invalid URL
    }

    return "#";
}

// Search and filter resources
function filterResources() {

    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedSemester = semesterFilter.value;
    const selectedType = typeFilter.value;

    const cards = document.querySelectorAll(".resource-card");

    let visibleCount = 0;

    cards.forEach(function(card) {

        const cardText = card.textContent.toLowerCase();

        const matchesSearch = cardText.includes(searchValue);

        const matchesSemester =
            selectedSemester === "" ||
            card.dataset.semester === selectedSemester;

        const matchesType =
            selectedType === "" ||
            card.dataset.type === selectedType;

        if (matchesSearch && matchesSemester && matchesType) {

            card.style.display = "block";
            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });

    noResults.style.display =
        visibleCount === 0 ? "block" : "none";

}

// Add event listeners
searchInput.addEventListener("input", filterResources);
semesterFilter.addEventListener("change", filterResources);
typeFilter.addEventListener("change", filterResources);
