import data from "/json/alerts.js";

class Alert {
    init() {
      this.data = data;
    }
  
    buildAlert() {
      // this.data is an array of objects
      let section = document.createElement("section")
      let elements = "";
      for (let i = 0; i < this.data.length; i++){
        elements += `<p style="padding:5px;color:${this.data[i].color};background-color:${this.data[i].background};">${this.data[i].message}</p>`
      }
      section.innerHTML = elements;
      section.classList.add("alert");
      let main = document.querySelector("main");
      main.appendChild(section);

    }
  }
  let alert = new Alert();
  alert.init();
  alert.buildAlert();