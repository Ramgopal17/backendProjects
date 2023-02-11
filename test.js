//  Problem
 
 // 1000 people are standing in a circle, all numbered

// Trom 1 to 1000

// Person 1 has sword with which he kills person 2

// gives the sword to person 3.

// Person 3 kills person 4 and passes the sword to

// person 5

// Every time the person who has the sword kills the next person in the circle and passes the sword

// This is continued till there is only one person ave

// Who is the Last Man Standing?
// ------------------------ solution -----------------------


function eliminate(n){
const res = [];
for (let i = 1; i <= n; i++) {
  res.push(i);
}
for (let i = 0; res.length !== 1; i++) {
  if (res.length < i + 1) {
    i = 0;
  }
  if (res.length === i + 1) {
    i = -1;
  }
res.splice(i + 1, 1);
}

return res[0]
}

let a=eliminate(1000)
console.log(a)