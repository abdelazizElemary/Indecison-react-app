class Person {
    constructor(name = 'Anonymous', age = 0) {
        this.name = name;
        this.age = age;
    }
    getGreeting() {
        return `Hi. I am ${this.name}!`;
    }
    getDescription() {
        return `${this.name} is ${this.age}  year(s) old.`
    }
}

class Student extends Person {
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }
    hasMajor() {
        return !!this.major;
    }
    getDescription() {
        let description = super.getDescription();

        if (this.hasMajor()) {
            description += ` Their major is ${this.major}`
        }
        return description;
    }
}

class Traveler extends Person {
    constructor(name, age, homeSupport) {
        super(name, age);
        this.homeSupport = homeSupport
    }
    hasHomeSupport() {
        return !!this.homeSupport;
    }
    getGreeting() {
        let gretting = super.getGreeting();
        if (this.hasHomeSupport()) {
            gretting += ` I'm visiting from ${this.homeSupport}`
        }
        return gretting
    }
}

const me = new Student('Abdelaziz', 22, 'Computer science');

console.log(me.getDescription())

const tourist = new Traveler('Rami', 22, 'New York')

const tourist1 = new Traveler('Rami', 22)

console.log(tourist.getGreeting())
console.log(tourist1.getGreeting())

const other = new Student();
console.log(other.getDescription())