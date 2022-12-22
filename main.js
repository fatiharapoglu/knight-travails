class Knight {
    static move = (start, end) => {
        let q = [];
        q.push(start);

        let visited = new Set();
        visited.add(start);

        let dist = 0;

        while (q.length > 0) {
            let size = q.length;

            for (let i = 0; i < size; i++) {
                let current = q.shift();

                if (current[0] == end[0] && current[1] == end[1]) {
                    return dist;
                }

                let moves = this.getMoves(current);

                for (let move of moves) {
                    if (this.isValid(move) && !visited.has(move)) {
                        q.push(move);
                        visited.add(move);
                    }
                }
            }
            dist++;
        }
    }

    static getMoves = (pos) => {
        let x = pos[0];
        let y = pos[1];
        let moves = [
            [x + 2, y + 1],
            [x + 2, y - 1],
            [x - 2, y + 1],
            [x - 2, y - 1],
            [x + 1, y + 2],
            [x + 1, y - 2],
            [x - 1, y + 2],
            [x - 1, y - 2]
        ];
        return moves;
    }

    static isValid = (pos) => {
        let x = pos[0];
        let y = pos[1];
        let boo = x >= 0 && x < 8 && y >= 0 && y < 8;
        return boo;
    }
}

let start = [0, 0];
let end = [1, 2];

let distance = Knight.move(start, end);

console.log(distance);