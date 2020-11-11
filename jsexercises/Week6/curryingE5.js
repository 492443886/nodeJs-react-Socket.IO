// same function written the es5 way
var curriedES5Sum = function(a) {
    return function(b){ return a + b }
}

console.log('curried es5 value ' + curriedES5Sum(3)(4))