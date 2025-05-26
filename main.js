function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    document.getElementById("confirmationMessage").textContent =
        `Thank you, ${name}, for registering! We'll contact you soon.`;
    event.target.reset();
}


function validatePhone() {
    const phone = document.getElementById("phone").value;
    if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
    }
}

function showFee() {
    const feeDisplay = document.getElementById("feeDisplay");
    const selected = document.getElementById("eventSelect").value;
    let fee = "";

    switch (selected) {
        case "picnic":
            fee = "Rs50";
            break;
        case "run":
            fee = "Rs100";
            break;
        case "fair":
            fee = "Rs80";
            break;
        default:
            fee = "";
    }

    feeDisplay.textContent = fee ? `Event Fee: ${fee}` : "";
}

function showFeedbackConfirmation() {
    document.getElementById("confirmationText").textContent =
        "Thank you for your feedback!";
}

function enlargeImage() {
    const img = document.getElementById("eventImg");
    if (img.style.maxWidth === "200px") {
        img.style.maxWidth = "100%";
    } else {
        img.style.maxWidth = "200px";
    }
}

function countChars() {
    const text = document.getElementById("feedbackText").value;
    document.getElementById("charCount").textContent = text.length;
}
function videoReadyMessage() {
    document.getElementById("videoStatus").textContent = "🎬 Video ready to play!";
}

window.onbeforeunload = function () {
    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email")?.value;
    const message = document.getElementById("message")?.value;
    if (name || email || message) {
        return "You have unsaved changes. Are you sure you want to leave?";
    }
};


function savePreference() {
    const selectedEvent = document.getElementById("eventSelect").value;
    localStorage.setItem("preferredEvent", selectedEvent);
}


window.onload = function () {
    const savedEvent = localStorage.getItem("preferredEvent");
    if (savedEvent) {
        document.getElementById("eventSelect").value = savedEvent;
        showFee(); // update fee display too
    }
};


function clearPreferences() {
    localStorage.clear();
    sessionStorage.clear();
    alert("Preferences cleared!");
    document.getElementById("eventSelect").value = "";
    document.getElementById("feeDisplay").textContent = "";
}