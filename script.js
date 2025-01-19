// Countdown setup using moment-timezone
const endDate1 = moment.tz("2025-01-19 23:59:59", "America/New_York").valueOf();
const endDate2 = moment.tz("2025-04-19 23:59:59", "America/New_York").valueOf();

function updateCountdown1() {
    const now = moment().tz("America/New_York").valueOf();
    const distance = endDate1 - now;
    if (distance < 0) {
        document.getElementById("countdownBox1").innerHTML =
            "• The first countdown has ended — the initial deadline has passed •";
    } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("countdown1").innerHTML =
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

function updateCountdown2() {
    const now = moment().tz("America/New_York").valueOf();
    const distance = endDate2 - now;
    if (distance < 0) {
        document.getElementById("countdownBox2").innerHTML =
            "• The extension deadline has also passed. TikTok may now be banned, depending on a sale •";
    } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("countdown2").innerHTML =
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

function initializeCountdowns() {
    setInterval(updateCountdown1, 1000);
    setInterval(updateCountdown2, 1000);
}

initializeCountdowns();

// Toggle content visibility for "Learn More" buttons
function toggleContent(contentId, button) {
    const contentElements = document.querySelectorAll(".content");
    const buttons = document.querySelectorAll(".learn-more-button");

    contentElements.forEach((content) => {
        if (content.id !== contentId) {
            content.style.display = "none";
        }
    });

    buttons.forEach((btn) => {
        if (btn !== button) {
            btn.classList.remove("active");
        }
    });

    const content = document.getElementById(contentId);
    if (content.style.display === "block") {
        content.style.display = "none";
        button.classList.remove("active");
    } else {
        content.style.display = "block";
        button.classList.add("active");
    }
}

// Dark mode toggle functionality
const darkModeToggle = document.getElementById("nightModeToggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Share buttons (optional customization for dynamic links)
const shareButtons = document.querySelectorAll(".share-buttons a");
shareButtons.forEach((button) => {
    button.href = button.href.replace("YOUR_PAGE_URL", window.location.href);
});
