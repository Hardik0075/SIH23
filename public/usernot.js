document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.getElementById("backButton");

    backButton.addEventListener("click", function () {
        // Redirect back to the sign-in page
        window.location.href = "/sign"; // Replace "signin.html" with your actual sign-in page URL
    });
});