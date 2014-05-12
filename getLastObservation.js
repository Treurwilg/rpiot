window.onload = function() {
  document.getElementById("start").onclick = setStartConditions;
  document.getElementById("stop").onclick = setStopCondition;
};

function setStartConditions() {
  window.nr = 0;
  window.setStop = false;
  manageRepetition();
}

function setStopCondition() {
  window.setStop = true;
}

function manageRepetition() {
  var interval = document.getElementById("interval").value;
  var number = document.getElementById("number").value;
  handleOnce();
  window.nr++;
  if (window.nr < number && interval >= 1000 && window.setStop == false) {
    myTimeout = window.setTimeout(manageRepetition, interval);
  } else {
    if (myTimeout != null) {
      window.clearTimeout(myTimeout);
    }
  }
}

function getOnce(url, fn) {
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4) {
      if (ajax.status == 200) {
        fn(ajax);
      } else {
        alert("Error fetching text of " + url + ":\n" + ajax.status + " " + ajax.statusText);
      }
    }
  };
  ajax.open("GET", url, true);
  ajax.send(null);
};

function handleOnce() {
  getOnce("lastObservation.php", ajaxCompleted);
};

function ajaxCompleted(ajax) {
  updatePage(ajax);
}

function updatePage(ajaxObject) {
  var jsObj = JSON.parse(ajaxObject.responseText);  
  var table = document.getElementById("output");
  var nrOfRows = table.rows.length;
  var row = table.insertRow(nrOfRows);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = window.nr;
  cell2.innerHTML = jsObj[0];
  cell3.innerHTML = jsObj[1];
  window.scrollBy(0,21);
}
