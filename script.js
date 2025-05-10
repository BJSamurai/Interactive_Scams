function pt1_checkAnswer(url) {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (win) {
      win.blur();
      window.focus();
    }
  
    const realDomain = "steampowered.com";
    const isCorrect = url.includes(realDomain);
    const message = isCorrect
      ? "You are getting the correct one!"
      : "Sorry, that’s incorrect.";
  
    // Choose the right message element
    const resultId = event.target.parentElement.querySelectorAll("button").length > 2
      ? "result-message"
      : "result-message-2";
  
    const resultEl = document.getElementById(resultId);
    resultEl.textContent = message;
    resultEl.className = isCorrect ? "correct" : "incorrect";
  }
  

  function pt2_showResult(answer) {
    const resultMessage = document.getElementById('result-message-2');
    
    if (answer === 'correct') {
      resultMessage.textContent = "You are getting the right one!";
      resultMessage.className = "correct"; 
    } else {
      resultMessage.textContent = "Sorry, that’s incorrect. Also stay focus on the buttons!";
      resultMessage.className = "incorrect";  
    }
  }
  

  function pt3_invisible_redirect() {
    window.open("https://www.merriam-webster.com/dictionary/scam", "_blank");
  }
  
  