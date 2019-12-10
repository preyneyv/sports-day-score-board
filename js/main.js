// Scoreboard popup controller
let scoreboardWindow;
$('#open-scoreboard').on('click', () => {
  if (!scoreboardWindow || scoreboardWindow.closed)
    scoreboardWindow = window.open('board.html', '_blank')
})
window.onbeforeunload = () => (scoreboardWindow && scoreboardWindow.close(), null)

// Open the scoreboard by default.
scoreboardWindow = window.open('board.html', '_blank')

// The data on the scoreboard.
let data = {
  current: '',
  scores: {
    po: 0,
    ph: 0,
    he: 0,
    ca: 0
  }
}

// Sync data between scoreboard and controller.
function syncData() {
  if (!scoreboardWindow) return;
  scoreboardWindow.postMessage({data}, '*')
}

// Send the updated current event.
$('#current-event').on('blur search', function() {
  data.current = $(this).val();
  syncData()
})

// Update the score.
$(".score-input").on('blur', function() {
  data.scores[$(this).attr('data-change')] = parseInt($(this).val(), 10)
  syncData()
})

$(".score-subtract").on('click', function () {
  let target = $(this).attr('data-change');
  data.scores[target] = parseInt(data.scores[target], 10) - 10
  data.scores[target] = Math.max(0, data.scores[target])
  $(`.score-input[data-change=${target}]`).val(data.scores[target])
  syncData();
})

$(".score-add").on('click', function () {
  let target = $(this).attr('data-change');
  data.scores[target] = parseInt(data.scores[target], 10) + 10
  $(`.score-input[data-change=${target}]`).val(data.scores[target])
  syncData();
})