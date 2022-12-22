function findPies(levelOfSweetness, desiredSweet) {
    const arr= []
    let cs = 0
    for (let i = 0; i < levelOfSweetness.length; i++) {

        if (cs + levelOfSweetness[i] > desiredSweet) {
            continue
        } 

        else if (cs + levelOfSweetness[i] === desiredSweet) {
            arr.push(i)
          break;
        }

        else if (cs + levelOfSweetness[i] < desiredSweet) {
            arr.push(i);
            cs += levelOfSweetness[i];
        }
    }

 return arr;
}

let levelOfSweetness = [1,2,3,2,1]
let desiredSweet = 6

let m = findPies(levelOfSweetness, desiredSweet)
console.log(m);
