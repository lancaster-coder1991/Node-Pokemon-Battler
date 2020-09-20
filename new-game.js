"use strict";

const inquirer = require("./lib/inquirer");
const { Pokemon, Battle, pokemons, trainers, teams } = require("./pokemon");

const questions = [
  {
    type: "input",
    name: "name1",
    message: "Player 1 - Choose a name",
  },
  {
    type: "list",
    name: "pokemon1",
    message: "Player 1 - Pick a Pokemon Team",
    choices: Object.keys(teams),
  },
  {
    type: "input",
    name: "name2",
    message: "Player 2 - Choose a name",
  },
  {
    type: "list",
    name: "pokemon2",
    message: "Player 2 - Pick a Pokemon",
    choices: Object.keys(teams),
  },
];

//Player One name and picking Pokemon
inquirer.prompt(questions).then((answers) => {
  trainers.one.name = answers.name1;
  trainers.two.name = answers.name2;
  trainers.one.team = teams[answers.pokemon1];
  trainers.two.team = teams[answers.pokemon2];
  const battle = new Battle(trainers.one, trainers.two);
  console.log(
    `New battle started between ${trainers.one.name} and ${trainers.two.name}`
  );
  console.log(`${trainers.one.name} sent out ${trainers.one.team[0].name}!`);
  console.log(`${trainers.two.name} sent out ${trainers.two.team[0].name}!`);
  console.log(`It is ${trainers.one.name}'s turn with ${battle.turn.name}`);
  function actions() {
    battle.rename(battle.turn);
    if (battle.turn.hitPoints < 0) {
      console.log(
        `Your current Pokemon has fainted! Make sure you switch Pokemon!`
      );
    }
    const validateSwitch = (value) => {
      if (value === battle.turn.name) {
        return "This Pokemon is already selected or fainted! Please pick a different Pokemon!";
      } else {
        return true;
      }
    };
    const battleQ = [
      {
        type: "list",
        name: "action",
        message: `${battle.trainerTurn.name} - pick an action`,
        choices: [`Attack with ${battle.turn.name}`, "Run", "Switch Pokemon"],
      },
      {
        type: "input",
        name: "switch",
        message: `${battle.trainerTurn.name} - pick a pokemon. Your team is: ${battle.trainerTurn.team[0].name} (${battle.trainerTurn.team[0].hitPoints} hp), ${battle.trainerTurn.team[1].name} (${battle.trainerTurn.team[1].hitPoints} hp), and ${battle.trainerTurn.team[2].name} (${battle.trainerTurn.team[2].hitPoints} hp)`,
        when: function (answers) {
          return answers.action === "Switch Pokemon";
        },
        validate: validateSwitch,
      },
      {
        type: "list",
        name: "moveChoice",
        message: `${battle.trainerTurn.name} - pick a move.`,
        choices: battle.turn.moves,
        when: function (answers) {
          return answers.action === `Attack with ${battle.turn.name}`;
        },
        validate: validateSwitch,
      },
    ];
    inquirer.prompt(battleQ).then((answers) => {
      if (answers.action === `Attack with ${battle.turn.name}`) {
        const move = battle.turn.moves.find(
          (move) => move.name === answers.moveChoice
        );
        battle.fight(battle.turn, battle.notTurn, move);
        if (battle.winner === 0) {
          actions();
        }
      } else if (answers.action === "Run") {
        battle.run(battle.trainerTurn, battle.notTrainerTurn);
      } else if (answers.action === "Switch Pokemon") {
        battle.switchPokemon(answers.switch);
        battle.messages("switchTurn", answers.switch);
        actions();
      }
    });
  }
  actions();
});
