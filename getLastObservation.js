window.onload = function() {
  document.getElementById("load").onclick = handleOnce;
};

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
  document.getElementById("output").value =JSON.parse(ajaxObject.responseText);  
}
