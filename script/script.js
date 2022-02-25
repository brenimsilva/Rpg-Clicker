"use strict";

// Objects definition
function heroes(
  nameHero,
  classHero,
  HP,
  SP,
  STR,
  DEX,
  VIT,
  INT,
  atributePoints
) {
  this.nameHero = nameHero;
  this.classHero = classHero;
  this.HP = HP;
  this.SP = SP;
  this.STR = STR;
  this.DEX = DEX;
  this.VIT = VIT;
  this.INT = INT;
  this.atributePoints = atributePoints;
}
const hpWarrior = 50;
const hpSorcerer = 35;
const warrior = new heroes("Breno", "Warrior", hpWarrior, 0, 3, 2, 2, 1, 0);

// Mobs
function Monster(maxHP, HP = maxHP) {
  this.maxHP = maxHP;
  this.HP = HP;
}
let Javali = new Monster(200);
console.log(Javali.HP);

////////////// Health Bar/////////////////
const pBar01 = document.querySelector(".progress__mob");

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

let percent = definePercentages(Javali.maxHP, Javali.HP);
updateProgressBar(pBar01, Javali.HP, percent);
document.querySelector("#sword").addEventListener("click", function () {
  //
  Javali.HP = Javali.HP - damageDealt(20, 5);
  console.log(Javali.HP);
  //
  let percent = definePercentages(Javali.maxHP, Javali.HP);
  console.log(percent);
  //
  updateProgressBar(pBar01, Javali.HP, percent);
});

//////////////popup

function togglePopup() {
  document.getElementById("popup-1").classList.toggle("active");
}
