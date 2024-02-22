//

import { log } from "console"

const graph = [
    [0, 1, 2, 3],
    [1, 0, 4, 5],
    [2, 4, 0, 6],
    [3, 5, 6, 0],
]
let start_path = Object.keys(graph)
let Sbest = { path: start_path, length: countLength(start_path) }

const max_temp = 100
let temp = max_temp;
while (temp > 2) {
    iterate(temp)
    temp = Math.pow(temp, 0.9)
}

function iterate(temp) {
    let S_ = { ...Sbest }
    generateAndReplacePath(S_)
    if (S_.length < Sbest.length || generateSbestReplaceChances(Sbest, S_)) { Sbest = S_}
    log(temp, Sbest)


    function generateSbestReplaceChances(Sbest, S_) {
        let delta = Math.abs(S_.length - Sbest.length)
        let limit = Math.pow(Math.exp(1), -delta / temp)
        let random_value = Math.random()

        return random_value < limit
    }

    function generateAndReplacePath(S) {
        let i, j;
        i = Math.floor(Math.random() * S.path.length)
        do { j = Math.floor(Math.random() * S.path.length) } while (j == i)
        let buf = S.path[i]
        S.path[i] = S.path[j]
        S.path[j] = buf
        S.length = countLength(S.path)
    }
}

function countLength(path) {
    let distance = 0
    for (let i = 0; i < path.length - 1; i++) {
        distance += graph[path[i]][path[i + 1]]
    }
    return distance
}