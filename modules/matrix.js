var Grass = require("./class.grass.js");
var GrassEater = require("./class.grasseater.js");
var Predator = require("./class.predator.js");
var Soil = require("./class.soil.js");
var xQanak = 800;
var xkQanak = 300;
var gQanak = 100;
var matrix = [];
for (var y = 0; y < 50; y++) {
    matrix[y] = [];
    for (var x = 0; x < 50; x++) {
        matrix[y][x] = 0;
    }
}
while (xQanak > 0) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
        matrix[y][x] = 1;
        xQanak--;
    }
}
while (xkQanak > 0) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
        matrix[y][x] = 2;
        xkQanak--;
    }
}
while (gQanak > 0) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
        matrix[y][x] = 3;
        gQanak--;
    }
}
matrix[0][0] = 4;
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            matrix[y][x] = new Grass(x, y, 1);
            Grass.current++;
        }
        else if (matrix[y][x] == 2) {
            matrix[y][x] = new GrassEater(x, y, 2);
            GrassEater.current++;
        }
        else if (matrix[y][x] == 3) {
            matrix[y][x] = new Predator(x, y, 3);
            Predator.current++;
        }
        else if (matrix[y][x] == 4) {
            matrix[y][x] = new Soil(4);
        }
    }
}
module.exports = matrix;