const inquirer = require("./lib/inquirer");
const { Pokemon, Trainer, Battle, pokemons, trainers } = require("./pokemon");

const questions = [
  {
    type: "list",
    name: "pokemon",
    message: "Pick a Pokeball",
    choices: ["Pikachu", "Bulbasaur", "Charmander", "Squirtle"],
  },
  {
    type: "input",
    name: "name",
    message: "Choose a name",
  },
];

const battleQ = [
  {
    type: "list",
    name: "turn",
    message: "Pick a action",
    choices: ["Attack", "Run", "Switch Pokemon"],
  },
];

inquirer.prompt(questions).then((answers) => {
  trainers.one = new Trainer(answers.name);
  trainers.one.catch(pokemons[answers.pokemon.toLowerCase()]);
  // Battle
  const battle = new Battle(trainers.one, trainers.two);
  console.log(
    `New battle started between ${trainers.one.name} and ${trainers.two.name}`
  );
  function actions() {
    inquirer.prompt(battleQ).then((answers) => {
      if (answers.turn === "Attack") {
        battle.fight();
        if (battle.winner === 0) {
          actions();
        }
      }
    });
  }
  actions();
});
