
var htmlContainer = document.querySelector("#htmlContainer");
var resultatEl = document.querySelector("#resultat");
var buttonAdd = document.querySelector("#btnAdd");
var buttonRemove = document.querySelector("#btnRemove");
var resetButton = document.querySelector("#reset");
var showScorebtn = document.querySelector("#setScore");
var kryssEl = document.querySelector("#kryss");
var timerEl = document.querySelector("#timer");
var sound = document.querySelector("#lyd");
timerEl.addEventListener("click", startTimer);
kryssEl.addEventListener("click", lukk);
showScorebtn.addEventListener("click", showScoreboard);
resetButton.addEventListener("click", resetScore);
buttonAdd.addEventListener("click", newTeam);
buttonRemove.addEventListener("click", removeTeam);

var allTeams = [];
var i = 0;
var lastButton ="pa";
var startTeams = 4;

class Team {
  constructor(score, streak, greatestStreak, name, id) {
    this.score = score;
    this.streak = streak;
    this.greatestStreak = greatestStreak;
    this.name = name;
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
    venstreOppe.id = "notused"+i;
    venstreOppe.innerHTML = "streak: " + this.greatestStreak;
    header.appendChild(venstreOppe);

    var team = document.createElement("input");
    team.className = "Teamname";
    team.placeholder = "Team " + this.id;
    team.id = "n"+i;
    team.addEventListener("keyup", changeName);
    header.appendChild(team);

    var streakEl = document.createElement("p");
    streakEl.innerHTML ="streak: " + this.greatestStreak;
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
  for (var j = 0; j < startTeams; j++) {
    newTeam()
  }
}

function newTeam() {
  if (allTeams.length>=10) {
    buttonAdd.style.backgroundColor = "#777";
    buttonAdd.removeEventListener("click", newTeam);
  }else {

    buttonRemove.style.backgroundColor = "white";
    buttonRemove.addEventListener("click", removeTeam);
    buttonAdd.style.backgroundColor = "white";
    buttonAdd.addEventListener("click", newTeam);
    var x = new Team(0, 1, 1, "", i);
    allTeams.push(x);
  }
}

function removeTeam(){
  if (allTeams.length<=1) {
    buttonRemove.style.backgroundColor = "#777";
    buttonRemove.removeEventListener("click", removeTeam);
  }else {
    buttonRemove.style.backgroundColor = "white";
    buttonRemove.addEventListener("click", removeTeam);
    buttonAdd.style.backgroundColor = "white";
    buttonAdd.addEventListener("click", newTeam);

      var divEl = document.querySelectorAll(".container");
      htmlContainer.removeChild(divEl[divEl.length-1]);
      allTeams.pop();
      i--;
  }
}


function changeName(e){
 allTeams[e.target.id[1]].navn = e.target.value;
}

function resetScore() {
  for (var k = 0; k < allTeams.length; k++) {
    allTeams[k].score = 0;
    allTeams[k].streak = 1;
    allTeams[k].greatestStreak = 1;
    var tall = document.getElementById('t' +k);
    tall.innerHTML =allTeams[k].score;
    var streakEl = document.getElementById('s' +k);
    streakEl.innerHTML = "streak: " + allTeams[k].greatestStreak;
  }
}

var streakNa = 1;

function pluss(e) {
  allTeams[e.target.id[1]].score ++;
  var tall = document.getElementById('t' +e.target.id[1]);
  tall.innerHTML =allTeams[e.target.id[1]].score;

  var streakEl = document.getElementById('s' +e.target.id[1]);

  if (lastButton == e.target.id) {
    streakNa++;
    allTeams[e.target.id[1]].streak = streakNa;

    if (allTeams[e.target.id[1]].streak > allTeams[e.target.id[1]].greatestStreak) {
      allTeams[e.target.id[1]].greatestStreak = allTeams[e.target.id[1]].streak;
    }

  }else {
      streakNa = 1;
  }
  streakEl.innerHTML = "streak: " + allTeams[e.target.id[1]].greatestStreak;
  lastButton = e.target.id;
}

function minus(e) {
  allTeams[e.target.id[1]].score --;
  var tall = document.getElementById('t' +e.target.id[1]);
  tall.innerHTML =allTeams[e.target.id[1]].score;

  lastButton = e.target.id;
}



function showScoreboard() {
  showScorebtn.style.display = "none";
  resetButton.style.display = "none";
  buttonAdd.style.display = "none";
  buttonRemove.style.display = "none";
  var tabellEl = document.querySelector("#tabellResultat");
  tabellEl.innerHTML = "";


  var sorted = allTeams.slice(0);
  sorted.sort((a , b) => (a.score < b.score) ? 1 : -1);

  tabellEl.innerHTML += "<tr><th>Plass</th><th>Navn</th><th>Score</th></tr>";


  for (var l = 0; l < sorted.length; l++) {
    var plass = l+1;

    if (sorted[l].name == "") {
      var teamName = "Team " + sorted[l].id;
    }else {
      var teamName =sorted[l].name;
    }

    tabellEl.innerHTML += "<tr><td>"+plass+"</td><td>"+teamName+"</td><td>"+sorted[l].score+"</td></tr>";

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
var timerClock = document.querySelector("#timerKlokke");
var x;
function startTimer() {
  clearInterval(x);
  var time = prompt("Tid i minutter");
  var nowTime = new Date;
  var deadlineDate = new Date(nowTime.getTime() + (time*60000));

  x = setInterval(
    function(){
      var nowDate = new Date();
      t = deadlineDate.getTime() - nowDate.getTime();
      var minutes = ("0" + Math.floor(t/60000)).slice(-2);
      var seconds = ("0" +Math.floor((t%60000)/1000)).slice(-2);
      timerClock.innerHTML = minutes +":" +seconds;

      if (t<0) {
        clearInterval(x);
          timerClock.innerHTML = "Tiden er ute";
          sound.play();
      }
    }, 1000);
}
