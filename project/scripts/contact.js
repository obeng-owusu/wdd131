// Improved email validation function
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            let isValid = true;

            // Clear previous errors
            document.querySelectorAll(".error").forEach(el => el.textContent = "");

            // Validate name
            if (name === "") {
                const nameError = document.getElementById("name-error");
                if (nameError) nameError.textContent = "Name is required";
                isValid = false;
            }

            // Validate email using improved regex
            if (email === "") {
                const emailError = document.getElementById("email-error");
                if (emailError) emailError.textContent = "Email is required";
                isValid = false;
            } else if (!isValidEmail(email)) {
                const emailError = document.getElementById("email-error");
                if (emailError) emailError.textContent = "Please enter a valid email address (e.g., name@example.com)";
                isValid = false;
            }

            // Validate message
            if (message === "") {
                const messageError = document.getElementById("message-error");
                if (messageError) messageError.textContent = "Message is required";
                isValid = false;
            } else if (message.length < 10) {
                const messageError = document.getElementById("message-error");
                if (messageError) messageError.textContent = "Message must be at least 10 characters";
                isValid = false;
            }

            if (isValid) {
                // Save to localStorage
                const submissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]");
                submissions.push({
                    name: name,
                    email: email,
                    message: message,
                    date: new Date().toLocaleString()
                });
                localStorage.setItem("contactSubmissions", JSON.stringify(submissions));

                // Show success message
                const successDiv = document.getElementById("form-success");
                if (successDiv) {
                    successDiv.classList.remove("hidden");
                }

                // Reset form
                form.reset();

                // Clear any remaining error messages
                document.querySelectorAll(".error").forEach(el => el.textContent = "");

                // Hide success message after 3 seconds
                setTimeout(() => {
                    if (successDiv) {
                        successDiv.classList.add("hidden");
                    }
                }, 3000);
            }
        });
    }
});