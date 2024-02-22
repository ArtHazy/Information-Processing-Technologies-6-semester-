// ant algorithm

// @ts-check
import { log } from 'console'


class Path {
    /**
     * @param {number} length length of the path
     * @param {number} pheromone pheromone value of the path. 0 at the start
     */
    constructor(length, pheromone = 0.5) {
        this.length = length
        this.pheromone = pheromone
    }
}

// // Hamilton impossible
// const graph = [
//     [new Path(0), new Path(3), null, null],
//     [new Path(3), new Path(0), new Path(2), new Path(4)],
//     [null, new Path(2), new Path(0), new Path(1)],
//     [null, new Path(4), new Path(1), new Path(0)]
// ]

// Hamilton possible
const graph = [
    [new Path(0), new Path(1), null, new Path(2)],
    [new Path(1), new Path(0), new Path(4), new Path(3)],
    [null, new Path(4), new Path(0), new Path(5)],
    [new Path(2), new Path(3), new Path(5), new Path(0)]
]


class Ant {
    /** @type {number[]} */
    visited = []
    travelled_distance = 0
    killAlert(){log('killing', this)}
    /**
     * @param {number} position 
     */
    constructor (position){
        this.position = position
    }
}

/**
 * Displays ant distribution by verticies
 * @param {Ant[]} ants 
 */
function logAntsPositions(ants) {
    let result = {}
    ants.forEach(ant => {
        if (ant) { result[ant.position] ? result[ant.position]++ : result[ant.position] = 1 }
    })
    log(result);
}


/**
 * Finds the shortest path between two points
 * @param {number} final index of the final vertex of the graph
 * @param {number?} start index of the start vertex of the graph
 * @param {boolean?} visitAll 'true' to visit all
 */
export function findShortestWay(final = 3, start = 0, visitAll = false) {
    const start_population = 30
    const turns_before_killed = 8
    /** @type {Ant[]} */
    let ants = []

    iterate()
    iterate()
    iterate()
    iterate()
    iterate()
    iterate()
    iterate()

    function iterate(){
        ants = []
        if (start!=null) {
            for (let i = 0; i < start_population; i++) { // populate start with ants
                let ant = new Ant(start)
                ant.visited.push(start)
                ants.push(ant)
            }
        }
        else {
            graph.forEach((value, index) => { // for each vertex
                for (let i = 0; i < start_population; i++) { // populate with ants
                    let ant = new Ant(index)
                    // @ts-ignore
                    ant.visited.push(index)
                    ants.push(ant)
                }
            })
        }
    
        log('\nStart position: '); logAntsPositions(ants)
        moveAnts();
        ants.forEach((ant, index) =>{
            ant? plantPheromone(ant) : null
        })
        vaporizePheromone(graph, 0.5)
        log('\nEnd position: '); logAntsPositions(ants)
        log('\ngraph',graph)
        log('\nants'); log(ants)
    }
    
    

    function moveAnts(){
        ants = ants.map((ant, index) => {
            if (ant){
                do { // a move
                    let path_choice = choosePath(graph[ant.position])

                    // allows revisit only final

                    let is_allowed = (path_choice == final? (
                        visitAll? ant.visited.length == graph.length : true
                    ):(
                        ant.visited.find((visit_vertex)=>{return visit_vertex == path_choice})? false : true
                    ))

                    //let is_allowed = (path_choice==final && ant.visited.length==graph.length) ? false : ant.visited.find((visit_vertex)=>{return visit_vertex == path_choice})

                    if (path_choice==null || !is_allowed || ant.visited.length > turns_before_killed) {ant.killAlert(); ant=null}

                    if (ant){
                        // @ts-ignore
                        ant.travelled_distance += graph[ant.position][path_choice].length
                        ant.position = path_choice
                        ant.visited.push(path_choice)
                    }
                    
                } while (ant && (visitAll? ant.visited.length < graph.length+1 : ant.position != final) )

                //ant? plantPheromone(ant) : null
            }
            return ant
        })

        /**
         * @param {Ant} ant array of integer indexes of verticies that were visited by the ant
         */
        
    }

    /**
     * @param {(Path|null)[][]} graph graph which path's feromone to vaporize
     * @param {number} value value 0 - 1 of vaporization
     */
    function vaporizePheromone(graph, value){
        graph.forEach((paths) => {
            paths.forEach((path) => {
                path? path.pheromone*=value : null
            })
        })
    }

function plantPheromone(ant){
    for(let i=0; i<ant.visited.length-1; i++) {
        let path = graph[ant.visited[i]][ant.visited[i+1]]
        path.pheromone += 1/ant.travelled_distance
    }
}

}


/**
 * @param {(Path|null)[]} paths
 * @returns {number|null} integer index of the chosen path 
 */
function choosePath(paths) {
    return(makeChoice(countPropabilities()))

    /**
     * @returns {(number|null)[]} array of propabilities for each path 
     */
    function countPropabilities() {
        let overall_desire = 0
        let propabilities = []
        paths.forEach(path => { path && path.length > 0 ? overall_desire += path.pheromone * (1 / path.length) : null })

        paths.forEach(path => {
            let propability = null
            if (path && path.length > 0) {
                let path_desire = (path.pheromone * (1 / path.length));
                propability = path_desire / overall_desire
            }
            propabilities.push(propability)
        })
        return(propabilities);
    }

    /**
     * @param {(number | null)[]} propabilities 
     * @returns {number | null} integer index of the chosen path 
     */
    function makeChoice(propabilities){

        let random = Math.random()
        let start = 0;
        let result = null;
        propabilities.forEach((propability, index) => {
            if (propability && random > start && random < start+propability) {result=index}
            start+= propability || 0 
        })

        return result
    }
}


//(choosePath(graph_matrix[1]))
findShortestWay()