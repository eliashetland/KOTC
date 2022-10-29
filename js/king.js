
var htmlContainer = document.querySelector("#htmlContainer");
var resultatEl = document.querySelector("#resultat");
var buttonAdd = document.querySelector("#btnAdd");
var buttonRemove = document.querySelector("#btnRemove");
var resetButton = document.querySelector("#reset");
var showScorebtn = document.querySelector("#setScore");
var kryssEl = document.querySelector("#kryss");
var timerEl = document.querySelector("#timer");
var lyd = document.querySelector("#lyd");
timerEl.addEventListener("click", startTimer);
kryssEl.addEventListener("click", lukk);
showScorebtn.addEventListener("click", showScoreboard);
resetButton.addEventListener("click", resetScore);
buttonAdd.addEventListener("click", nyttLag);
buttonRemove.addEventListener("click", fjernLag);

alleLag = [];
var i = 0;
var forrigeKnapp ="pa";
var startLag = 4;

class Lag {
  constructor(score, streak, storstStreak, navn, id) {
    this.score = score;
    this.streak = streak;
    this.storstStreak = storstStreak;
    this.navn = navn;
    this.id = id +1;

    var container = document.createElement("div");
    container.className = "container";
    container.style.backgroundColor = "hsl(" +i *35+ ", 90%, 65%)";
    htmlContainer.appendChild(container);

    var header = document.createElement("div");
    header.className = "header";
    container.appendChild(header);

    var venstreOppe = document.createElement("p");
    venstreOppe.className = "usynlig";
    venstreOppe.id = "dritt"+i;
    venstreOppe.innerHTML = "streak: " + this.storstStreak;
    header.appendChild(venstreOppe);

    var team = document.createElement("input");
    team.className = "Teamname";
    team.placeholder = "Lag " + this.id;
    team.id = "n"+i;
    team.addEventListener("keyup", byttNavn);
    header.appendChild(team);

    var streakEl = document.createElement("p");
    streakEl.innerHTML ="streak: " + this.storstStreak;
    streakEl.className = "streakNumber";
    streakEl.id = "s"+i;
    header.appendChild(streakEl);

    var point = document.createElement("div");
    point.className = "point";
    container.appendChild(point);

    var btnm = document.createElement("button");
    btnm.className = "button";
    btnm.innerHTML = "-";
    btnm.id = "m" + i;
    btnm.addEventListener("click", minus);
    point.appendChild(btnm);

    var tekst = document.createElement("p");
    tekst.innerHTML = this.score;
    tekst.id = "t"+i;
    tekst.className = "scoreElement";
    point.appendChild(tekst);

    var btnp = document.createElement("button");
    btnp.className = "button";
    btnp.innerHTML = "+";
    btnp.id = "p"+i;
    btnp.addEventListener("click", pluss);
    point.appendChild(btnp);

    i++;
  }
}
setup();


function setup() {
  for (var j = 0; j < startLag; j++) {
    nyttLag()
  }
}

function nyttLag() {
  if (alleLag.length>=10) {
    buttonAdd.style.backgroundColor = "#777";
    buttonAdd.removeEventListener("click", nyttLag);
  }else {

    buttonRemove.style.backgroundColor = "white";
    buttonRemove.addEventListener("click", fjernLag);
    buttonAdd.style.backgroundColor = "white";
    buttonAdd.addEventListener("click", nyttLag);
    var x = new Lag(0, 1, 1, "", i);
    alleLag.push(x);
  }
}

function fjernLag(){
  if (alleLag.length<=1) {
    buttonRemove.style.backgroundColor = "#777";
    buttonRemove.removeEventListener("click", fjernLag);
  }else {
    buttonRemove.style.backgroundColor = "white";
    buttonRemove.addEventListener("click", fjernLag);
    buttonAdd.style.backgroundColor = "white";
    buttonAdd.addEventListener("click", nyttLag);

      var divEl = document.querySelectorAll(".container");
      htmlContainer.removeChild(divEl[divEl.length-1]);
      alleLag.pop();
      i--;
  }
}


function byttNavn(e){
 alleLag[e.target.id[1]].navn = e.target.value;
}

function resetScore() {
  for (var k = 0; k < alleLag.length; k++) {
    alleLag[k].score = 0;
    alleLag[k].streak = 1;
    alleLag[k].storstStreak = 1;
    var tall = document.getElementById('t' +k);
    tall.innerHTML =alleLag[k].score;
    var streakEl = document.getElementById('s' +k);
    streakEl.innerHTML = "streak: " + alleLag[k].storstStreak;
  }
}

var streakNa = 1;

function pluss(e) {
  alleLag[e.target.id[1]].score ++;
  var tall = document.getElementById('t' +e.target.id[1]);
  tall.innerHTML =alleLag[e.target.id[1]].score;

  var streakEl = document.getElementById('s' +e.target.id[1]);

  if (forrigeKnapp == e.target.id) {
    streakNa++;
    alleLag[e.target.id[1]].streak = streakNa;

    if (alleLag[e.target.id[1]].streak > alleLag[e.target.id[1]].storstStreak) {
      alleLag[e.target.id[1]].storstStreak = alleLag[e.target.id[1]].streak;
    }

  }else {
      streakNa = 1;
  }
  streakEl.innerHTML = "streak: " + alleLag[e.target.id[1]].storstStreak;
  forrigeKnapp = e.target.id;
}

function minus(e) {
  alleLag[e.target.id[1]].score --;
  var tall = document.getElementById('t' +e.target.id[1]);
  tall.innerHTML =alleLag[e.target.id[1]].score;

  forrigeKnapp = e.target.id;
}



function showScoreboard() {
  showScorebtn.style.display = "none";
  resetButton.style.display = "none";
  buttonAdd.style.display = "none";
  buttonRemove.style.display = "none";
  var tabellEl = document.querySelector("#tabellResultat");
  tabellEl.innerHTML = "";


  var sortert = alleLag.slice(0);
  sortert.sort((a , b) => (a.score < b.score) ? 1 : -1);

  tabellEl.innerHTML += "<tr><th>Plass</th><th>Navn</th><th>Score</th></tr>";


  for (var l = 0; l < sortert.length; l++) {
    var plass = l+1;

    if (sortert[l].navn == "") {
      var lagNavn = "Lag " + sortert[l].id;
    }else {
      var lagNavn =sortert[l].navn;
    }

    tabellEl.innerHTML += "<tr><td>"+plass+"</td><td>"+lagNavn+"</td><td>"+sortert[l].score+"</td></tr>";

  }
  resultatEl.style.display = "block";
}

function lukk() {
  resultatEl.style.display = "none";
  showScorebtn.style.display = "inline";
  resetButton.style.display = "inline";
  buttonAdd.style.display = "inline";
  buttonRemove.style.display = "inline";
}


//timer
var timerKlokke = document.querySelector("#timerKlokke");
var x;
function startTimer() {
  clearInterval(x);
  var tid = prompt("Tid i minutter");
  var nowTime = new Date;
  var deadlineDate = new Date(nowTime.getTime() + (tid*60000));

  x = setInterval(
    function(){
      var nowDate = new Date();
      t = deadlineDate.getTime() - nowDate.getTime();
      var minutes = ("0" + Math.floor(t/60000)).slice(-2);
      var seconds = ("0" +Math.floor((t%60000)/1000)).slice(-2);
      timerKlokke.innerHTML = minutes +":" +seconds;

      if (t<0) {
        clearInterval(x);
          timerKlokke.innerHTML = "Tiden er ute";
          lyd.play();
      }
    }, 1000);
}
