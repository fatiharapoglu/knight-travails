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

class DOM {
    static firstInput = undefined; // for storing which array knight placed

    static secondInput = undefined; // storing destination array

    static coordinatesWithID = {}; // all coordinates with data-id's, filled with createCoordinates function

    static initButtons = () => {
        const chessboardDOM = document.querySelector(".chessboard");
        const squaresDOM = chessboardDOM.querySelectorAll("div");
        const resetBtnDOM = document.querySelector("#reset");
        squaresDOM.forEach((square) => square.addEventListener("click", (event) => {
            this.getSquareDataID(event);
        }));
        resetBtnDOM.addEventListener("click", this.clearInputs);
    }

    static createCoordinates = () => {
        const coordinates = [];
        for (let col = 0; col < 8; col++) {
            for (let row = 0; row < 8; row++) {
                coordinates.push([row, col]);
            }
        }
        
        let dataID = 1;
        coordinates.forEach(coordinate => {
            this.coordinatesWithID[dataID] = coordinate;
            dataID++;
        });
    }

    static getCoordinates = (ID) => { // finding coordinates with known data-id
        return this.coordinatesWithID[ID];
    }

    static getIDfromCoordinates = (array) => { // finding data-id with known coordinates
        let obj = this.coordinatesWithID;

        // json stringify methods to find objects and arrays, wont fork if it is not stringified
        let dataID = Object.keys(obj).find((key) => JSON.stringify(obj[key]) === JSON.stringify(array));
        return dataID;
    }

    static getSquareDataID = (event) => {
        let ID = event.target.dataset.id;
        let target = event.target;
        this.setInputs(ID, target);
    }

    static setInputs = (ID, target) => {
        let coordinate = this.getCoordinates(ID);

        if (coordinate === undefined) return;
        if (this.firstInput !== undefined && this.secondInput !== undefined) return;
        
        if (this.firstInput === undefined) {
            this.firstInput = coordinate;
            this.info("Choose a destination.");
            this.placeKnight(target);
            return;
        } else if (this.firstInput !== undefined && this.secondInput === undefined) {
            this.secondInput = coordinate;
            this.placeKnight(target);
        }

        if (this.firstInput !== undefined && this.secondInput !== undefined) {
            let start = this.firstInput;
            let end = this.secondInput;
            let result = Knight.move(start, end);
            this.showPath(result.path);
            this.info(`Destination reached in ${result.distance} moves.`);
        }
    }

    static clearInputs = () => {
        this.firstInput = undefined;
        this.secondInput = undefined;

        const chessboardDOM = document.querySelector(".chessboard");
        const squaresDOM = chessboardDOM.querySelectorAll("div");
        squaresDOM.forEach((square) => {
            square.innerHTML = "";
            square.classList.remove("visited");
        });
        this.info("Place your knight.");
    }

    static placeKnight = (target) => {
        const knightIcon = `<i class="fa-solid fa-chess-knight knight"></i>`;
        target.innerHTML = knightIcon;
    }

    static info = (text) => {
        const infoDOM = document.querySelector("#info");
        infoDOM.textContent = text;
    }

    static showPath = (path) => {
        for (let i=1; i < path.length - 1; i++) {
            let ID = this.getIDfromCoordinates(path[i]);
            this.highlightPath(ID);
            // "i" value starting with "1" because we don't need placed array as it already shown as knight icon
            // the last array is also shown as knight icon so it is "path.length - 1"
        }
    }

    static highlightPath = (ID) => {
        const squareVisited = document.querySelector(`[data-id="${ID}"]`);
        squareVisited.classList.add("visited");
    }
}

DOM.initButtons();
DOM.createCoordinates();