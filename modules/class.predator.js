var LivingCreature = require("./class.LivingCreature");
module.exports = class Predator extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 13;
        this.directions = [];
        this.acted = false;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];

        this.directionsM = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(num, direc, matrix) {
        this.getNewCoordinates();
        var found = [];
        for (var i in direc) {
            var x = direc[i][0];
            var y = direc[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }
    mul(matrix) {
        var newCell = random(this.chooseCell(0, this.directionsM, matrix));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = new Predator(newX, newY, 3);
            Predator.born++;
            Predator.current++;
        }
    }
    move(matrix) {
        if (this.acted == false) {
        var newCell = random(this.chooseCell(0, this.directionsM, matrix));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;
                this.acted = true;
            }
        }
        else
        {
            this.acted == false;
        }
        this.energy--;
    }
    eat(matrix) {
        if (this.acted == false) {
            var datark = this.chooseCell(2, this.directionsM, matrix);
            var newCell = random(datark);
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX].die(matrix);
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;
                this.energy++;
                if (this.energy >= 12) {
                    this.mul(matrix);
                    this.energy = 5;
                }
                this.acted = true;
            }
            else {
                this.move(matrix);
                this.acted = true;
            }
            if (this.energy <= 0) {
                this.die(matrix);
            }
        }
        else{
            this.acted = false;
        }
    }
    die(matrix) {
        matrix[this.y][this.x] = 0;
        Predator.dead++;
        Predator.current--;
    }
}
function random(items){
    return items[Math.floor(Math.random() * items.length)];
}