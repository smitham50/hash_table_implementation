class HashTable {
  constructor(size) {
    this.keyMap = new Array(size)
  }

  hashFunc(key) {
    let total = 0;
    let weirdPrime = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96
      total = (total * weirdPrime + value) % this.keyMap.length;
    }
    return total
  }

  set(key, value) {
    const hashed = this.hashFunc(key)

    if (!this.keyMap[hashed]) {
      this.keyMap[hashed] = [[key, value]]
    } else {
      let returnedPair = this.keyMap[hashed].find(pair => key === pair[0])
      if (returnedPair) {
        let idx = this.keyMap[hashed].indexOf(returnedPair)
        this.keyMap[hashed][idx] = [key, value]
      } else {
        this.keyMap[hashed].push([key, value])
      }
    }
  }

  get(key) {
    const hashed = this.hashFunc(key)

    let returnedPair = this.keyMap[hashed].find(pair => {
      return pair[0] === key
    })

    return returnedPair || `No key '${key}' in HashTable!`
  }

  keys() {
    const keyArray = []

    this.keyMap.forEach(index => {
      if (index.length === 1) {
        keyArray.push(index[0][0])
      } else {
        index.forEach(nestedKey => {
          keyArray.push(nestedKey[0])
        })
      }
    })

    return keyArray
  }

  values() {
    const valuesArray = []

    this.keyMap.forEach(index => {
      if (index.length === 1) {
        valuesArray.push(index[0][1])
      } else {
        index.forEach(nestedKey => {
          valuesArray.push(nestedKey[1])
        })
      }
    })

    return valuesArray
  }
}

hash = new HashTable(1)
hash.set("lion", "tiger")
hash.set("cow", "pig")
hash.set("dog", "squirrel")
hash.set("mouse", "monkey")
hash.set("dog", "owl")

console.log(hash.get("moose"))




