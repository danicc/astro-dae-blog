---
id: 'design-patterns-fundamentals'
date: '2020-04-16'
title: 'Design Pattern Fundamentals'
description: "Is a general, reusable solution to a commonly occurring problem within a given context. Also this solution mustn't be obvious and it has to be based on a proven concept. They are formalized best practices that a programmer can use to resolve common problems when is designing aplications or systems, also they have to consider that the solution in a design pattern must be independent of the programming language, meaning that a design pattern represents an idea, not a particular implementation. As they are good programming practices they allow us to create more flexible, reusable and maintainable code"
category: 'Programming'
tags: ['design-patterns', 'Javascript']
banner: '/images/bg/design-patterns-fundamentals.jpg'
locale: 'en'
---

# Design Pattern Fundamentals

## What is a software design pattern?

Is a general, reusable solution to a commonly occurring problem within a given context. Also this solution mustn't be obvious and it has to be based on a proven concept. They are formalized best practices that a programmer can use to resolve common problems when is designing aplications or systems, also they have to consider that the solution in a design pattern must be independent of the programming language, meaning that a design pattern represents an idea, not a particular implementation. As they are good programming practices they allow us to create more flexible, reusable and maintainable code.

## Classification

There are three main types of design patterns:

---

### Creationals

They provide mechanisms to create objects based on a required criteria and in a controlled way.

#### Prototype

It is used when the type of objects to create is determined by a prototypical instance, which is cloned to produce new objects.

This pattern is used to:

- avoid subclasses of an object creator.
- avoid the inherent cost of creating a new object in the standard way (e.g., using the `new` keyword) when it is prohibitively expensive for a given application.

> Prototype - Is an encapsulation of properties/methods that an object links to.

##### Example

Each new copy/instance of `Developer` object is pointing to the prototype that is only one object and is not going to be duplicated.

```javascript
const Developer = function(name) {
  this.name = name;
  this.skills = [];
};

Developer.prototype.addSkill = function(skill) {
  console.log(`adding skill: ${skill}`);
  this.skills.push(skill);
};

Developer.prototype.save = function() {
  console.log(`Saving developer info: ${this.name}`);
};

const developerOne = new Developer('Jon');
const developerTwo = new Developer('Doe');

developerOne.addSkill('design patterns');
developerOne.save();
developerTwo.save();

// console output
// adding skill: design patterns
// Saving developer info: Jon
// Saving developer info: Doe
```

#### Factory

Is used to simplify object creation, sometimes this could be complicated, either because of configuration or other factors, and this pattern is used to simplify that and hide a lot of this from the frontend. In other words, is used to create objects without exposing the creation logic to the client and the client use the same common interface to create a new type of object.

##### Example

The `projectRepository` is going to be very similar to `developerRepository`. This is an example in node.js where we create differents `repositories` objects using a `facotry` function.

```javascript
// developerRepository.js
const developerRepository = function() {
  function get(id) {
    console.log(`getting developer from DB, ${id}`);
    return {
      name: `developer from DB ${id}`,
    };
  }

  function save(developer) {
    console.log(`saving developer to DB ${developer.name}`);
  }

  return {
    get: get,
    save: save,
  };
};

module.exports = developerRepository();
```

```javascript
// repoFactory.js
const repoFactory = function() {
  let repos = this;
  const repoList = [
    { name: 'developer', source: './developerRepository' },
    { name: 'project', source: './projectRepository' },
  ];

  repoList.forEach(({ name, source }) => {
    repos[name] = require(source);
  });
};

module.exports = new repoFactory();
```

```javascript
//main.js
const repoFactory = require('./repoFactory');

const developerOne = repoFactory.developer.get(1));
const project = repoFactory.project.get(1);

developerOne.project = project;
console.log(developerOne);
```

#### Singleton

It restricts the instantiation of a class to one "single" instance. Used to restrict an object to one instance of that object across the application. This design pattern is based on remembering the instance and sending back that same instance every time you need it.

