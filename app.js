var Grass = require("./modules/class.grass.js");
var GrassEater = require("./modules/class.grasseater");
var Predator = require("./modules/class.predator");
var t=0;
Grass.born = 800;
Grass.dead = 0;
Grass.current = 0;
GrassEater.born = 300;
GrassEater.dead = 0;
GrassEater.current = 0;
Predator.born = 100;
Predator.dead = 0;
Predator.current = 0;
var express = require('express');
var fs = require("fs");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("./public"));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
server.listen(3004);
io.on('connection', function (socket) {
	socket.emit("send matrix", matrix);

	setInterval(function(){  
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x].index == 1) {
                    
                        if (t < 20)
                        {
                            matrix[y][x].mul(matrix);                    
                        }
                        if(t == 40)
                        {
                            t = 0;
                        }
                }
                else if (matrix[y][x].index == 2) {
                    if (t < 20)
                    {
                        matrix[y][x].eat(matrix, false);
                    }
                    else if (t >= 20)
                    {
                        matrix[y][x].eat(matrix, true);
                        if(t == 40)
                        {
                            t = 0;
                        }
                    }
                    
                }
                else if (matrix[y][x].index == 3) {

                    if(t < 20)
                    {    
                        matrix[y][x].eat(matrix);
                    }
                    else if(t >= 20)
                    {
                        matrix[y][x].eat(matrix);
                        if(t == 40)
                        {
                            t = 0;
                        }
                    }
                }
                else if (matrix[y][x].index == 4) {
                    if (t < 20)
                    {                   
                        matrix[y][x].move(matrix);
                    }
                    if(t == 40)
                    {
                        t = 0;
                    }
                }
                else if (matrix[y][x].index == 5) {
                    matrix[y][x].destroy(matrix);
                }
            }
        }
        socket.emit("redraw", matrix);
        socket.emit("t", t);
        t += 50;
    }, time);
    setInterval(function () {
        stat = {
            "Grass": {
                "born": Grass.born,
                "dead": Grass.dead,
                "current": Grass.current
            },
            "GrassEater": {
                "born": GrassEater.born,
                "dead": GrassEater.dead,
                "current": GrassEater.current
            },
            "Predator": {
                "born": Predator.born,
                "dead": Predator.dead,
                "current": Predator.current
            }
            };
        var myJSON = JSON.stringify(stat);
        fs.writeFileSync("statistics.json", myJSON);
        socket.emit("stats", stat);
    }, 1000);
});
var time = frameRate(5);
function frameRate(frameCount)
{
    return 1000 / frameCount;
}
var matrix = require("./modules/matrix.js");
var stat = {
	"Grass": {
		"born": 800,
		"dead": 0,
		"current": 0
	},
	"GrassEater": {
		"born": 300,
		"dead": 0,
		"current": 0
	},
	"Predator": {
		"born": 100,
		"dead": 0,
		"current": 0
	}
};
module.exports = stat;