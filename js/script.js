document.addEventListener("DOMContentLoaded", function() {
  const sideNav = document.querySelectorAll(".sidenav");
  M.Sidenav.init(sideNav);

  loadNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;
        // loadnav
        const nav = document.querySelectorAll(".topnav, .sidenav");
        nav.forEach(function(e) {
          e.innerHTML = xhttp.responseText;
        });
      }

      // register event listener for 'a' link
      const aNav = document.querySelectorAll(".topnav a, .sidenav a");
      aNav.forEach(function(e) {
        e.addEventListener("click", function() {
          //close sidenav
          const sideNav = document.querySelector(".sidenav");
          M.Sidenav.getInstance(sideNav).close();

          // load page called
          page = event.target.getAttribute("href").substring(1);
          loadPage(page);
        });
      });
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // load page content
  var page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        var content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
          const slider = document.querySelectorAll(".slider");
          M.Slider.init(slider, {
            height: 500,
            transition: 600,
            interval: 3000
          });
          const materialBox = document.querySelectorAll(".materialboxed");
          M.Materialbox.init(materialBox);
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups... Halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});
