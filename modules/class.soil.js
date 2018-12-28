var Grass = require("./class.Grass");
module.exports = class Soil {
    constructor(index) {
        this.x = 0;
        this.y = 0;
        this.index = index;
        this.d = "down";
        this.acted = false;

    }
  move(matrix) {
        if (this.acted == false) {
            var naxkinX = this.x;
            var naxkinY = this.y;
            

            if (this.y == 0 && this.x == 0) {
                this.d = "down";
           
            }
            else if (this.y == matrix.length - 1 && this.x == 0) {
                this.d = "right";
            }
            else if (this.x == matrix[0].length - 1 && this.y == matrix.length - 1) {
                this.d = "up";
            }
            else if (this.x == matrix[0].length - 1 && this.y == 0) {
                this.d = "left";
            }
           

            if (this.d == "down") {
                this.y++;
               

            }
            else if (this.d == "up") {
                this.y--;
            }
            else if (this.d == "right") {
                this.x++;
            }
            else if (this.d == "left") {
                this.x--;
            }
            matrix[this.y][this.x] = matrix[naxkinY][naxkinX];
            matrix[naxkinY][naxkinX] = new Grass(naxkinX, naxkinY, 1);
            this.acted = true;

        }
        else
        {
            this.acted == false;
        }
    }

}
