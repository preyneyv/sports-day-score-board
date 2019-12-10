let data = {
  current: '',
  scores: {
    po: 0,
    ph: 0,
    he: 0,
    ca: 0
  }
}

window.addEventListener('message', e => {
  // Got an update object from the parent window.
  // Update the scoreboard
  let message = e.data
  if (message.data) {
    data = message.data
    updateScoreboard()
  }
  if (message.animation) {
    // Show the animation.
  }
})

// Reflect the new data on the scoreboard.
function updateScoreboard() {
  $("#current-event").text(data.current)
  $("#house-scores .house-po").text(data.scores.po)
  $("#house-scores .house-ph").text(data.scores.ph)
  $("#house-scores .house-ca").text(data.scores.ca)
  $("#house-scores .house-he").text(data.scores.he)
}

// On load, just do the update.
updateScoreboard()