var game = {
    score: 0,
    hp: 3,
    car: null,
    bombs: [],
    scores: [],
    nextBomb: 1,
    nextScore: 1,
    initialScores: 5,
    initialBombs: 3,
    generateBombs: function () {
        for (i = 0; i < this.initialBombs; i++) {
            this.generateBomb();
        }
    },
    generateScores: function () {
        for (i = 0; i < this.initialScores; i++) {
            this.generateScore();
        }
    },
    drawScore: function () {
        document.getElementById('score').innerHTML = this.score;
    },
    drawHp: function () {
        document.getElementById('hp').innerHTML = this.hp;

        if (this.hp === 0) {
            document.getElementById('hp').parentElement.classList.remove('btn-success');
            document.getElementById('hp').parentElement.classList.add('btn-danger');
        }
    },
    calculateCollides: function () {
        this.calculateBombCollide();
        this.calculateScoreCollide();
    },
    calculateBombCollide: function () {
        var car = this.car;
        var existingBombs = this.bombs.length;
        this.bombs = this.bombs.filter(function (bomb) {
            if (car.collide(bomb)) {
                bomb.destroyBomb();
                return false;
            }

            return true;
        });

        this.hp -= (existingBombs - this.bombs.length);
        this.drawHp();
    },
    calculateScoreCollide: function () {
        var car = this.car;
        var existingScore = this.scores.length;
        this.scores = this.scores.filter(function (score) {
            if (car.collide(score)) {
                score.destroyScore();
                return false;
            }

            return true;
        });

        this.score += (existingScore - this.scores.length);
        this.drawScore();
    },
    moveLeft: function () {
        if (this.hp > 0) {
            this.car.x = Math.max(0, this.car.x - 15);
            this.car.updatePosition();
            this.calculateCollides();
        }
    },
    moveUp: function () {
        if (this.hp > 0) {
            this.car.y = Math.max(0, this.car.y - 15);
            this.car.updatePosition();
            this.calculateCollides();
        }
    },
    moveDown: function () {
        if (this.hp > 0) {
            this.car.y = Math.min(300 - this.car.height, this.car.y + 15);
            this.car.updatePosition();
            this.calculateCollides();
        }
    },
    moveRight: function () {
        if (this.hp > 0) {
            this.car.x = Math.min(300 - this.car.width, this.car.x + 15);
            this.car.updatePosition();
            this.calculateCollides();
        }
    },
    generateCar: function () {
        this.car = {
            width: 36,
            height: 36,
            x: 150,
            y: 150,
            drawCar: function () {
                document.getElementById('game').insertAdjacentHTML('beforeend', '<div class="car"><i class="fas fa-car"></i></div>');
                this.updatePosition();
            },
            updatePosition: function () {
                document.querySelector('#game .car').style.top = this.y + 'px';
                document.querySelector('#game .car').style.left = this.x + 'px';
            },
            collide: function (object) {
                var centerX = object.x + object.width / 2;
                var centerY = object.y + object.height / 2;
                return (centerX > this.x) && (centerX < this.x + this.width) && (centerY > this.y) && (centerY < this.y + this.height);
            }
        };

        this.car.drawCar();
    },
    generateBomb: function () {
        var bombId = 'bomb-' + this.nextBomb;
        this.nextBomb++;
        var bomb = {
            width: 28,
            height: 28,
            x: 0,
            y: 0,
            id: bombId,
            drawBomb: function () {
                document.getElementById('game').insertAdjacentHTML('beforeend', '<div id="' + this.id + '" class="bomb"><i class="fas fa-bomb"></i></div>');
                this.x = Math.max(0, Math.random() * 300 - this.width);
                this.y = Math.max(0, Math.random() * 300 - this.height);
                this.updatePosition();
            },
            destroyBomb: function () {
                document.querySelector('#' + this.id).outerHTML = '';
            },
            updatePosition: function () {
                document.querySelector('#' + this.id).style.top = this.y + 'px';
                document.querySelector('#' + this.id).style.left = this.x + 'px';
            },
        };

        bomb.drawBomb();
        this.bombs.push(bomb);
    },
    generateScore: function () {
        var scoreId = 'score-' + this.nextScore;
        this.nextScore++;
        var score = {
            width: 28,
            height: 28,
            x: 0,
            y: 0,
            id: scoreId,
            drawScore: function () {
                document.getElementById('game').insertAdjacentHTML('beforeend', '<div id="' + this.id + '" class="score"><i class="fas fa-star"></i></div>');
                this.x = Math.max(0, Math.random() * 300 - this.width);
                this.y = Math.max(0, Math.random() * 300 - this.height);
                this.updatePosition();
            },
            destroyScore: function () {
                document.querySelector('#' + this.id).outerHTML = '';
            },
            updatePosition: function () {
                document.querySelector('#' + this.id).style.top = this.y + 'px';
                document.querySelector('#' + this.id).style.left = this.x + 'px';
            },
        };

        score.drawScore();
        this.scores.push(score);
    },
};

var button = document.querySelector(".button-left")
button.addEventListener('click', function (){game.moveLeft()})

game.drawScore();
game.drawHp();

game.generateCar();
game.generateBombs();
game.generateScores();

setInterval(function () {
    if (game.bombs.length < 3) {
        game.generateBomb();
    }
}, 2250);

setInterval(function () {
    if (game.scores.length < 6) {
        game.generateScore();
    }
}, 1500);

document.onkeydown = function (e) {
    console.log(e);
    e = e || window.event;
    switch (e.which || e.keyCode) {
        case 37:
            game.moveLeft();
            break;
        case 38:
            game.moveUp();
            break;
        case 39:
            game.moveRight();
            break;
        case 40:
            game.moveDown();
            break;
    }
}
