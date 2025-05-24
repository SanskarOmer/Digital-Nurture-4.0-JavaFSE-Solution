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