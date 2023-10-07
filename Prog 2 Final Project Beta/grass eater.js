class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 8;
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
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character);
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.energy = 8
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }

    eat() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        var giftCells = random(this.chooseCell(4));
        var holeCells = random(this.chooseCell(5));
        if (holeCells) {
            this.count++
            arr.push(holeCells)
            if (arr.length >= 2) {
                arr = []
                var newX1 = holeCells[0];
                var newY1 = holeCells[1];
                matrix[newY1][newX1] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0
                this.x = newX1
                this.y = newY1

                for (var j in hlArr) {
                    if (newX1 == hlArr[j].x && newY1 == hlArr[j].y) {
                        hlArr.splice(j, 1);
                        break;
                    }

                }
            }

            this.die()
        } else if (giftCells) {
            this.energy += 15
            var newX1 = giftCells[0];
            var newY1 = giftCells[1];
            matrix[newY1][newX1] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX1
            this.y = newY1
            for (var j in giftArr) {
                if (newX1 == giftArr[j].x && newY1 == giftArr[j].y) {
                    giftArr.splice(j, 1);
                    break;
                }

                if (this.energy >= 12) {
                    this.mul()
                }
                else {
                    this.move()
                }
            }
        } else if (newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 12) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}
