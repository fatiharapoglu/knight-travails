class Knight {
    static move = (start, end) => {
        let queue = [start];
        let visited = [];

        let distance = new Array(8).fill(0).map(() => new Array(8).fill(-1));
        let path = new Array(8).fill(0).map(() => new Array(8).fill([]));
        
        distance[start[0]][start[1]] = 0;
        path[start[0]][start[1]] = [start];

        while (queue.length > 0) {
            let current = queue.shift();
            if (current[0] === end[0] && current[1] === end[1]) {
                return {
                    distance: distance[current[0]][current[1]],
                    path: path[current[0]][current[1]],
                };
            }
            visited.push(current);

            let moves = this.getMoves(current);
            for (let move of moves) {
                let newPos = [current[0] + move[0], current[1] + move[1]];
                if (this.isValid(newPos, visited)) {
                    queue.push(newPos);
                    distance[newPos[0]][newPos[1]] = distance[current[0]][current[1]] + 1;
                    path[newPos[0]][newPos[1]] = path[current[0]][current[1]].concat([newPos]);
                }
            }
        }
    }

    static getMoves = () => {
        let moves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
        return moves;
    }

    static isValid = (pos, visited) => {
        let boo = pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8 && !visited.some(unit => unit[0] === pos[0] && unit[1] === pos[1]);
        return boo;
    }
}

let start = [1, 1];
let end = [5, 7];
console.log(Knight.move(start, end));