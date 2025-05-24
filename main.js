function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    document.getElementById("confirmationMessage").textContent =
        `Thank you, ${name}, for registering! We'll contact you soon.`;
    event.target.reset();
}