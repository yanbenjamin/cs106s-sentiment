/*
 *  CS106S Week 2: Objects in JavaScript
 *  ------------------------------------
 *  Examples that we'll demo in class! :)
 */

// in JavaScript, objects store data values that can access through their keys
// they're similar to dictionaries in Python, or hashmaps in C++ / Java
// pretty much remember the phrasing, "collection of key-value pairs"

// as two starting examples, here are the employees of "Ben and Jerry" 
// no relation to ice cream parlor 🍨, but a parody of "Scrooge and Marley" from a Christmas Carol

let professor = {
    name: "Jerry Scrooge Cain", // could also do "name" on the left side, with a hug of quotation marks
    title: "Professor",
    salary: 1000,
    courses: ["CS106AX", "CS107", "CS106S"] // values can be arrays, or even objects themselves!
}

let assistant = {
    name: "Ben Cratchit Yan",
    title: "Teaching Assistant",
    salary: 25, // 🫠 
    courses: ["CS106AX", "CS106S"]
}

// note: the keys are always strings, but the values can be of any miscellaneous data type!

// to access / select an individual value in memory, you can use an expression 
// with the object name, a dot, then the name of the corresponding key

professor.name; // => "Jerry Scrooge Cain"
assistant.name; // => "Ben Cratchit Yan"
assistant.salary; // => 25, or Ben's measly income in British pounds

// alternatively, you can use square brackets, and enclose the key name in quotation marks!

professor["name"]; // => "Jerry Scrooge Cain"
professor["courses"]; // => ["CS106AX", "CS107", "CS106S"]

// you typically use the alternate formulation if the key is a variable that actually depends
// on the runtime behavior of the program. That is, the key can't be hard-coded in advance.

// one whimsical example I can think of is a greet function that addresses a professor 
// or faculty member by their title, but a student / TA by their name
// for instance, "Hello Professor!" and "Hello Provost!",  versus "Hello Ben!"

const FACULTY_TITLES = ["Professor", "Chair", "Dean", "Provost", "Headmaster"];

function greet(employee) {
    // TODO: implement this together!

}

greet(professor);
greet(assistant);

// key-value pairs can be re-assigned and/or modified!
assistant.salary *= 2; // double's Ben salary to 50!
assistant.salary = 1000; // updates Ben's salary to an entirely new amount, tastes like promotion! 🎉

// you can also add a brand new key-value pair through assignment
// for instance, if you want to give each of Ben and Jerry a catcphrase...

professor.catchphrase = "Does that make sense to everyone? ~does T-pose~"

assistant["catchphrase"] = "Jerry, we need to cook! ~makes Benzene ring~" // alternative syntax, but it works!

console.log(professor);
console.log(assistant);

// it's rare to delete a key-value pair from an object, but if you need to do so, you can use
// the aptly named delete operator. For instance, if Ben decides his catchphrase is cringe af :(,

delete assistant["catchphrase"]

// you can check if a key is currently defined in an object by the boolean expression: key in object
// or alternatively, object.hasOwnProperty(key), which was the old way to do it, and it still works!

if ("catchphrase" in professor) {
    console.log(professor["catchphrase"]);
}

// JavaScript objects are often colloquially called maps, though there's a slight difference
// in connotation. We still have key-value pairs, but the implication is that keys are of
// the same type and category (e.g., colors, names). The values are also often of the same type.

// classic example is an English dictionary: keys are words, values are corresponding definitions

let OxfordDictionary = {
    "petrichor": "earthly smell right after it rains, as the water creeps into dry soil and rock",

    "apricity": "how warm and bright the sun feels, paradoxically, in the winter",

    "syzygy": "3 or more celestial bodies aligned in straight line (☀️ - 🌘 - 🌏 - 🪐 - ☄️)",

    "defenestrate": "throw out of a window, or remove from power",

    "antejentacular": "occurring before breakfast, e.g., waking up in the morning"
}

// here's another example that maps an employee name to their hourly income 💸💸💸
// world-building context: the employees are real CS TAs I know, though the incomes are fictional

let salaryMap = {
    "Alice": 50,
    "Carole": 40,
    "Diego": 30,
}

salaryMap["Alice"]; // => 50

const BASELINE_WAGE = 20;
const INFLATION_RATE = 1.2;

// let's write a function that adjusts everyone's salary for inflation! 
// because every company definitely does that, yk to make sure life is livable

// and for any new employees who haven't been added to the salary map just yet,
// we assign them there with a starting wage! (i.e. add a new key-value pair)

function adjustForInflation(salaryMap, employeeNames) {
    // TODO: implement this together!

}

// let's see if it works! :)
adjustForInflation(salaryMap, ["Alice", "Ben", "Carole", "Diego", "Eugene"]);
console.log(salaryMap);