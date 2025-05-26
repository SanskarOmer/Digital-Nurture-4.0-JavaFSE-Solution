// 1. JavaScript Basics & Setup
console.log("Welcome to the Community Portal");
window.onload = function () {
    alert("Page is fully loaded! Welcome to Local Community Event Portal.");
    loadPreference();
    displayEvents();
};

// 2. Data: event details
const eventsList = [
    {
        id: "picnic",
        name: "Community Picnic",
        date: "2025-06-01",
        seats: 10,
        fee: 5,
    },
    {
        id: "run",
        name: "Charity Run",
        date: "2025-06-15",
        seats: 5,
        fee: 10,
    },
    {
        id: "fair",
        name: "Art Fair",
        date: "2025-05-28",
        seats: 0,
        fee: 8,
    },
];

let seatsAvailable = {
    picnic: 10,
    run: 5,
    fair: 0,
};

// Utility: format date string to Date object
function parseDate(str) {
    return new Date(str + "T00:00:00");
}

// 3. Display only upcoming events with seats > 0
function displayEvents() {
    const eventsSection = document.getElementById("events");
    eventsSection.innerHTML = `<h2>Upcoming Events</h2>`;

    const today = new Date();

    let validEvents = eventsList.filter((ev) => {
        return parseDate(ev.date) >= today && seatsAvailable[ev.id] > 0;
    });

    if (validEvents.length === 0) {
        eventsSection.innerHTML += `<p>No upcoming events with available seats.</p>`;
        return;
    }

    // Show each event
    validEvents.forEach((ev) => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event-item");
        eventDiv.innerHTML = `
      <h3>${ev.name}</h3>
      <p>Date: ${ev.date}</p>
      <p>Seats Available: ${seatsAvailable[ev.id]}</p>
      <p>Fee: $${ev.fee}</p>
    `;
        eventsSection.appendChild(eventDiv);
    });
}

// 4. Handle registration form submit
function handleSubmit(event) {
    event.preventDefault();

    try {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const date = document.getElementById("date").value;
        const eventType = document.getElementById("eventType").value;
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !date || !eventType) {
            throw new Error("Please fill in all required fields.");
        }

        const today = new Date();
        if (new Date(date) < today) {
            throw new Error("Event date must be today or later.");
        }

        if (seatsAvailable[eventType] <= 0) {
            throw new Error("Sorry, no seats available for this event.");
        }

        // Decrement seats
        seatsAvailable[eventType]--;
        displayEvents(); // update event display with new seat count

        document.getElementById("confirmationMessage").textContent =
            `Thank you, ${name}, for registering for the ${eventType} event!`;

        // Clear form
        document.getElementById("eventForm").reset();
    } catch (error) {
        alert(error.message);
    }
}

// 5. Validate phone number on blur
function validatePhone() {
    const phone = document.getElementById("phone").value.trim();
    if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
    }
}

// 6. Show event fee when dropdown changes
function showFee() {
    const feeDisplay = document.getElementById("feeDisplay");
    const selected = document.getElementById("eventSelect").value;
    let fee = "";

    const eventObj = eventsList.find((ev) => ev.id === selected);
    fee = eventObj ? `$${eventObj.fee}` : "";

    feeDisplay.textContent = fee ? `Event Fee: ${fee}` : "";
}

// 7. Show feedback confirmation on submit
function showFeedbackConfirmation() {
    document.getElementById("confirmationText").textContent =
        "Thank you for your feedback!";
    // Optionally clear textarea
    document.getElementById("feedbackText").value = "";
    document.getElementById("charCount").textContent = "0";
}

// 8. Enlarge image on double-click
function enlargeImage() {
    const img = document.getElementById("eventImg");
    if (img.style.maxWidth === "200px") {
        img.style.maxWidth = "100%";
    } else {
        img.style.maxWidth = "200px";
    }
}

// 9. Count characters in feedback textarea
function countChars() {
    const text = document.getElementById("feedbackText").value;
    document.getElementById("charCount").textContent = text.length;
}

// 10. Save event preference to localStorage on feedback event select change
function savePreference() {
    const selectedEvent = document.getElementById("eventSelect").value;
    if (selectedEvent) {
        localStorage.setItem("preferredEvent", selectedEvent);
    }
}

// 11. Load preferred event on page load and preselect it
function loadPreference() {
    const preferred = localStorage.getItem("preferredEvent");
    if (preferred) {
        const select = document.getElementById("eventSelect");
        select.value = preferred;
        showFee();
    }
}

// 12. Clear localStorage and sessionStorage for preferences
function clearPreferences() {
    localStorage.clear();
    sessionStorage.clear();
    document.getElementById("eventSelect").value = "";
    document.getElementById("feeDisplay").textContent = "";
    alert("Preferences cleared.");
}

// 13. Video oncanplay event to show ready message
function videoReadyMessage() {
    document.getElementById("videoStatus").textContent = "Video ready to play!";
}

// 14. Warn user if leaving page with unfinished registration form
window.onbeforeunload = function (e) {
    const form = document.getElementById("eventForm");
    // Check if required fields have values (not empty)
    if (
        form.name.value !== "" ||
        form.email.value !== "" ||
        form.date.value !== "" ||
        form.eventType.value !== ""
    ) {
        const message =
            "You have unsaved registration info. Are you sure you want to leave?";
        e.returnValue = message; // Gecko, Trident, Chrome 34+
        return message; // Gecko, WebKit, Chrome <34
    }
};

// 15. Geolocation to find nearby events
function findLocation() {
    const locationResult = document.getElementById("locationResult");

    if (!navigator.geolocation) {
        locationResult.textContent = "Geolocation is not supported by your browser.";
        return;
    }

    function success(position) {
        const latitude = position.coords.latitude.toFixed(4);
        const longitude = position.coords.longitude.toFixed(4);
        locationResult.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
    }

    function error(err) {
        switch (err.code) {
            case err.PERMISSION_DENIED:
                locationResult.textContent = "Permission denied to access location.";
                break;
            case err.POSITION_UNAVAILABLE:
                locationResult.textContent = "Location information is unavailable.";
                break;
            case err.TIMEOUT:
                locationResult.textContent = "Location request timed out.";
                break;
            default:
                locationResult.textContent = "An unknown error occurred.";
        }
    }

    navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    });
}

// 16. Handle feedback form submit (just prevent default)
function handleFeedback(event) {
    event.preventDefault();
    showFeedbackConfirmation();
}
