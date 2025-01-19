// Countdown setup using moment-timezone
const endDate1 = moment.tz("2025-01-19 23:59:59", "America/New_York").valueOf();

function updateCountdown1() {
    const now = moment().tz("America/New_York").valueOf();
    const distance = endDate1 - now;

    if (distance < 0) {
        // Display message after the countdown ends
        document.getElementById("countdownBox1").innerHTML =
            "• TikTok ban awaiting Trump's approval due to Biden's decision •";
        document.getElementById("welcomeMessage").innerHTML =
            "TikTok ban in progress?";
    } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("countdown1").innerHTML =
            (days < 10 ? "0" : "") + days + "d " +
            (hours < 10 ? "0" : "") + hours + "h " +
            (minutes < 10 ? "0" : "") + minutes + "m " +
            (seconds < 10 ? "0" : "") + seconds + "s ";
    }
}

function initializeCountdown() {
    const now = moment().tz("America/New_York").valueOf();

    if (endDate1 - now < 0) {
        // Timer has already expired
        document.getElementById("countdownBox1").innerHTML =
            "• TikTok ban awaiting Trump's approval due to Biden's decision •";
        document.getElementById("welcomeMessage").innerHTML =
            "TikTok ban in progress?";
    } else {
        // Start the countdown
        setInterval(updateCountdown1, 1000);
    }
}

// Initialize the countdown
initializeCountdown();

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: "TikTok Ban Countdown",
            url: window.location.href
        }).then(() => {
            console.log("Thanks for sharing!");
        }).catch((err) => {
            console.log(`Couldn't share because of`, err.message);
        });
    } else {
        alert("Your browser does not support the Web Share API");
    }
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, "_blank");
}

function shareOnTwitterX() {
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=Check%20out%20this%20TikTok%20ban%20countdown!`;
    window.open(shareUrl, "_blank");
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(shareUrl, "_blank");
}

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

function copyToClipboard() {
    const code = document.querySelector("#embedCodeContent").textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert("Code copied to clipboard!");
    }).catch((err) => {
        alert("Failed to copy code: " + err);
    });
}
