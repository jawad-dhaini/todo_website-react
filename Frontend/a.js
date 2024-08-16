function f(...args) {
  console.log(args);
  console.log(...args.slice(1));
  g(...args.slice(1));
}

function g(...args) {
  console.log(args[0]);
}

f(1, 2, 3, 4, 5, 6);
