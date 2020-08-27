//Constructors
class Pokemon {
  constructor(
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

  // Pokemon Methods
  talk() {
    return this.soundItMakes;
  }

  weakness() {
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
  }

  useYourMove() {
    return this.move;
  }
}
class Trainer {
  constructor(name) {
    this.name = name;
    this.team = [];
  }
  // Trainer Methods
  catch(pokemon) {
    this.team.push(pokemon);
  }
}
class Battle {
  constructor(trainer1, pokemon1, trainer2, pokemon2) {
    this.trainers = {
      one: trainer1,
      two: trainer2,
    };
    this.pokemons = {
      one: pokemon1,
      two: pokemon2,
    };
    this.turn = pokemon1;
    this.winner = 0;
  }

  fight() {
    let attacker;
    let defender;
    if (this.winner !== 0) {
      return console.log(
        `Match is finished, the winner is ${this.winner.name}`
      );
    }
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
      //Attack = weak message
      console.log(
        `${attacker.name} is weak against ${defender.name} and deals >${(
          attacker.attackDamage * 0.75
        ).toFixed(0)}< damage.\n${defender.name} has >${
          defender.hitPoints
        }< hit points left.\nIt is ${defender.name}'s turn next.`
      );
      // The defender is weak against attacker
    } else if (defender.weakness === attacker.type) {
      defender.hitPoints -= (attacker.attackDamage * 1.25).toFixed(0);
      //Attack = strong message
      console.log(
        `${attacker.name} is strong against ${defender.name} and deals >${(
          attacker.attackDamage * 1.25
        ).toFixed(0)}< damage.\n${defender.name} has >${
          defender.hitPoints
        }< hit points left.\nIt is ${defender.name}'s turn next.`
      );
    } else {
      // The defender is normal against attacker
      defender.hitPoints -= attacker.attackDamage;
      //Attack = normal message
      console.log(
        `${attacker.name} deals >${attacker.attackDamage}< damage.\n${defender.name} has >${defender.hitPoints}< hit points left.\nIt is ${defender.name}'s turn next.`
      );
    }
    if (defender.hitPoints <= 0) {
      this.winner = attacker;
      console.log(`Match is finished, the winner is ${this.winner.name}`);
    }
  }
}

module.exports = { Pokemon, Trainer, Battle };
