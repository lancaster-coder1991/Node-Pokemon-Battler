const { Pokemon, Trainer, Battle } = require("./pokemon");

describe("Game", () => {
  //Pokemon
  let pikachu;
  let bulbasaur;
  let squirtle;
  let charmander;
  //Trainers
  let george;
  let riccardo;
  //Battles
  let match;
  beforeEach(() => {
    pikachu = new Pokemon("Pikachu", 100, 20, "pika", "thundershock");
    bulbasaur = new Pokemon("Bulbasaur", 150, 30, "grrr", "tackle", "grass");
    squirtle = new Pokemon("Squirtle", 130, 25, "bark", "bubble", "water");
    charmander = new Pokemon("Charmander", 140, 15, "meow", "ember", "fire");
    george = new Trainer("George");
    riccardo = new Trainer("Riccardo");
    match = new Battle(george, charmander, riccardo, squirtle);
  });
  describe("Pokemon", () => {
    describe("Properties", () => {
      it("should have a name property", () => {
        expect(pikachu.name).toBe("Pikachu");
      });
      it("should have a hitPoints property", () => {
        expect(pikachu.hitPoints).toBe(100);
      });
      it("should have an attackDamage property", () => {
        expect(pikachu.attackDamage).toBe(20);
      });
      it("should have an soundItMakes property", () => {
        expect(pikachu.soundItMakes).toBe("pika");
      });
      it("should have a type property that defaults to normal", () => {
        expect(pikachu.type).toBe("normal");
        pikachu.type = "water";
        expect(pikachu.type).toBe("water");
      });
      it("should have a move property", () => {
        expect(pikachu.move).toBe("thundershock");
      });
    });
    describe("Methods", () => {
      it("should have talk method that returns its sound", () => {
        expect(pikachu.talk()).toBe("pika");
      });
      it("should have useYourMove method that should return its primary move", () => {
        expect(pikachu.useYourMove()).toBe("thundershock");
      });
    });
  });

  describe("Trainer", () => {
    describe("Properties", () => {
      it("should have a name property", () => {
        expect(george.name).toBe("George");
      });
      it("should have a pokemon property", () => {
        expect(george.team).toEqual([]);
      });
    });
    describe("Methods", () => {
      it("should have a catch method that adds pokemon to the team property", () => {
        const pikachu = new Pokemon("Pikachu", 100, 20, "pika");
        let riccardo = new Trainer("Riccardo");
        riccardo.catch(pikachu);
        expect(riccardo.team[0]).toBe(pikachu);
      });
    });
  });

  describe("Battle", () => {
    describe("Properties", () => {
      it("should have a property of 2 trainers", () => {
        expect(match.trainers).toEqual({ one: george, two: riccardo });
        expect(match.trainers.one.team).toBe(george.team);
      });
      it("should have a property of 2 pokemons", () => {
        expect(match.pokemons).toEqual({ one: charmander, two: squirtle });
        expect(match.pokemons.one).toBe(charmander);
      });
      it("should have a property of turn", () => {
        expect(match.turn).toEqual(charmander);
        match.fight();
        expect(match.turn).toEqual(squirtle);
      });
    });
    describe("Methods", () => {
      it("should have a fight method", () => {
        match.fight();
        expect(squirtle.hitPoints).toBe(119);
        expect(match.turn).toBe(squirtle);
      });
    });
  });
});

/*

1 check turn
2 check weak against
3 check strength
4 else normal
5 change turn


*/
