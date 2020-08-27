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
  constructor(trainer1, trainer2) {
    this.trainers = {
      one: trainer1,
      two: trainer2,
    };
    this.pokemons = {
      one: trainer1.team[0],
      two: trainer2.team[0],
    };
    this.turn = this.pokemons.one;
    this.notTurn = this.pokemons.two;
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

    // The attacker is weak against defender
    if (attacker.weakness === defender.type) {
      defender.hitPoints -= (attacker.attackDamage * 0.75).toFixed(0);
      //Attack = weak message

      this.messages("weakMessage");
      // The defender is weak against attacker
    } else if (defender.weakness === attacker.type) {
      defender.hitPoints -= (attacker.attackDamage * 1.25).toFixed(0);

      //Attack = strong message
      this.messages("strongMessage");
    } else {
      // The defender is normal against attacker
      defender.hitPoints -= attacker.attackDamage;
      //Attack = normal message
      this.messages("normalMessage");
    }
    // Change turn
    this.turn = defender;
    this.notTurn = attacker;
    // Game Over
    if (defender.hitPoints <= 0) {
      this.winner = attacker;
      console.log(`Match is finished, the winner is ${this.winner.name}`);
    }
  }

  messages(msg) {
    if (msg === "strongMessage") {
      console.log(
        `${this.turn.name} is strong against ${this.notTurn.name} and deals >${(
          this.turn.attackDamage * 1.25
        ).toFixed(0)}< damage.\n${this.notTurn.name} has >${
          this.notTurn.hitPoints
        }< hit points left.\nIt is ${this.notTurn.name}'s turn next.`
      );
    }
    if (msg === "weakMessage") {
      console.log(
        `${this.turn.name} is weak against ${this.notTurn.name} and deals >${(
          this.turn.attackDamage * 0.75
        ).toFixed(0)}< damage.\n${this.notTurn.name} has >${
          this.notTurn.hitPoints
        }< hit points left.\nIt is ${this.notTurn.name}'s turn next.`
      );
    }
    if (msg === "normalMessage") {
      console.log(
        `${this.turn.name} deals >${this.turn.attackDamage}< damage.\n${this.notTurn.name} has >${this.notTurn.hitPoints}< hit points left.\nIt is ${this.notTurn.name}'s turn next.`
      );
    }
  }
}

const pokemons = {
  pikachu: new Pokemon("Pikachu", 100, 20, "pika", "thundershock"),
  bulbasaur: new Pokemon("Bulbasaur", 150, 30, "grrr", "tackle", "grass"),
  squirtle: new Pokemon("Squirtle", 130, 25, "bark", "bubble", "water"),
  charmander: new Pokemon("Charmander", 140, 15, "meow", "ember", "fire"),
};

const trainers = {
  one: new Trainer("Player 1"),
  two: new Trainer("Blue"),
};
trainers.two.catch(pokemons.squirtle);

module.exports = { Pokemon, Trainer, Battle, pokemons, trainers };
