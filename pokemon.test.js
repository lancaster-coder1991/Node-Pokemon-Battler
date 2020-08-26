const { Pokemon, Trainer } = require("./pokemon");

describe("Pokemon", () => {
  describe("Properties", () => {
    it("should have a name property", () => {
      const newPokemon = new Pokemon("Riccardo");
      expect(newPokemon.name).toBe("Riccardo");
    });
    it("should have a hitPoints property", () => {
      const newPokemon = new Pokemon("Pikachu", 100);
      expect(newPokemon.hitPoints).toBe(100);
    });
    it("should have an attackDamage property", () => {
      const newPokemon = new Pokemon("Pikachu", 100, 20);
      expect(newPokemon.attackDamage).toBe(20);
    });
    it("should have an soundItMakes property", () => {
      const newPokemon = new Pokemon("Pikachu", 100, 20, "pika");
      expect(newPokemon.soundItMakes).toBe("pika");
    });
    it("should have a type property that defaults to normal", () => {
      const newPokemon = new Pokemon("Pikachu", 100, 20, "pika");
      expect(newPokemon.type).toBe("normal");
      newPokemon.type = "Water";
      expect(newPokemon.type).toBe("Water");
    });
    it("should have a move property", () => {
      const newPokemon = new Pokemon(
        "Pikachu",
        100,
        20,
        "pika",
        "thundershock"
      );
      expect(newPokemon.move).toBe("thundershock");
    });
  });
  describe("Methods", () => {
    it("should have talk method that returns its sound", () => {
      const pikachu = new Pokemon("Pikachu", 100, 20, "pika");
      expect(pikachu.talk()).toBe("pika");
    });
    it("should have useYourMove method that should return its primary move", () => {
      const pikachu = new Pokemon("Pikachu", 100, 20, "pika", "thundershock");
      expect(pikachu.useYourMove()).toBe("thundershock");
    });
  });
});

describe("Trainer", () => {
  describe("Properties", () => {
    it("should have a name property", () => {
      let george = new Trainer("George");
      expect(george.name).toBe("George");
    });
    it("should have a pokemon property", () => {
      let george = new Trainer("George");
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