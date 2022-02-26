"use strict";

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
//Set Warrio Class Values
const warriorStats = ["Heroe", "Warrior", 50, 50, 0, 0, 3, 2, 1, 2, 1, 0, 0, 1];
const warrior = new heroes();
let index = 0;
for (let element in warrior) {
  warrior[element] = warriorStats[index];
  index++;
}
console.log(warrior);

// -------------------------Atribute------------------------- //

function selectAtribute(atribute) {
  return document.getElementById(atribute);
}

function defineAtributes(heroe) {
  const minAtk = Math.round(heroe.STR * 0.3);
  const maxAtk = Math.round(heroe.STR * 1.1);
  heroe.minAtk = minAtk;
  heroe.maxAtk = maxAtk;
  heroe.maxHP = Math.round(heroe.STR * 1.2) + heroe.VIT * 5 + warriorStats[2];
  heroe.ACC = heroe.DEX * 5;
  heroe.DEF = heroe.DEX * 2 + heroe.VIT * 2;
  heroe.MAG = heroe.INT * 4;
  heroe.SPD = heroe.AGI * 3;
  heroe.maxSP = heroe.INT * 5;
}

//Stats Initialization
document.getElementById("STR").textContent = warrior.STR;
document.getElementById("DEX").textContent = warrior.DEX;
document.getElementById("AGI").textContent = warrior.AGI;
document.getElementById("VIT").textContent = warrior.VIT;
document.getElementById("INT").textContent = warrior.INT;
defineAtributes(warrior);

//Atribute initialization
warrior.HP = warrior.maxHP;
warrior.SP = warrior.maxSP;
document.getElementById("HP").textContent = `${warrior.HP}/${warrior.maxHP}`;
document.getElementById("SP").textContent = `${warrior.SP}/${warrior.maxSP}`;
document.getElementById(
  "ATK"
).textContent = `${warrior.minAtk} - ${warrior.maxAtk}`;
document.getElementById("MAG").textContent = warrior.MAG;
document.getElementById("DEF").textContent = warrior.DEF;
document.getElementById("ACC").textContent = warrior.ACC;
document.getElementById("SPD").textContent = warrior.SPD;

// -------------------------Upgrade Stats------------------------- //

//Buton STR
document.querySelector(".arrow-str").addEventListener("click", function () {
  warrior.STR++;
  defineAtributes(warrior);
  document.getElementById("STR").textContent = warrior.STR;
  document.getElementById(
    "ATK"
  ).textContent = `${warrior.minAtk} - ${warrior.maxAtk}`;
  document.getElementById("HP").textContent = `${warrior.HP}/${warrior.maxHP}`;
  percentPlayer = definePercentages(warrior.maxHP, warrior.HP);
  updateProgressBarPlayer(playerBar, warrior.HP, warrior.maxHP, percentPlayer);
});

//Buton DEX
document.querySelector(".arrow-dex").addEventListener("click", function () {
  warrior.DEX++;
  defineAtributes(warrior);
  document.getElementById("DEX").textContent = warrior.DEX;
  document.getElementById("ACC").textContent = warrior.ACC;
  document.getElementById("DEF").textContent = warrior.DEF;
});

//Buton AGI
document.querySelector(".arrow-agi").addEventListener("click", function () {
  warrior.AGI++;
  defineAtributes(warrior);
  document.getElementById("AGI").textContent = warrior.AGI;
  document.getElementById("SPD").textContent = warrior.SPD;
});

//Buton VIT
document.querySelector(".arrow-vit").addEventListener("click", function () {
  warrior.VIT++;
  defineAtributes(warrior);
  document.getElementById("VIT").textContent = warrior.VIT;
  document.getElementById("HP").textContent = `${warrior.HP}/${warrior.maxHP}`;
  document.getElementById("DEF").textContent = warrior.DEF;
  percentPlayer = definePercentages(warrior.maxHP, warrior.HP);
  updateProgressBarPlayer(playerBar, warrior.HP, warrior.maxHP, percentPlayer);
});

//Buton INT
document.querySelector(".arrow-int").addEventListener("click", function () {
  warrior.INT++;
  defineAtributes(warrior);
  document.getElementById("INT").textContent = warrior.INT;
  document.getElementById("SP").textContent = `${warrior.SP}/${warrior.maxSP}`;
  document.getElementById("MAG").textContent = warrior.MAG;
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
const pBar01 = document.querySelector(".progress__mob");
const playerBar = document.querySelector(".progress__player");
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
document.querySelector("#sword").addEventListener("click", function () {
  //
  Javali.HP = Javali.HP - damageDealt(warrior.maxAtk, warrior.minAtk);
  console.log(Javali.HP);
  //
  percentMob = definePercentages(Javali.maxHP, Javali.HP);
  //
  updateProgressBar(pBar01, Javali.HP, percentMob);
});
