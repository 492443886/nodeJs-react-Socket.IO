// Closure example emulating private members and methods in JavaScript
const showCounter = () => {
    let privateCounter = 0;
    let privateChangeBy = val => (privateCounter += val); // <-- private closure
    return {
        publicIncrement: () => privateChangeBy(1), // <-- public closure
        publicDecrement: () => privateChangeBy(-1), // <-- public closure
        publicValue: () => privateCounter // <-- public closure
    };
};
let counter1 = showCounter(); // counter 1's closures are independant of counter 2's
let counter2 = showCounter(); // as seen in last 2 lines
console.log(counter1.publicValue()); // logs 0
counter1.publicIncrement();
counter1.publicIncrement();
console.log(counter1.publicValue()); // logs 2
counter1.publicDecrement();
console.log(counter1.publicValue()); // logs 1
console.log(counter2.publicValue()); // logs 0
// console.log(counter1.privateChangeBy(2)); // throws error because method is truly private