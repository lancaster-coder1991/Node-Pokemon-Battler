function Pokemon(name, hitPoints, attackDamage, soundItMakes, move, type = 'normal') {
    this.name = name;
    this.hitPoints = hitPoints;
    this.attackDamage = attackDamage;
    this.soundItMakes = soundItMakes;
    this.type = type;
    this.move = move;
    /* this.weakness = function() {
        switch(type) {
            case 'normal':
                return 'none';
            case 'Water':
                return 'Grass';
            case 'Fire':
                return 'Water';
            case 'Grass':
                return 'Fire';             
        };
    }; */
};



Pokemon.prototype.talk = function() {
    return this.soundItMakes;
}

Pokemon.prototype.useYourMove = function() {
    return this.move;
}

module.exports = Pokemon;