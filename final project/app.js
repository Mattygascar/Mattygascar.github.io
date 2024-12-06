// Theme toggle logic (applies to final.html)
if (document.getElementById("theme-toggle")) {
    document.getElementById("theme-toggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}

// Quiz logic (applies to game.html)
if (location.pathname.includes("game.html")) {
    let score = 0;

    // Function to add value to the score and navigate to the next question
    function addValue(val, section, button) {
        // Prevent repeated clicks
        if (button.disabled) return;

        // Update score and disable buttons in current section
        score += val;
        const buttons = document.querySelectorAll(`#${section} .buttonGroup button`);
        buttons.forEach(btn => btn.disabled = true); // Disable all buttons
        button.style.backgroundColor = "gray";

        // Navigate to the next section
        const currentSection = document.getElementById(section);
        const nextSection = currentSection.nextElementSibling;

        currentSection.style.display = "none";
        if (nextSection && nextSection.tagName === "SECTION") {
            nextSection.style.display = "block";
        } else {
            sessionStorage.setItem("score", score);
            location.href = "results.html";
        }
    }

    // Expose `addValue` globally for use in HTML onclick
    window.addValue = addValue;
}

// Results logic (results.html)
if (location.pathname.includes("results.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        const score = parseInt(sessionStorage.getItem("score")) || 0;
        const finalScore = document.getElementById("final-score");
        
        if (score < 2) {
            finalScore.innerHTML = `<h1>Beginner</h1><p>Your score is ${score}. Keep practicing!</p>`;
        } else if (score < 4) {
            finalScore.innerHTML = `<h1>Intermediate</h1><p>Your score is ${score}. Not bad at all!</p>`;
        } else {
            finalScore.innerHTML = `<h1>Expert</h1><p>Your score is ${score}. Amazing job!</p>`;
        }
    });
}