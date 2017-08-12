function myFunction() {
  var x = document.getElementById("nav");
  if (x.className === "nav") {
      x.className += " responsive";
      document.getElementById("menuIcon").innerHTML = "&times;";
  } else {
      x.className = "nav";
      document.getElementById("menuIcon").innerHTML = "&#9776;";
  }
}


var profileBtn = document.getElementsByClassName("profile-btn");
var modalWindow = document.getElementsByClassName("modal");
var closeBtn = document.getElementsByClassName("closeModal");

var showModal = function() {
    var attribute = this.getAttribute("data-modal");
    document.getElementById(attribute).style.display = "block";
};

var hideModal = function(event) {

  if(event.target.className == "modal"){

    this.style.display = "none";

  }else{

    var attribute = this.parentNode.parentNode.id;
    document.getElementById(attribute).style.display = "none";
  }
};

for (var i = 0; i < profileBtn.length; i++) {
    profileBtn[i].addEventListener('click', showModal, false);
}

for (var i = 0; i < modalWindow.length; i++) {
    modalWindow[i].addEventListener('click', hideModal, false);
}

for (var i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener('click', hideModal, false);
}
