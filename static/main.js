'use strict';

function renderQuote (content, timestamp,user, dontstore) {

  let msgDiv = $('<div>');
  msgDiv.addClass('messageBubble');

  if (user === 'user') {
    msgDiv.addClass('user');
  }
  msgDiv.html(content);
  let time = $('<p>');
  time.html(timestamp);
  msgDiv.append(time);



  $('.chatWindow').append(msgDiv);

  if (!dontstore) storeMessage(content, timestamp, user);
}

function filterQuote (response) {
  renderQuote(response.quoteText ,moment().format('lll'), 'visitor');
}

function getQuote () {
  $.ajax({
    url: 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en',
    method: 'GET',
    data : {jsonp : 'filterQuote', format : 'jsonp'},
    dataType : 'jsonp'
  });
}

function getStoredMessages () {
  $.ajax({
    url: 'getStoredMessages',
    method: 'GET' ,
    dataType : 'json' ,
    success : printMessages

  });
  function  printMessages(msgArray) {
    console.log(msgArray);
    for (var i in msgArray) {
      const msg =msgArray[i];
      renderQuote(msg.content, msg.time, msg.userName,true);
    }
  }
}
function storeMessage (content, time,user) {
  $.ajax({
    url: 'store',
    method: 'POST',
    data: {content: content, userName: user , time: time}
  });
}


$(document).ready(function () {

  getStoredMessages();

  $('#target').submit(function (event) {
    const textbox = $('#textbox');
    event.preventDefault();
    const content = textbox.val();
    let time = moment().format('lll');
    renderQuote(content, time, 'user');
    textbox.val('');

    setTimeout(function () {
      getQuote();
    }, 1500);

  });

});