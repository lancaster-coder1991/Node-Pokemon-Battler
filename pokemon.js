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

function Battle(trainer1, pokemon1, trainer2, pokemon2) {
  this.trainers = {
    one: trainer1,
    two: trainer2,
  };
  this.pokemons = {
    one: pokemon1,
    two: pokemon2,
  };
  this.turn = pokemon1;
}

Battle.prototype.fight = function () {
  let pokemon = this.turn;
  if (pokemon === this.pokemons.one) {
    const attack1 = this.pokemons.one.attackDamage;
    this.pokemons.two.hitPoints -= attack1;
    this.turn = this.pokemons.two;
  } else {
    const attack2 = this.pokemons.two.attackDamage;
    this.pokemons.one.hitPoints -= attack2;
    this.turn = this.pokemons.one;
  }
};

// Pokemon Methods
Pokemon.prototype.talk = function () {
  return this.soundItMakes;
};

Pokemon.prototype.weakness = function () {
  switch (this.type) {
    case "normal":
      return "none";
    case "water":
      return "grass";
    case "fire":
      return "water";
    case "grass":
      return "fire";
  }
};

Pokemon.prototype.useYourMove = function () {
  return this.move;
};

// Trainer Methods
Trainer.prototype.catch = function (pokemon) {
  this.team.push(pokemon);
};

module.exports = { Pokemon, Trainer, Battle };
