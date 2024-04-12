// Classification Neural network with teacher

//import { Image } from 'image-js';

/**
 * @param {number} value 
 */
export function sigmoid(value){ // -inf = 0 ; +inf = 1
    return 1 / (1 + Math.E**(-value))
}
/**
 * @param {number} value 
 */
export function sigmoid_d(value){
    return sigmoid(value) * (1 - sigmoid(value))
}

export class Neuron{
    /** value */
    x
    /** activated value */
    y
    /** displacement */
    d = 0
    /**error */
    e
    /**local gradient */
    δ = 0

    next=[]
    prev=[]

    /**
     * activation function
     * @param {number} v 
     * @returns {number}
     */
    f = (v)=>sigmoid(v)
    // производная

    /**
     * activation function derivative
     * @param {number} v 
     * @returns {number}
     */
    df = (v)=>sigmoid_d(v)

    /**
     * transforms and sets value
     * @param {number} value 
     */
    activate(value){
        this.x = value
        this.y = this.f(value)
    }

    /**
     * calculate values
     * @param {Neuron[]} fromNeurons 
     * @returns 
     */
    feedForward(fromNeurons){
        this.x = 0
        fromNeurons?.forEach((prevNeuron, ind)=>{
            let link = this.prev.find((link)=>link.neuron === prevNeuron)
            link? this.x += prevNeuron.y * link.ω.value 
            : null
            
            //if (!this.weights[ind]) this.weights[ind] = Math.random()*2-1 // -1 <-> 1
            //this.sum += neuron.value * this.weights[ind]
        })
        this.activate(this.x+this.d)
    }

    

    /**
     * 
     * @param {Neuron[] | null | undefined} nextNeuronLayer 
     * @param {Neuron[] | null | undefined} prevNeuronLayer 
     * @returns 
     */
    backDrop(nextNeuronLayer, prevNeuronLayer, λ){
        if (!nextNeuronLayer) { // last layer
            this.δ = this.e * this.df(this.x) 
        } else { // δ = Σ(δ_next * ω_next_current) * df(x)
            let Σ = 0
            nextNeuronLayer.forEach((nextNeuron)=>{
                let link = this.next.find((link)=>(link.neuron === nextNeuron))
                Σ += nextNeuron.δ * link.ω.value
            })
            this.δ = Σ * this.df(this.x)
        }

        // weights correction  ω_to_prev -= (λ * δ_current * f_prev)
        prevNeuronLayer?.forEach((prevNeuron)=>{
            let link = this.prev.find((link)=>(link.neuron === prevNeuron))
            link.ω.value -= λ * this.δ * prevNeuron.y //+ 0.3 * link.ω.value  
        })
        
    }
}

export class NeuralNetwork {
    layers = [[new Neuron()]]
    /** шаг обучения*/
    λ = 1

    /**
     * 
     * @param {number[]} values 
     * @param {number[] | null} correctValues
     */
    iteration(values, correctValues, counter){
        try {
            if (!Array.isArray(this.layers[0])) throw new Error()
            if (values.length !== this.layers[0].length) throw new Error()


            /// calculation
            this.layers.forEach((layer,lInd)=>{
                // fill input neurons
                if (lInd === 0) layer.forEach((neuron,nInd)=>{ neuron.activate(values[nInd]) })
                // calculate all other neurons 
                else {
                    layer.forEach((neuron)=>{
                        neuron.feedForward(this.layers[lInd-1])
                    })
                }
            })
            if (counter%100 === 0 || !counter) {
                console.log('input:', values);
                console.log('prediction:', this.layers.at(-1).map((neuron)=>neuron.y ));
            }
            

            // correction
            if (correctValues) {
                if (!Array.isArray(this.layers.at(-1))) throw new Error()
                if (correctValues.length !== this.layers.at(-1).length) throw new Error()

                if (counter%100 === 0 || !counter) {console.log('correct:', correctValues);}

                for (let i = this.layers.length-1; i >= 0; i--) {
                    let layer = this.layers[i]
                    let nextLayer = this.layers[i+1]
                    let prevLayer = this.layers[i-1]

                    layer.map((neuron, ind)=>{
                        if (!nextLayer) { // last layer
                            neuron.e = lossEvaluation(correctValues[ind], neuron.y)
                        }
                        neuron.backDrop(nextLayer, prevLayer, this.λ);
                    })
                } 

                if (counter%100 === 0 || !counter) {console.log('errors:', this.layers.at(-1).map((neuron,nInd)=>neuron.e)); console.log()}
            }

            return this.layers.at(-1).map((neuron)=>neuron.y);

        } catch (e) {
            console.log(e.message);
        }

        /**
         * 
         * @param {number} correctValue 
         * @param {number} predictionValue 
         */
        function lossEvaluation(correctValue, predictionValue){
            return predictionValue - correctValue  // !!!!!!!!!!!!!!!! 
        }
        
    }

    /**
     * creates neuron layers
     * @param {number[]} layersLengths 
     */
    constructor(layersLengths) {
        this.layers=[]
        // fill layers
        layersLengths.forEach((length)=>{
            this.layers.push(Array.from({length},()=>new Neuron()))
        })
        // link neurons between layers


        this.layers.forEach((layer, layerInd)=>{
            let isLastLayer = layerInd === this.layers.length-1;

            if (!isLastLayer) layer.forEach((neuron, neuronInd)=>{
                let next = this.layers[layerInd+1].map((neuron_n)=>{
                    let ω = {value: Math.random()*2-1}  /* -1 <-> 1 */ // weight.value
                    neuron_n.prev.push({neuron, ω})
                    return {neuron: neuron_n, ω}
                })
                neuron.next=next
            })
        })
    }
}



execute().catch((e)=>console.error(e));

async function execute() {
    // let imagesData = []
    // for (let i=1; i<10; i++) {
    //     imagesData.push( (await Image.load(`Numbers/Untitled_Artwork-${i}.png`)).data )
    // }

    let neuralNet = new NeuralNetwork([2, 2, 1])
    // log links
    console.log(neuralNet.layers.map((layer)=>layer.map((neuron)=>neuron.next.map((link)=>link.ω.value))));

    for (let i= 0; i<1000; i++) {
        neuralNet.iteration([0,1], [1], i)
        neuralNet.iteration([0,0], [0], i)
        neuralNet.iteration([1,1], [1], i)
        //neuralNet.iteration([1,0], [1], i)

        // log links
        i%100==0? console.log(neuralNet.layers.map((layer)=>layer.map((neuron)=>neuron.next.map((link)=>link.ω.value))),'\n\n') : null
    }
    
    neuralNet.iteration([0,1])

    console.log();
}