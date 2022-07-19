var result = "012345678".replace(/\B(?=(\d{3})+\b)/g, ',')
console.log(result); 