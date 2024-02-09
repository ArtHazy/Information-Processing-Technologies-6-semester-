// huffman coding

const input = 'ababac'

function code(string) {

    class node {
        constructor(name, value, parent = null, left = null, right = null) {
            this.name = name;
            this.value = value;
            this.left = left;
            this.right = right;
            this.parent = parent;
            this.code = null;
            this.visits = 0;
        }
    }

    function get_alphabet(string) {
        let alphabet = {}
        for (let i = 0; i < string.length; i++) {
            alphabet[string.charAt(i)] ? 
            alphabet[string.charAt(i)] += 1
            :
            alphabet[string.charAt(i)] = 1
        }
        let order = Object.keys(alphabet).sort(function(a,b){return alphabet[b]-alphabet[a]}) // sort alphabet to order
        console.log(alphabet);
        console.log(order);
        return {alphabet, order}
    }

    function build_tree_get_root({alphabet,order}){
        let nodes = {};
        while (order.length > 1) {
            let i = order.length - 1;

            let left = nodes[order[i]] || new node(order[i],alphabet[order[i]]);
            let right = nodes[order[i-1]] || new node(order[i-1],alphabet[order[i-1]])
            let parent = new node(left.name+right.name , left.value+right.value , null , left , right)
            left.parent = parent;
            right.parent = parent;
            nodes[left.name] = left;
            nodes[right.name] = right;
            nodes[parent.name] = parent;

            delete alphabet[left.name]
            delete alphabet[right.name]
            alphabet[parent.name] = parent.value;

            delete order[i]
            delete order[i-1]
            order = Object.keys(alphabet).sort(function(a,b){return alphabet[b]-alphabet[a]}) // sort alphabet to order
            // 1: order = [a, cb] 2: order = [acb]
        }
        // console.log(nodes);
        nodes[order[0]].code = ""
        //console.log(nodes[order[0]]);
        let root =  nodes[order[0]]
        return {root , nodes}

    }

    let root = build_tree_get_root(get_alphabet(string)).root
    let nodes = build_tree_get_root(get_alphabet(string)).nodes 

    function code_tree_nodes(root_node, nodes) {
        function visit(node, code) {
            let parent_code
            node.parent? parent_code = node.parent.code || "" : parent_code = ""

            node.code = parent_code+code
            nodes[node.name] = node;



            node.left? visit(node.left,0):null
            node.right? visit(node.right,1):null
        }
        visit(root_node.left, 0)
        visit(root_node.right, 1)

        return nodes
    }

    nodes = code_tree_nodes(root, nodes)

    //console.log(root);
    
    //console.log('nodes');
    //console.log(nodes);
    
    function code_string(string, nodes){
        let result = ""
        for (var i=0; i<string.length; i++){
            result+=nodes[string.charAt(i)].code;
        }
        return result
    }

    console.log('nodes:');
    // console.log(nodes);
    
    let result = code_string(input, nodes)
    
    
    console.log('result: ');
    console.log(result);
    return result

}

code(input);

