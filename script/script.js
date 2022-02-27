"use strict";
// Define Variables
const pBar01 = document.querySelector(".progress__mob");
const playerBar = document.querySelector(".progress__player");
const monsterSprite = document.querySelector(".monster");
const iconsSession = document.querySelector(".icons");
const swordAttack = document.getElementById("sword");

// Points in Stats
const arrowGeneral = document.querySelector(".arrow");
const arrowSTR = document.querySelector(".arrow-str");
const arrowDEX = document.querySelector(".arrow-dex");
const arrowAGI = document.querySelector(".arrow-agi");
const arrowVIT = document.querySelector(".arrow-vit");
const arrowINT = document.querySelector(".arrow-int");

//

// -------------------------Define Objects------------------------- //
function heroes(
  nameHero,
  classHero,
  maxHP,
  HP,
  maxSP,
  SP,
  STR,
  DEX,
  AGI,
  VIT,
  INT,
  atributePoints,
  EXP,
  LVL
) {
  this.nameHero = nameHero;
  this.classHero = classHero;
  this.maxHP = maxHP;
  this.HP = HP;
  this.maxSP = maxSP;
  this.SP = SP;
  this.STR = STR;
  this.DEX = DEX;
  this.AGI = AGI;
  this.VIT = VIT;
  this.INT = INT;
  this.atributePoints = atributePoints;
  this.EXP = EXP;
  this.LVL = LVL;
  this.ATK = 0;
  this.MAG = 0;
  this.DEF = 0;
  this.ACC = 0;
  this.SPD = 0;
  this.minAtk = 0;
  this.maxAtk = 0;
}
//Set Warrior Class Values
const warriorStats = ["Heroe", "Warrior", 50, 50, 0, 0, 3, 2, 1, 2, 1, 0, 0, 1];

//Creating a warrior
const warrior = new heroes();

//Attributing values to warrior Obj
let index = 0;
for (let element in warrior) {
  warrior[element] = warriorStats[index];
  index++;
}

// -------------------------Atribute------------------------- //

// function selectAtribute(atribute) {
//   return document.getElementById(atribute);
// }

// Showing hero Stats in HTML (.hero-stats class)
function writeStats() {
  //Stats Initialization
  document.getElementById("STR").textContent = warrior.STR;
  document.getElementById("DEX").textContent = warrior.DEX;
  document.getElementById("AGI").textContent = warrior.AGI;
  document.getElementById("VIT").textContent = warrior.VIT;
  document.getElementById("INT").textContent = warrior.INT;
  defineAtributes(warrior);

  //Atribute initialization
  document.getElementById("HP").textContent = `${warrior.HP}/${warrior.maxHP}`;
  document.getElementById("SP").textContent = `${warrior.SP}/${warrior.maxSP}`;
  document.getElementById(
    "ATK"
  ).textContent = `${warrior.minAtk} - ${warrior.maxAtk}`;
  document.getElementById("MAG").textContent = warrior.MAG;
  document.getElementById("DEF").textContent = warrior.DEF;
  document.getElementById("ACC").textContent = warrior.ACC;
  document.getElementById("SPD").textContent = warrior.SPD;
}

//Do the math for Attributes based on Hero Stats Points.
function defineAtributes(heroe) {
  heroe.minAtk = Math.round(heroe.STR * 0.3);
  heroe.maxAtk = Math.round(heroe.STR * 1.1);
  heroe.maxHP = Math.round(heroe.STR * 1.2) + heroe.VIT * 5 + warriorStats[2];
  heroe.ACC = heroe.DEX * 5;
  heroe.DEF = heroe.DEX * 2 + heroe.VIT * 2;
  heroe.MAG = heroe.INT * 4;
  heroe.SPD = heroe.AGI * 3;
  heroe.maxSP = heroe.INT * 5;
}

//Initializing Stats
writeStats(); // CORRIGIR
warrior.HP = warrior.maxHP;
warrior.SP = warrior.maxSP;
writeStats();

// -------------------------Upgrade Stats------------------------- //

