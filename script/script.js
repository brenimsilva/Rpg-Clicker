"use strict";
// Define Variables
const mobBar = document.querySelector(".progress__mob");
const playerBar = document.querySelector(".progress__player");
const expBar = document.querySelector(".exp");
const monsterSprite = document.querySelector(".monster");
const iconsSession = document.querySelector(".icons");
const swordAttack = document.querySelector(".sword");

// Stats and Attributes Variables;
const heroLvl = document.getElementById("lvl");
const statSTR = document.getElementById("STR");
const statDEX = document.getElementById("DEX");
const statAGI = document.getElementById("AGI");
const statVIT = document.getElementById("VIT");
const statINT = document.getElementById("INT");
const statHP = document.getElementById("HP");
const statSP = document.getElementById("SP");
const statATK = document.getElementById("ATK");
const statDEF = document.getElementById("DEF");
const statMAG = document.getElementById("MAG");
const statACC = document.getElementById("ACC");
const statSPD = document.getElementById("SPD");
const atributePoints = document.getElementById("attribute-points");

// Points in Stats
const arrowGeneral = document.querySelector(".arrow");
const arrowSTR = document.querySelector(".arrow-STR");
const arrowDEX = document.querySelector(".arrow-DEX");
const arrowAGI = document.querySelector(".arrow-AGI");
const arrowVIT = document.querySelector(".arrow-VIT");
const arrowINT = document.querySelector(".arrow-INT");

// Functions
// Respawn monster
const respawn = (monster) => {
  //Recharge HP
  monster.HP = monster.maxHP;
  //Update HP Bar number and fill stats
  updateMobHpBar(
    mobBar,
    monster.maxHP,
    definePercentages(monster.maxHP, monster.HP)
  );
};

let isDead = false;
// Calc exp to next Lvl and put it on screen
const calcExp = () => {};
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
  expNextLevel,
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
  this.expNextLevel = expNextLevel;
  this.LVL = LVL;
  this.MAG = 0;
  this.DEF = 0;
  this.ACC = 0;
  this.SPD = 0;
  this.minAtk = 0;
  this.maxAtk = 0;
}

//Creating a warrior
const warrior = new heroes(
  "Heroe",
  "Warrior",
  50,
  50,
  0,
  0,
  3,
  2,
  1,
  2,
  1,
  0,
  0,
  20,
  1
);

console.log(warrior);
// -------------------------Atribute------------------------- //

// function selectAtribute(atribute) {
//   return document.getElementById(atribute);
// }

// Showing hero Stats in HTML (.hero-stats class)
function writeStats() {
  //Stats Initialization
  statSTR.textContent = warrior.STR;
  statDEX.textContent = warrior.DEX;
  statAGI.textContent = warrior.AGI;
  statVIT.textContent = warrior.VIT;
  statINT.textContent = warrior.INT;

  //Atribute initialization
  statHP.textContent = `${warrior.HP}/${warrior.maxHP}`;
  statSP.textContent = `${warrior.SP}/${warrior.maxSP}`;
  statATK.textContent = `${warrior.minAtk} - ${warrior.maxAtk}`;
  statMAG.textContent = warrior.MAG;
  statDEF.textContent = warrior.DEF;
  statACC.textContent = warrior.ACC;
  statSPD.textContent = warrior.SPD;
}

//Do the math for Attributes based on Hero Stats Points.
function defineAtributes(heroe) {
  heroe.minAtk = Math.round(heroe.STR * 0.3);
  heroe.maxAtk = Math.round(heroe.STR * 1.1);
  heroe.maxHP = Math.round(heroe.STR * 1.2) + heroe.VIT * 5 + 50;
  heroe.ACC = heroe.DEX * 5;
  heroe.DEF = heroe.DEX * 2 + heroe.VIT * 2;
  heroe.MAG = heroe.INT * 4;
  heroe.SPD = heroe.AGI * 3;
  heroe.maxSP = heroe.INT * 5;
  writeStats();
}

//Initializing Stats
// CORRIGIR
defineAtributes(warrior);
warrior.HP = warrior.maxHP;
warrior.SP = warrior.maxSP;
defineAtributes(warrior);

// -------------------------Upgrade Stats------------------------- //

function upgradeStats(stat) {
  document.getElementById(stat);
  warrior[stat]++;
  warrior.atributePoints--;
  atributePoints.textContent = warrior.atributePoints;
  defineAtributes(warrior);
  updateProgressBarPlayer(
    playerBar,
    warrior.HP,
    warrior.maxHP,
    definePercentages(warrior.maxHP, warrior.HP)
  );
}

//Buton STR
arrowSTR.addEventListener("click", function () {
  if (warrior.atributePoints > 0) {
    upgradeStats("STR");
  }
});

//Button DEX
arrowDEX.addEventListener("click", function () {
  if (warrior.atributePoints > 0) {
    upgradeStats("DEX");
  }
});

//Button AGI
arrowAGI.addEventListener("click", function () {
  if (warrior.atributePoints > 0) {
    upgradeStats("AGI");
  }
});

