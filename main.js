class Knight {
    static move = (start, end) => {
        const queue = [start];
        const visited = [];

        const distance = new Array(8).fill(0).map(() => new Array(8).fill(-1));
        const path = new Array(8).fill(0).map(() => new Array(8).fill([]));

        distance[start[0]][start[1]] = 0;
        path[start[0]][start[1]] = [start];

        while (queue.length > 0) {
            const current = queue.shift();

            if (current[0] === end[0] && current[1] === end[1]) {
                return {
                    distance: distance[current[0]][current[1]],
                    path: path[current[0]][current[1]],
                };
            }

            visited.push(current);
            const moves = this.getMoves(current);

            for (let move of moves) {
                const newPos = [current[0] + move[0], current[1] + move[1]];

                if (this.isValid(newPos, visited)) {
                    queue.push(newPos);
                    distance[newPos[0]][newPos[1]] = distance[current[0]][current[1]] + 1;
                    path[newPos[0]][newPos[1]] = path[current[0]][current[1]].concat([newPos]);
                }
            }
        }
    };

    static getMoves = () => {
        const moves = [
            [-2, -1],
            [-2, 1],
            [-1, -2],
            [-1, 2],
            [1, -2],
            [1, 2],
            [2, -1],
            [2, 1],
        ];
        return moves;
    };

    static isValid = (pos, visited) => {
        const boo =
            pos[0] >= 0 &&
            pos[0] < 8 &&
            pos[1] >= 0 &&
            pos[1] < 8 &&
            !visited.some((unit) => unit[0] === pos[0] && unit[1] === pos[1]);
        return boo;
    };
}

const start = [0, 0];
const end = [7, 7];

console.log(Knight.move(start, end));


class DOM {
    static firstInput = undefined;

    static secondInput = undefined;

    static initButtons = () => {
        const chessboardDOM = document.querySelector(".chessboard");
        const squaresDOM = chessboardDOM.querySelectorAll("div");
        squaresDOM.forEach((square) => square.addEventListener("click", (event) => {
            this.getSquareDataID(event);
        }));
    }

    static coordinates = (ID) => {
        const coordinates = [];
        const coordinatesWithID = {};
        for (let col = 0; col < 8; col++) {
            for (let row = 0; row < 8; row++) {
                coordinates.push([row, col]);
            }
        }

        let dataID = 1;
        coordinates.forEach(coordinate => {
            coordinatesWithID[dataID] = coordinate;
            dataID++;
        });
        return coordinatesWithID[ID];
    }

    static getSquareDataID = (event) => {
        const ID = event.target.dataset.id;
        this.getEquivalentLocation(ID);
    }

    static getEquivalentLocation = (ID) => {
        let coordinate = this.coordinates(ID);
        
        if (this.firstInput === undefined) {
            this.firstInput = coordinate;
        }
        if (this.firstInput !== undefined && this.secondInput === undefined) {
            this.secondInput = coordinate;
        }
        console.log(this.firstInput);
        console.log(this.secondInput);
    }
}

DOM.initButtons();