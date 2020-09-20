//Constructors
class Pokemon {
  constructor(name, hitPoints, moves, type) {
    this.hitPoints = hitPoints;
    this.name = name;
    this.type = type;
    this.moves = moves;
    this.weakness = this.weakness();
  }

  // Pokemon Methods

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

class Move {
  constructor(name, type, damage, weakness) {
    this.name = name;
    this.type = type;
    this.damage = damage;
    this.weakness = weakness;
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
    this.trainerTurn = this.trainers.one;
    this.notTurn = this.pokemons.two;
    this.notTrainerTurn = this.trainers.two;
    this.winner = 0;
  }

  fight(attacker, defender, move) {
    if (this.turn.hitPoints <= 0) {
      this.changeTurn(this.turn, this.notTurn);
      return console.log(
        `${this.notTrainerTurn.name} tried to attack with a fainted Pokemon - nothing happens! It is now ${this.trainerTurn.name}'s turn.`
      );
    }
    if (this.winner !== 0) {
      return console.log(
        `Match is finished, the winner is ${this.winner.name}`
      );
    }

    // The move is weak against defender
    if (move.type === defender.type || move.weakness === defender.type) {
      defender.hitPoints -= (move.damage * 0.75).toFixed(0);
      //Attack = weak message
      this.messages("weakMessage", null, move);

      // The move is strong against defender
    } else if (move.type === defender.weakness) {
      defender.hitPoints -= (move.damage * 1.25).toFixed(0);
      //Attack = strong message
      this.messages("strongMessage", null, move);
    } else {
      // The defender is normal against attacker
      defender.hitPoints -= move.damage;
      //Attack = normal message
      this.messages("normalMessage", null, move);
    }
    // Change turn
    this.changeTurn(attacker, defender);
    // Game Over
    if (
      this.trainerTurn.team.filter((x) => {
        return x.hitPoints > 0;
      }).length === 0
    ) {
      this.winner = this.notTrainerTurn;
      console.log(`Match is finished, the winner is ${this.winner.name}!`);
    }
  }

  changeTurn(currentTurn, nextTurn) {
    if (this.trainerTurn === this.trainers.one) {
      this.trainerTurn = this.trainers.two;
      this.notTrainerTurn = this.trainers.one;
    } else {
      this.trainerTurn = this.trainers.one;
      this.notTrainerTurn = this.trainers.two;
    }
    this.turn = nextTurn;
    this.notTurn = currentTurn;
  }

  messages(msg, switchedPokemon, move) {
    if (msg === "strongMessage") {
      console.log(
        `${this.turn.name} used ${
          move.name
        } - it's super effective!\nIt deals >${(move.damage * 1.25).toFixed(
          0
        )}< damage.\n${this.notTurn.name} has >${
          this.notTurn.hitPoints
        }< hit points left.\nIt is ${this.notTrainerTurn.name}'s turn next.`
      );
    }
    if (msg === "weakMessage") {
      console.log(
        `${this.turn.name} used ${
          move.name
        } - it's not very effective...\nIt deals >${(
          move.damage * 0.75
        ).toFixed(0)}< damage.\n${this.notTurn.name} has >${
          this.notTurn.hitPoints
        }< hit points left.\nIt is ${this.notTrainerTurn.name}'s turn next.`
      );
    }
    if (msg === "normalMessage") {
      console.log(
        `${this.turn.name} used ${move.name}\nIt deals >${move.damage}< damage.\n${this.notTurn.name} has >${this.notTurn.hitPoints}< hit points left.\nIt is ${this.notTrainerTurn.name}'s turn next.`
      );
    }
    if (msg === "switchTurn") {
      console.log(`
      ${this.notTrainerTurn.name} changed Pokemon to ${switchedPokemon}! Now it's ${this.trainerTurn.name}'s turn!`);
    }
  }

  run(trainerTurn, winner) {
    this.winner = winner.name;
    console.log(`${trainerTurn.name} ran! ${winner.name} wins!`);
  }

  switchPokemon(switchedPokemon) {
    //Switch the current player's Pokemon
    if (this.trainerTurn === this.trainers.one) {
      this.turn = this.trainers.one.team.find(
        (x) => x.name === switchedPokemon
      );
    } else {
      this.turn = this.trainers.two.team.find(
        (x) => x.name === switchedPokemon
      );
    }
    //Change turns
    this.changeTurn(this.turn, this.notTurn);
  }

  rename(pokemon) {
    if (pokemon.hitPoints <= 0 && !/\(Fainted\)$/.test(pokemon.name)) {
      pokemon.name = `${pokemon.name} - (Fainted)`;
    }
  }
}

const moves = {
  watergun: new Move("Water Gun", "water", 30, "grass"),
  bubblebeam: new Move("Bubblebeam", "water", 35, "grass"),
  ember: new Move("Ember", "fire", 25, "water"),
  flamethrower: new Move("Flamethrower", "fire", 40, "water"),
  vinewhip: new Move("Vine Whip", "grass", 30, "fire"),
  razorleaf: new Move("Razor Leaf", "grass", 40, "fire"),
  tackle: new Move("Tackle", "normal", 25, "none"),
  megapunch: new Move("Mega Punch", "normal", 40, "none"),
};

const pokemons = {
  vaporeon: new Pokemon(
    "Vaporean",
    120,
    [moves.watergun, moves.bubblebeam, moves.tackle],
    "water"
  ),
  bulbasaur: new Pokemon(
    "Bulbasaur",
    140,
    [moves.vinewhip, moves.razorleaf, moves.tackle],
    "grass"
  ),
  squirtle: new Pokemon(
    "Squirtle",
    140,
    [moves.watergun, moves.bubblebeam, moves.tackle],
    "water"
  ),
  charmander: new Pokemon(
    "Charmander",
    140,
    [moves.ember, moves.flamethrower, moves.megapunch],
    "fire"
  ),
  magmar: new Pokemon(
    "Magmar",
    125,
    [moves.ember, moves.flamethrower, moves.megapunch],
    "fire"
  ),
  victreebell: new Pokemon(
    "Victreebell",
    160,
    [moves.vinewhip, moves.razorleaf, moves.megapunch],
    "grass"
  ),
};

const trainers = {
  one: new Trainer("Player 1"),
  two: new Trainer("Player 2"),
};

const teams = {
  starters: [pokemons.bulbasaur, pokemons.squirtle, pokemons.charmander],
  advanced: [pokemons.vaporeon, pokemons.magmar, pokemons.victreebell],
};

module.exports = { Pokemon, Battle, pokemons, trainers, teams };