In node.js, modules are cached the first time they are loaded. [modules-caching](https://nodejs.org/api/modules.html#modules_caching). And so if you look at the `developerRepository` on the factory design pattern, what we are doing here is a singleton because we are calling the function and exporting the object returned from it.

```javascript
// developerRepository.js
const developerRepository = function() {
  ...

  return {
    get: get,
    save: save,
  };
};

module.exports = developerRepository();
// or
//module.exports = new developerRepository;
```

Therefore every time we require this module `const developerRepo = require('./developerRepository')` we are going to get the same object instance.

> To have a module execute code multiple times, export a function, and call that function.

If we don't want to have a singleton we should do something like the following

```javascript
//developerRepository.js
module.exports = developerRepository;

//main.js
const developerRepo = require('./developerRepository');
const myRepo = developerRepo();
```

---

### Structural

Concerned with how objects are made up and simplify relationships between objects. They deal with the relationship of objects in two ways, extending or simplifying functionality.

#### Decorator

Add behavior to an individual object, dynamically, without affecting the behavior of other objects from the same class. This design pattern is often useful for adhering to the -Single Responsability Principle-, as it allows functionality to be divided between classes with unique areas of concern.

> Used to add new functionality to an existing object, without being obtrusive.

##### Example

`FrontendDeveloper` is extending or adding new features over the `Developer` object, the good part of this is that `Developer` object is not being modified

```javascript
const Developer = function(name) {
  this.name = name;
  this.skills = [];
};

Developer.prototype.addSkill = function(skill) {
  console.log(`adding skill: ${skill}`);
  this.skills.push(skill);
};

Developer.prototype.save = function() {
  console.log(`Saving developer info: ${this.name}`);
};

// create new object extending developer object
const FrontendDeveloper = function(name) {
  Developer.call(this, name);
};

FrontendDeveloper.prototype = Object.create(Developer.prototype);
FrontendDeveloper.prototype.createUserInterface = function() {
  console.log(`${this.name} is creating a new user interface`);
};
FrontendDeveloper.prototype.save = function() {
  console.log(`Saving Frontend developer info: ${this.name}`);
};

const developer = new Developer('Jon');
const frontendDeveloper = new FrontendDeveloper('Doe');

developer.save();
frontendDeveloper.createUserInterface();
frontendDeveloper.save();

// console output
// Saving developer info: Jon
// Doe is creating a new user interface
// Saving Frontend developer info: Doe
```

#### Facade

Used to provide a simplified interface to a complicated system. Facade defines a higher-level interface that makes the subsystem easier to use, and also hides subsystem chaos from us.

> Think about the front of a builing

JQuery is probably the most well-known implementation of a Facade pattern. At its core, all JQuery does is sit on top of the DOM and give you a simple, clean interface to interacting with the DOM, instead of having to do all the nasting Javascript you have to do to change the name of a button or the class of something. So JQuery gives as a nice,clean, simple interface to deal with the DOM when we are trying to manipulate our web page.

### Behavioral

Concerned with the assignment of responsibilities between objects and how they communicate.

#### Observer pattern

The Observer Pattern defines a one to many dependency between objects so that one object changes state, all of its dependents are notified and updated automatically.

- One to many dependency is between Subject(One) and Observer(Many).
- There is dependency as Observers themselves don’t have access to data. They are dependent on Subject to provide them data.

> Allows a collection of objects(observers) to watch an object(subject) and be notified of changes

Advantages:
Provides a loosely coupled design between objects that interact. Loosely coupled objects are flexible with changing requirements. Here loose coupling means that the interacting objects should have less information about each other.

Observer pattern provides this loose coupling as:

- Subject only knows that observer implement Observer interface.Nothing more.
- There is no need to modify Subject to add or remove observers.
- We can reuse subject and observer classes independently of each other.

Disadvantages:

- Memory leaks caused by Lapsed listener problem because of explicit register and unregistering of observers.

> Consider using this pattern in your application when **multiple** objects are dependent on the state of **one** object as it provides a neat and well tested design for it.

## References

- [Wikipedia](https://en.wikipedia.org/wiki/Software_design_pattern)
- [Practical design patterns in JS - Pluralsight](https://app.pluralsight.com/library/courses/javascript-practical-design-patterns/table-of-contents)
