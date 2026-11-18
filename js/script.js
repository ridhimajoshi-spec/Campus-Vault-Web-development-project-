
// Find the upload form
const uploadForm = document.getElementById("uploadForm");

// Run this code only if the upload form exists
if (uploadForm) {

    uploadForm.addEventListener("submit", function(event) {

        // Prevent the page from refreshing
        event.preventDefault();

        // Get the values entered by the student
        const title = document.getElementById("resourceTitle").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const semester = document.getElementById("semester").value;
        const type = document.getElementById("resourceType").value;
        const year = document.getElementById("academicYear").value;
        const contributor = document.getElementById("contributor").value.trim();
        const link = document.getElementById("resourceLink").value.trim();

        const permission = document.getElementById("permission").checked;

        // Check permission confirmation
        if (!permission) {
            alert("Please confirm that you have permission to share this resource.");
            return;
        }

        // Create a resource object
        const newResource = {
            id: Date.now(),
            title: title,
            subject: subject,
            semester: semester,
            type: type,
            year: year,
            contributor: contributor,
            link: link
        };

        // Get previously saved resources
        let savedResources = JSON.parse(
            localStorage.getItem("campusResources")
        ) || [];

        // Add the new resource
        savedResources.push(newResource);

        // Save resources in LocalStorage
        localStorage.setItem(
            "campusResources",
            JSON.stringify(savedResources)
        );

        // Display success message
        const message = document.getElementById("formMessage");

        message.textContent = "Resource submitted successfully!";
        message.style.color = "green";

        // Clear the form
        uploadForm.reset();

    });

}


// =================================
// HOMEPAGE: RECENT RESOURCES
// =================================

const recentContainer = document.getElementById("recentResources");

if (recentContainer) {

    const resources = JSON.parse(
        localStorage.getItem("campusResources")
    ) || [];

    // Show the latest three submissions
    const recentResources = resources.slice(-3).reverse();

    if (recentResources.length === 0) {

        recentContainer.textContent =
            "No new resources have been shared yet.";

    } else {

        recentResources.forEach(function(resource) {

            const card = document.createElement("div");
            card.className = "feature-card";

            const title = document.createElement("h3");
            title.textContent = resource.title;

            const subject = document.createElement("p");
            subject.textContent = "Subject: " + resource.subject;

            const semester = document.createElement("p");
            semester.textContent = "Semester: " + resource.semester;

            const link = document.createElement("a");
            link.className = "resource-link";
            link.textContent = "View Resource";
            link.href = "#";

            try {
                const url = new URL(resource.link);

                if (url.protocol === "https:" ||
                    url.protocol === "http:") {
                    link.href = url.href;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                }
            } catch (error) {
                // Keep the link disabled if invalid
            }

            card.appendChild(title);
            card.appendChild(subject);
            card.appendChild(semester);
            card.appendChild(link);

            recentContainer.appendChild(card);

        });

    }

}
