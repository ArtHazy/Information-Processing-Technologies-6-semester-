import { log } from "console"
import { getRandomValues } from "crypto"

const graph = [
    [0, 1, 2, 3],
    [1, 0, 4, 5],
    [2, 4, 0, 6],
    [3, 5, 6, 0],
]

class Actor{
    path = []
    pathValue
    killAlert(reason){
        console.log('killing: ', this, reason)
    }
}

findShortestWay(graph, 0, 3, 5)

export function findShortestWay(graph, start_ind, final_ind, actors_amount, iterations) {

    let actors = []
    firstGeneration()
    for (let i = 0; i < iterations; i++) {generateChildren(); mutateActors()}
    log(actors)
    
    


    function getRandomVisitInd() {return Math.floor(Math.random() * graph.length)}

    function firstGeneration() {
        for (let i = 0; i < actors_amount; i++) {
            let actor = new Actor()
            actor.path = []
            let visit_ind
            do {
                visit_ind = getRandomVisitInd()
                if (visit_ind && (graph[graph.length-1][visit_ind]!=null || actor.path.length == 0)) {
                    actor.path.push(visit_ind)

                } else {actor.killAlert('h')}
            } while (actor && visit_ind!=final_ind)
            actor? actors.push(actor) : null
        }
    }
    function generateChildren(){

    }
    function mutateActors(){

    }
}