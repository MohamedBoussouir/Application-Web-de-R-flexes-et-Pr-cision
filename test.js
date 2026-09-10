function showResults(pseudo, finalScore, finalMisses, duration) {
  view_game.classList.add("hidden");
  view_results.classList.remove("hidden");

  let totalClicks = finalScore + finalMisses;
  let accuracy = totalClicks > 0 ;

  document.getElementById("res-player").textContent = pseudo;
  document.getElementById("res-score").textContent = finalScore;
  document.getElementById("res-misses").textContent = finalMisses;
  document.getElementById("res-accuracy").textContent = ${accuracy}%;
  document.getElementById("res-time").textContent = ${duration}s;
}

btn_results_home.addEventListener("click", () => {
  view_results.classList.add("hidden");
  view_home.classList.remove("hidden");
});

btn_replay.addEventListener("click", () => {
  view_results.classList.add("hidden");
  view_config.classList.remove("hidden");
});