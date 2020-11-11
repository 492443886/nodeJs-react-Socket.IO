const curriedProduct = a => b => c => a * b * c

console.log(`curried #2 value ${curriedProduct(2)(3)(4)}`)