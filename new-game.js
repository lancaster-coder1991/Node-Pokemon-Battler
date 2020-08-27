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

inquirer.prompt(questions).then((answers) => {
  trainers.one = new Trainer(answers.name);
  trainers.one.catch(answers.pokemon);
  console.log(trainers.one);
  console.log(trainers.one.team);
  console.log("Pokemon picked");
  console.log(JSON.stringify(pokemons[answers.pokemon.toLowerCase()]));
  console.log(answers.name);
});
