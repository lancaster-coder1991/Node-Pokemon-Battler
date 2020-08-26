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
  let attacker;
  let defender;
  // Assign attacker and defender
  if (this.turn === this.pokemons.one) {
    attacker = this.pokemons.one;
    defender = this.pokemons.two;
  } else {
    attacker = this.pokemons.two;
    defender = this.pokemons.one;
  }
  // Change turn
  this.turn = defender;
  // The attacker is weak against defender
  if (attacker.weakness === defender.type) {
    defender.hitPoints -= (attacker.attackDamage * 0.75).toFixed(0);

    // The defender is weak against attacker
  } else if (defender.weakness === attacker.type) {
    defender.hitPoints -= (attacker.attackDamage * 1.25).toFixed(0);
  } else {
    // The defender is normal against attacker
    defender.hitPoints -= attacker.attackDamage;
  }
  console.log(
    `This turn ${attacker.name} attacked, now it is ${defender.name} turn!`
  );
  console.log(
    `At the end of this turn ${defender.name} has ${defender.hitPoints} `
  );
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
