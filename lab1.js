// arithmetic-coding

const input = 'abbaab'


function code(string) {
    console.log(string);

    function count_propab(string) {
        let propabs = {}
        for (let i = 0; i < string.length; i++) {
            let m = string.charAt(i)
            propabs[string.charAt(i)] ? 
                propabs[string.charAt(i)]+=1/string.length
                :
                propabs[string.charAt(i)] = 1/string.length
        }
        console.log(propabs);
        return propabs
    }

    let interval = {start: 0, end: 1}
    let propabilities = (count_propab(string))
    
    for (let i = 0; i < string.length; i++) {
        let interval_length = interval.end-interval.start
        let char = string.charAt(i);
        let isFound = false
        
        Object.keys(propabilities).forEach((key) => { 
            if (!isFound){
                if (key != char){
                    interval.start += propabilities[key] * interval_length 
                } else {
                    interval.end = interval.start + propabilities[key] * interval_length
                    isFound=true
                }
            }
        });
        console.log("["+interval.start+","+interval.end+"}")
    }
    console.log(interval.start);

    return {value: interval.start, length: string.length, propabilities: propabilities}
}

function decode({value, length, propabilities}) {
    let interval = {start: 0, end: 1}
    let string = "";

    for (let i = 0; i < length; i++) { // for each char
        let char = null
        let isFound = false // !
        let interval_length = interval.end - interval.start
        Object.keys(propabilities).forEach((key)=>{
            if (!isFound) {
                interval.end = interval.start + propabilities[key] * interval_length
                if (value>=interval.start && value<interval.end) {
                    isFound=true
                    char = key;

                } else {
                    interval.start = interval.end;
                    interval.end = 1;
                }
            }
        })
        console.log("["+interval.start+","+interval.end+"}")
        string+=char

    }
    return string
}

console.log(decode(code(input)));
