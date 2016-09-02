$(document).ready(function() {
  var minute = 60000;
  var sessionTime = 25 * minute;
  var breakTime = 5 * minute;
  var stopped = true;
  var sessionTimer, breakTimer, runningSessionTime, runningBreakTime;
  displayBreakValue(breakTime);
  displaySessionValue(sessionTime);


  $('.decreaseBreak').click(function() {
    if (breakTime > minute) {
      breakTime -= minute;
      displayBreakValue(breakTime);
    }
  });
  $('.increaseBreak').click(function() {
    if (breakTime < 59 * minute) {
      breakTime += minute;
      displayBreakValue(breakTime);
    }
  });
  $('.decreaseSession').click(function() {
    if (sessionTime > minute) {
      sessionTime -= minute;
      displaySessionValue(sessionTime);
    }
  });
  $('.increaseSession').click(function() {
    if (sessionTime < 59 * minute) {
      sessionTime += minute;
      displaySessionValue(sessionTime);
    }
  });

  $('.startTimer').click(function() {
    if (stopped) {
      stopped = false;
      $('.startTimer').text('Session');
      $('.time').text(moment(sessionTime).format('mm:ss'));
      runningSessionTime = sessionTime - 1000;
      $('.timeRemaining').animate({backgroundColor: '#4cff4c'}, sessionTime);
      sessionTimer = window.setInterval(function() {
        $('.time').text(moment(runningSessionTime).format('mm:ss'));
        runningSessionTime -= 1000;
        if (runningSessionTime < 0) {
          clearInterval(sessionTimer);
          $('.startTimer').text('Break');
          $('.time').text(moment(breakTime).format('mm:ss'));
          runningBreakTime = breakTime - 1000;
          $('.timeRemaining').animate({backgroundColor: '#ff6666'}, breakTime);
          breakTimer = window.setInterval(function() {
            $('.time').text(moment(runningBreakTime).format('mm:ss'));
            runningBreakTime -= 1000;
            if (runningBreakTime < 0) {
              clearInterval(breakTimer);
              stopped = true;
              $('.startTimer').click();
            }
          }, 1000);
        }
      }, 1000);
    } else {
      stopped = true;
      runningBreakTime = breakTime;
      runningSessionTime = sessionTime;
      $('.startTimer').text('Stopped');
      clearInterval(sessionTimer);
      clearInterval(breakTimer);
      $('.time').text('--:--');
      $('.timeRemaining').stop(true, false);
      $('.timeRemaining').css('background-color', '#ffffff');
    }
  });
});

function displayBreakValue(breakTime) {
  $('.breakValue').text(breakTime / 60000);
}

function displaySessionValue(sessionTime) {
  $('.sessionValue').text(sessionTime / 60000);
}