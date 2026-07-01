(function () {
  var modal = document.getElementById("sleep-quiz");
  var openers = document.querySelectorAll(".js-quiz-open");
  var closers = document.querySelectorAll(".js-quiz-close");
  var views = document.querySelectorAll(".quiz-view");
  var optionButtons = document.querySelectorAll(".quiz-option");
  var finalSticky = document.querySelector(".final-sticky");
  var resultSummary = document.getElementById("result-summary");
  var answers = [];
  var currentStep = 1;

  function showView(selector) {
    views.forEach(function (view) {
      view.classList.remove("is-active");
    });
    var next = document.querySelector(selector);
    if (next) {
      next.classList.add("is-active");
    }
  }

  function openQuiz(event) {
    event.preventDefault();
    answers = [];
    currentStep = 1;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("quiz-open");
    if (finalSticky) {
      finalSticky.classList.remove("is-visible");
      finalSticky.setAttribute("aria-hidden", "true");
      finalSticky.style.opacity = "";
      finalSticky.style.pointerEvents = "";
    }
    showView('.quiz-step[data-step="1"]');
  }

  function closeQuiz() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("quiz-open");
  }

  function buildSummary() {
    var gender = answers[0] || "Ihr Profil";
    var issue = answers[1] || "unterbrochener Schlaf";
    var position = answers[2] || "Ihre Schlafposition";
    var wakeState = answers[3] || "Sie wachen nicht erholt auf";
    var attempted = answers[4] || "übliche Lösungen";
    resultSummary.textContent =
      "Profil: \"" +
      gender +
      "\". Sie haben \"" +
      issue +
      "\" ausgewählt, schlafen hauptsächlich in der Position \"" +
      position +
      "\", wachen auf mit \"" +
      wakeState +
      "\" und haben bereits \"" +
      attempted +
      "\" ausprobiert. Das weist auf einen klaren Bedarf hin: stabile Unterstützung für Kopf, Nacken und Schultern während der ganzen Nacht.";
  }

  function showResult() {
    buildSummary();
    showView(".quiz-result");
    if (finalSticky) {
      finalSticky.classList.add("is-visible");
      finalSticky.setAttribute("aria-hidden", "false");
      finalSticky.style.opacity = "1";
      finalSticky.style.pointerEvents = "auto";
    }
  }

  openers.forEach(function (opener) {
    opener.addEventListener("click", openQuiz);
  });

  closers.forEach(function (closer) {
    closer.addEventListener("click", closeQuiz);
  });

  optionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      answers[currentStep - 1] = button.getAttribute("data-answer");
      if (currentStep < 5) {
        currentStep += 1;
        showView('.quiz-step[data-step="' + currentStep + '"]');
        return;
      }
      showView(".quiz-loading");
      window.setTimeout(showResult, 950);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeQuiz();
    }
  });

})();

// Countdown timer – counts down to midnight tonight
(function () {
  var display = document.getElementById("timer-display");
  if (!display) return;

  var STORAGE_KEY = "derila_timer_end";
  var stored = sessionStorage.getItem(STORAGE_KEY);
  var endTime;

  if (stored) {
    endTime = parseInt(stored, 10);
  } else {
    var now = new Date();
    var midnight = new Date(now);
    midnight.setHours(23, 59, 59, 999);
    endTime = midnight.getTime();
    sessionStorage.setItem(STORAGE_KEY, endTime);
  }

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    var remaining = Math.max(0, endTime - Date.now());
    var h = Math.floor(remaining / 3600000);
    var m = Math.floor((remaining % 3600000) / 60000);
    var s = Math.floor((remaining % 60000) / 1000);
    display.textContent = pad(h) + ":" + pad(m) + ":" + pad(s);
    if (remaining > 0) {
      setTimeout(tick, 1000);
    } else {
      display.textContent = "00:00:00";
    }
  }

  tick();
})();

// FAQ accordion
(function () {
  var items = document.querySelectorAll(".faq-item");
  items.forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      items.forEach(function (i) {
        i.classList.remove("is-open");
        var b = i.querySelector(".faq-q");
        if (b) b.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
})();