// const clickArrow = () => {
//   defineAtributes(warrior);
//   writeStats();
//     if(document.querySelector('.arrow').classList.contains('.arrow-str') || document.querySelector('.arrow').classList.contains('.arrow-vit')) {
//       updateProgressBarPlayer(playerBar, warrior.HP, warrior.maxHP, definePercentages(warrior.maxHP, warrior.HP))
//     }
// }

//Button all

// document.querySelector('.arrow').addEventListener('click', function(){
//   switch(true) {
//     case ()
//   }
// })

//Buton STR
arrowSTR.addEventListener("click", function () {
  warrior.STR++;
  defineAtributes(warrior);
  writeStats();
  percentPlayer = definePercentages(warrior.maxHP, warrior.HP);
  updateProgressBarPlayer(playerBar, warrior.HP, warrior.maxHP, percentPlayer);
});

//Button DEX
arrowDEX.addEventListener("click", function () {
  warrior.DEX++;
  defineAtributes(warrior);
  writeStats();
});

//Button AGI
arrowAGI.addEventListener("click", function () {
  warrior.AGI++;
  defineAtributes(warrior);
  writeStats();
});

//Button VIT
arrowVIT.addEventListener("click", function () {
  warrior.VIT++;
  defineAtributes(warrior);
  writeStats();
  percentPlayer = definePercentages(warrior.maxHP, warrior.HP);
  updateProgressBarPlayer(playerBar, warrior.HP, warrior.maxHP, percentPlayer);
});

//Button INT
arrowINT.addEventListener("click", function () {
  warrior.INT++;
  defineAtributes(warrior);
  writeStats();
});

// -------------------------LVL Sistem------------------------- //

// -------------------------Mobs------------------------- //
function Monster(maxHP, HP = maxHP) {
  this.maxHP = maxHP;
  this.HP = HP;
}
let Javali = new Monster(200);
console.log(Javali.HP);

// -------------------------Health Bar------------------------- //

//Definir dano recebido
function damageDealt(atk, minAtk) {
  return Math.trunc(Math.random() * atk) + minAtk;
}

//Define a porcentagem maxima do HP depois do dano
function definePercentages(maxhp, curHP = maxhp) {
  return `${(curHP * 100) / maxhp}%`;
}

//Muda os valores na barra de acordo com a porcentagem e o dano
function updateProgressBar(pbar, hp, percentage) {
  pbar.querySelector(".progress__fill").style.width = percentage;
  pbar.querySelector(".progress__text").textContent = hp;
}
function updateProgressBarPlayer(pbar, hp, maxHp, percentage) {
  pbar.querySelector(".progress__fill__player").style.width = percentage;
  pbar.querySelector(".progress__text__player").textContent = `${hp}/${maxHp}`;
}

//PERCENT MOB
let percentMob = definePercentages(Javali.maxHP, Javali.HP);
console.log(percentMob);
updateProgressBar(pBar01, Javali.HP, percentMob);

//PERCENT PLAYER
let percentPlayer = definePercentages(warrior.maxHP, warrior.HP);
console.log(percentPlayer);
updateProgressBarPlayer(playerBar, warrior.HP, warrior.maxHP, percentPlayer);

// -------------------------Attacks------------------------- //

swordAttack.addEventListener("click", function () {
  //
  Javali.HP = Javali.HP - damageDealt(warrior.maxAtk, warrior.minAtk);
  console.log(Javali.HP);
  //
  percentMob = definePercentages(Javali.maxHP, Javali.HP);
  //
  updateProgressBar(pBar01, Javali.HP, percentMob);
});

///////////

//
//
//
//
// LOOP With timeout for sprite animation Test
// var i = 0; //  set your counter to 1
// function myLoop() {
//   //  create a loop function
//   setTimeout(function () {
//     //  call a 3s setTimeout when the loop is called
//     document.querySelector(".sprite").src = `Test/sprite attack/${i}.png`; //  your code here
//     i++; //  increment the counter
//     if (i <= 4) {
//       //  if the counter < 10, call the loop function
//       myLoop(); //  ..  again which will trigger another
//     } //  ..  setTimeout()
//   }, 70);
// }