//Button VIT
arrowVIT.addEventListener("click", function () {
  if (warrior.atributePoints > 0) {
    upgradeStats("VIT");
  }
});

//Button INT
arrowINT.addEventListener("click", function () {
  if (warrior.atributePoints > 0) {
    upgradeStats("INT");
  }
});

// -------------------------LVL Sistem------------------------- //

// -------------------------Mobs------------------------- //
function Monster(EXP, maxHP, HP = maxHP) {
  this.maxHP = maxHP;
  this.HP = HP;
  this.EXP = EXP;
}
const Javali = new Monster(5, 20);
console.log(Javali.HP);

// -------------------------Health Bar------------------------- //

//Definir dano recebido
function damageDealt(atk, minAtk) {
  return Math.trunc(Math.random() * atk) + minAtk;
}

//Define a porcentagem maxima do HP depois do dano
function definePercentages(higherValue, lowerValue = higherValue) {
  return `${(lowerValue * 100) / higherValue}%`;
}

//Muda os valores na barra de acordo com a porcentagem e o dano
function updateMobHpBar(pbar, hp, percentage) {
  pbar.querySelector(".progress__fill").style.width = percentage;
  pbar.querySelector(".progress__text").textContent = hp;
}
function updateProgressBarPlayer(pbar, hp, maxHp, percentage) {
  pbar.querySelector(".progress__fill__player").style.width = percentage;
  pbar.querySelector(".progress__text__player").textContent = `${hp}/${maxHp}`;
}
// ------------------------- EXP BAR -------------------------- //
//Update Level and Exp Bar

warrior.atributePoints = (warrior.LVL - 1) * 5;

function updateExpBar(bar) {
  if (warrior.EXP >= warrior.expNextLevel) {
    warrior.LVL += 1;
    warrior.atributePoints += 5;
    atributePoints.textContent = warrior.atributePoints;
    warrior.EXP = warrior.EXP - warrior.expNextLevel; // Corrigir
    warrior.expNextLevel = Math.trunc(warrior.expNextLevel * 1.6);
    bar.querySelector(".exp-fill").style.width = definePercentages(
      warrior.expNextLevel,
      warrior.EXP
    );
    bar.querySelector(
      ".exp-text"
    ).textContent = `${warrior.EXP}/${warrior.expNextLevel}`;
    heroLvl.textContent = warrior.LVL;
  } else {
    bar.querySelector(".exp-fill").style.width = definePercentages(
      warrior.expNextLevel,
      warrior.EXP
    );
    bar.querySelector(
      ".exp-text"
    ).textContent = `${warrior.EXP}/${warrior.expNextLevel}`;
  }
}
////////////////////////
//PERCENT MOB
updateMobHpBar(mobBar, Javali.HP, definePercentages(Javali.maxHP, Javali.HP));
console.log(definePercentages(Javali.maxHP, Javali.HP));

//PERCENT PLAYER
updateProgressBarPlayer(
  playerBar,
  warrior.HP,
  warrior.maxHP,
  definePercentages(warrior.maxHP, warrior.HP)
);

updateExpBar(
  expBar,
  warrior.EXP,
  warrior.expNextLevel,
  warrior.LVL,
  definePercentages(warrior.expNextLevel, warrior.EXP)
);

// <-------------------------Attacks-------------------------> //

isDead = false;
//ATTACK MOB
document.querySelector(".sword-attack").addEventListener("click", function () {
  //Receive Damage
  Javali.HP = Javali.HP - damageDealt(warrior.maxAtk, warrior.minAtk);
  console.log(Javali.HP);
  //Check if mob is still alive
  if (Javali.HP > 0) {
    updateMobHpBar(
      mobBar,
      Javali.HP,
      definePercentages(Javali.maxHP, Javali.HP)
    );
  } else {
    //Corrigir nao pode bater depois que morrer
    //Give player EXP
    warrior.EXP += Javali.EXP;
    updateExpBar(expBar);
    //Javali.HP = Infinity;
    Javali.HP = 0;
    updateMobHpBar(
      mobBar,
      Javali.HP,
      definePercentages(Javali.maxHP, Javali.HP)
    );
    monsterSprite.classList.add("fade-out");

    respawn(Javali);
    setTimeout(() => {
      monsterSprite.classList.remove("fade-out");
    }, 500);
  }
});

//ATTACK PLAYER

//TEST SECTION
///////////

//
//
//
//
// LOOP With timeout for sprite animation Test
//  var i = 0; //  set your counter to 1
//  function myLoop() {
//    //  create a loop function
//    setTimeout(function () {
//      //  call a 3s setTimeout when the loop is called
//      document.querySelector(".sprite").src = `Test/sprite attack/${i}.png`; //  your code here
//      i++; //  increment the counter
//      if (i <= 4) {
//        //  if the counter < 10, call the loop function
//        myLoop(); //  ..  again which will trigger another
//      } //  ..  setTimeout()
//    }, 70);
//  }

// ENEMY STATS AFFECTED BY MAP LVL
//
