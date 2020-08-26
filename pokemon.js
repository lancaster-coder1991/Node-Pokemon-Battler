//Constructors
function Pokemon(
  name,
  hitPoints,
  attackDamage,
  soundItMakes,
  move,
  type = "normal"
) {
  this.name = name;
  this.hitPoints = hitPoints;
  this.attackDamage = attackDamage;
  this.soundItMakes = soundItMakes;
  this.type = type;
  this.move = move;
  this.weakness = this.weakness();
}

function Trainer(name) {
  this.name = name;
  this.team = [];
}

// Pokemon Methods
Pokemon.prototype.talk = function () {
  return this.soundItMakes;
};

Pokemon.prototype.weakness = function () {
  switch (this.type) {
    case "normal":
      return "none";
    case "Water":
      return "Grass";
    case "Fire":
      return "Water";
    case "Grass":
      return "Fire";
  }
};

Pokemon.prototype.useYourMove = function () {
  return this.move;
};

// Trainer Methods
Trainer.prototype.catch = function (pokemon) {
  this.team.push(pokemon);
};

module.exports = { Pokemon, Trainer };
