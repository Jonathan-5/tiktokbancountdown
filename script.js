document.getElementById('suggestionForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var name = document.getElementById('name').value;
  var suggestion = document.getElementById('suggestion').value;

  db.collection("suggestions").add({
    name: name,
    suggestion: suggestion,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    document.getElementById('message').innerText = 'Thank you for your suggestion!';
    document.getElementById('suggestionForm').reset();
  })
  .catch((error) => {
    document.getElementById('message').innerText = 'An error occurred. Please try again later.';
  });
});

function toggleContent(contentId, button) {
  const contentElements = document.querySelectorAll('.content');
  const buttons = document.querySelectorAll('.learn-more-button');

  contentElements.forEach(content => {
    if (content.id !== contentId) {
      content.style.display = 'none';
    }
  });

  buttons.forEach(btn => {
    if (btn !== button) {
      btn.classList.remove('active');
    }
  });

  const content = document.getElementById(contentId);
  if (content.style.display === 'block') {
    content.style.display = 'none';
    button.classList.remove('active');
  } else {
    content.style.display = 'block';
    button.classList.add('active');
    if (contentId === 'embedCode') {
      document.getElementById('updateSelectionButton').style.display = 'inline-block';
    }
  }
}

function copyToClipboard() {
  const code = document.querySelector('#embedCodeContent').textContent;
  navigator.clipboard.writeText(code).then(() => {
    alert('Code copied to clipboard!');
  }).catch(err => {
    alert('Failed to copy code: ' + err);
  });
}

function showCustomizationOptions() {
  document.getElementById('customizationOptions').style.display = 'block';
}

function generateCustomEmbedCode() {
  const showDays = document.getElementById('showDays').checked;
  const showHours = document.getElementById('showHours').checked;
  const showMinutes = document.getElementById('showMinutes').checked;
  const showSeconds = document.getElementById('showSeconds').checked;
  const darkTheme = document.getElementById('darkTheme').checked;
  const endMessage = document.getElementById('endMessage').value || '• The countdown has ended — the deadline has passed •';
  const fontSize = document.getElementById('fontSize').value || '36';

  const customCode = `&lt;!-- TikTok Ban Countdown Embed Code --&gt;
&lt;div id="countdown-box" style="font-size: ${fontSize}px; ${darkTheme ? 'background-color: #2C2C2C; color: #FFFFFF;' : ''}"&gt;
  &lt;div class="timer-row"&gt;
    &lt;div class="countdown-label"&gt;In:&lt;/div&gt;
    &lt;div class="countdown" id="countdown-embed"&gt;00d 00h 00m 00s&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"&gt;&lt;/script&gt;
&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.34/moment-timezone-with-data.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
  var endDateEmbed = moment.tz("2025-01-19 23:59:59", "America/New_York").valueOf();
  
  function updateCountdownEmbed() {
    var now = moment().tz("America/New_York").valueOf();
    var distance = endDateEmbed - now;
    if (distance < 0) {
      document.getElementById("countdown-box").innerHTML = "${endMessage}";
    } else {
      var days = ${showDays ? "Math.floor(distance / (1000 * 60 * 60 * 24)) + 'd '" : ""};
      var hours = ${showHours ? "Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + 'h '" : ""};
      var minutes = ${showMinutes ? "Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) + 'm '" : ""};
      var seconds = ${showSeconds ? "Math.floor((distance % (1000 * 60)) / 1000) + 's '" : ""};
      document.getElementById("countdown-embed").innerHTML = (days < 10 ? "0" : "") + days + (hours < 10 ? "0" : "") + hours + (minutes < 10 ? "0" : "") + minutes + (seconds < 10 ? "0" : "") + seconds;
    }
  }
  
  setInterval(updateCountdownEmbed, 1000);
&lt;/script&gt;`;

  document.getElementById('embedCodeContent').innerHTML = customCode;
  document.getElementById('customizationOptions').style.display = 'none';
  document.getElementById('updateSelectionButton').style.display = 'none';
}

document.getElementById('nightModeToggle').addEventListener('click', function() {
  document.body.classList.toggle('night-mode');
});

function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: 'TikTok Ban Countdown',
      url: window.location.href
    }).then(() => {
      console.log('Thanks for sharing!');
    }).catch((err) => {
      console.log(`Couldn't share because of`, err.message);
    });
  } else {
    alert('Your browser does not support the Web Share API');
  }
}

function shareOnFacebook() {
  const url = encodeURIComponent(window.location.href);
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  window.open(shareUrl, '_blank');
}

function shareOnTwitterX() {
  const url = encodeURIComponent(window.location.href);
  const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=Check%20out%20this%20TikTok%20ban%20countdown!`;
  window.open(shareUrl, '_blank');
}

function shareOnLinkedIn() {
  const url = encodeURIComponent(window.location.href);
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  window.open(shareUrl, '_blank');
}
