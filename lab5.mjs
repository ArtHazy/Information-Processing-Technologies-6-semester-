import { log } from "console"

//@ts-check

const graph = [
    [0, 1, 2, 3],
    [1, 0, 4, 5],
    [2, 4, 0, 6],
    [3, 5, 6, 0],
]

const GENE_MUTATION_PROPABILITY = 0.1

class Actor{
    path = []
    generation = 0
    value
    killAlert(reason){
        console.log('killing: ', this, reason)
    }
    calculateValue(){
        this.value=0
        for (let i = 0; i < this.path.length-1; i++) {
            let start = this.path[i]
            let end = this.path[i+1]
            this.value += graph[start][end]
        }
    }
}

findShortestWay(graph, 0, 3, 5)

export function findShortestWay(graph, start_ind, final_ind, generations) {

    let actors = []
    log('gen0',firstGeneration(5))
    for (let i = 1; i < generations; i++) {
        log('children:',generateChildren(2,i)) 
        log('mutated:',mutateActors())
        sortActorsAndKillUnfit(0.5)
        log('gen'+i, actors)
    }
    


    function getRandomVisitInd() {return Math.floor(Math.random() * graph.length)}

    function firstGeneration(population=3) {
        for (let i = 0; i < population; i++) {
            let actor = new Actor(); actor.path.push(start_ind); let visit_ind
            do {
                visit_ind = getRandomVisitInd()
                if (visit_ind && (graph[graph.length-1][visit_ind]!=null || actor.path.length == 0)) {
                    actor.path.push(visit_ind)

                } else {actor.killAlert('h')}
            } while (actor && visit_ind!=final_ind)
            actor? actors.push(actor) : null
        }
        calculateActorsValue()
        return actors
    }
    /**
     * 
     * @param {number} numberOfChildrenPerPair 
     * @param {number} generation 
     */
    function generateChildren(numberOfChildrenPerPair, generation){
        let parent1, parent2
        let children = []

        
        for (let i = 0; i < actors.length-1; i+=2) { // for each pair
            let pairChildren = []

            for (let i = 0; i < numberOfChildrenPerPair; i++) { // init children
                let child = new Actor()
                child.generation = generation
                child.path.push(start_ind)
                pairChildren.push(child)
            }

            parent1 = actors[i], parent2 = actors[i+1]
            let longestParent = parent1.path.length > parent2.path.length ? parent1 : parent2
            let j;
            for (j = 1; j < Math.min(parent1.path.length, parent2.path.length); j++) { // for each paired gene
                pairChildren.forEach((child)=>{
                    child.path.push( Math.random()>0.5 ? parent1.path[j] : parent2.path[j] )
                })
            }
            
            pairChildren.forEach((child)=>{
                if (child.path[child.path.length-1]!=final_ind){
                    child.path.push(...longestParent.path.slice(j,longestParent.path.length))
                }
            })
            children.push(...pairChildren)
        }
        actors.push(...children)
        calculateActorsValue()
        return children
    }

    function mutateActors(){
        let mutated = []
        actors.forEach((actor, actorInd)=>{
            actor.path.forEach((value,valueInd)=>{
                if (valueInd >0 && valueInd<actor.path.length-1 && Math.random()<GENE_MUTATION_PROPABILITY){
                    let value_=value
                    value = Math.floor(Math.random()*graph.length),
                    actor.path[valueInd]=value,
                    mutated.push({actorInd,valueInd,value_,value})
                }
            })
        })
        calculateActorsValue();
        return mutated
    }
    function calculateActorsValue(){
        actors.forEach((actor)=>{
            actor.calculateValue()
        })
    }
    function sortActorsAndKillUnfit(killPortion){
        actors.sort((actor1,actor2)=>{
            return actor1.value - actor2.value
        })
        let unfit = actors.splice(-Math.floor(actors.length*(1-killPortion)), actors.length)
        log('killed unfit:', unfit)
    }
}