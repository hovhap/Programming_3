var LivingCreature= require("./class.LivingCreature");
module.exports =class Destroyer extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index);

    }

    destroy(matrix) {
        for (var i = 0; i < matrix[0].length; i++) {
            if (matrix[this.y][i].index != 4) {
                matrix[this.y][i] = 0;
            }
        }
        for (var i = 0; i < matrix.length; i++) {
            if (matrix[i][this.x].index != 4) {
                matrix[i][this.x] = 0;
            }
        }
    }

}
