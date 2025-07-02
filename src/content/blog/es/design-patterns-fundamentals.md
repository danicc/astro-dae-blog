---
id: "design-patterns-fundamentals"
date: "2020-04-16"
title: "Fundamentos de patrones de diseño"
description: "Es una solución reutilizable y genérica a un problema común dentro de un contexto. Además esta solución no debe ser obvia y constituirse de un concepto corroborado para dicho problema. Se los considera como buenas prácticas oficiales que un programador puede utilizar para resolver problemas comunes cuando diseña una aplicación o un sistema, pero se debe tener en cuenta que la solución planteada por el patrón de diseño tiene que ser independiente a los lenguajes de programación, esto significa que un patrón de diseño representa una idea, no una implementación particular. Al ser buenas practicas de programación, estos nos permiten crear código más flexible, reutilizable y mantenible."
category: "Programación"
tags: ["patrones-de-diseño", "javascripts"]
banner: "/images/bg/design-patterns-fundamentals.jpg"
locale: "es"
---

# Fundamentos de patrones de diseño

## ¿Qué es un patrón de diseño de software?

Es una solución reutilizable y genérica a un problema común dentro de un contexto. Además esta solución no debe ser obvia y constituirse de un concepto corroborado para dicho problema. Se los considera como buenas prácticas oficiales que un programador puede utilizar para resolver problemas comunes cuando diseña una aplicación o un sistema, pero se debe tener en cuenta que la solución planteada por el patrón de diseño tiene que ser independiente a los lenguajes de programación, esto significa que un patrón de diseño representa una idea, no una implementación particular. Al ser buenas practicas de programación, estos nos permiten crear código más flexible, reutilizable y mantenible.

## Clasificación

Existen tres tipos principales de patrones de diseño:

### Creacionales

Proveen mecanismos para crear objetos basándose en cierto criterio y de una forma controlada.

#### Prototype

Es utilizado cuando el tipo de los objetos a ser creados es determinado por una instancia prototipal, la cual es clonada para producir nuevos objetos
Este patrón es usado para:

- evitar subclases del objeto creador(padre).
- evitar el costo inherente de crear un nuevo objeto de la manera estándar(usando la palabra clave `new`) cuando este es demasiado grande para una aplicación.

Prototype - Es una encapsulación de propiedades o métodos con la cual un objeto se vincula o relaciona.

```javascript
const Developer = function (name) {
  this.name = name;
  this.skills = [];
};

Developer.prototype.addSkill = function (skill) {
  console.log(`adding skill: ${skill}`);
  this.skills.push(skill);
};

Developer.prototype.save = function () {
  console.log(`Saving developer info: ${this.name}`);
};

const developerOne = new Developer("Jon");
const developerTwo = new Developer("Doe");

developerOne.addSkill("design patterns");
developerOne.save();
developerTwo.save();

// console output
// adding skill: design patterns
// Saving developer info: Jon
// Saving developer info: Doe
```

Cada nueva copia/instancia del objeto `Developer` se vincula al prototipo, el cual es solamente un objeto y por lo tanto este no se estará duplicando

#### Factory

Es utilizado para simplificar la creación de objetos ya que en ocasiones esto puede ser complicado, debido a configuraciones u otros factores, por lo tanto este patrón es utilizado para simplificar y esconder mucho al frontend. En otras palabras, es usado para crear objetos sin exponer la lógica de dicha creación al cliente y este usará una interfaz común para crear un nuevo tipo de objeto.

```javascript
// developerRepository.js
const developerRepository = function () {
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
const repoFactory = function () {
  let repos = this;
  const repoList = [
    { name: "developer", source: "./developerRepository" },
    { name: "project", source: "./projectRepository" },
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

El `projectRepository` es muy similar a`developerRepository`. Este ejemplo está en node.js y en él creamos diferentes objetos `repositories` utilizando la función `facotry`.

#### Singleton

Restringe la instanciación de una clase a una única instancia. Es utilizado para restringir a un objeto a una sola instancia de el mismo. Este patrón de diseño se basa en recordar la instancia y retornarla cuando sea solicitada.

En node.js, los modules son almacenados o "cached" la primera vez que se los carga (modules-caching)[https://nodejs.org/api/modules.html#modules_caching]. Entonces si miras `developerRepository` en el patrón de diseño de factory, veras que estamos implementando un `singleton` ya que llamamos a la función y exportamos el objeto retornado de la misma.

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

De esta manera, cada vez que requerimos el módulo de esta forma `const developerRepo = require('./developerRepository')`, estamos obteniendo la misma instancia/copia del objeto

Therefore every time we require this module `const developerRepo = require('./developerRepository')` we are going to get the same object instance.

> Para que un module ejecute su código multiples veces, se debe exportar una función y luego llamar dicha función.

Entonces si no queremos definir un `singleton` deberíamos hacer lo siguiente.

```javascript
//developerRepository.js
module.exports = developerRepository;

//main.js
const developerRepo = require("./developerRepository");
const myRepo = developerRepo();

//other.js
const developerRepo = require("./developerRepository");
const otherRepo = developerRepo();
```

### Estructurales

Se ocupan de cómo los objetos son construidos y simplifican las relaciones entre ellos. Se encargan de estas relaciones entre los objetos de dos formas, extendiendo o simplificando funcionalidades de un objeto determinado.

#### Decorator

Agregan funcionalidades a un objeto dinámicamente sin afectar el comportamiento de otros objetos de la misma clase. Este patrón de diseño es a menudo utilizado para complementar el -Pincipio de responsabilidad única- , ya que este permite dividir la funcionalidad entre clases, cada una responsable de una funcionalidad particular.

> Es utilizado para agregar nuevas funcionalidades sobre objeto existente pero sin cambiar la estructura del mismo.

```javascript
const Developer = function (name) {
  this.name = name;
  this.skills = [];
};

Developer.prototype.addSkill = function (skill) {
  console.log(`adding skill: ${skill}`);
  this.skills.push(skill);
};

Developer.prototype.save = function () {
  console.log(`Saving developer info: ${this.name}`);
};

// create new object extending developer object
const FrontendDeveloper = function (name) {
  Developer.call(this, name);
};

FrontendDeveloper.prototype = Object.create(Developer.prototype);
FrontendDeveloper.prototype.createUserInterface = function () {
  console.log(`${this.name} is creating a new user interface`);
};
FrontendDeveloper.prototype.save = function () {
  console.log(`Saving Frontend developer info: ${this.name}`);
};

const developer = new Developer("Jon");
const frontendDeveloper = new FrontendDeveloper("Doe");

developer.save();
frontendDeveloper.createUserInterface();
frontendDeveloper.save();

// console output
// Saving developer info: Jon
// Doe is creating a new user interface
// Saving Frontend developer info: Doe
```

`FrontendDeveloper` extiende o agrega nuevas funcionalidades a partir del objeto `Developer`, la ventaja es que el objeto `Developer` no se modificara

#### Facade

Utilizado para proveer una interfaz simplificada de un sistema complejo. Facade define una interfaz de nivel superior que hace al subsistema facil de usar y además esconde el caos del subsistema a los usuarios.

> Visualiza el frente o fachada de un edificio

JQuery es probablemente la implementación más conocida del patrón de diseño `Facade`. En su núcleo, JQuery complementa al DOM creando una interfaz para interactuar con este de manera simple y entendible.

### De Comportamiento

#### Observer

Define una dependencia de uno a muchos objetos así cuando el estado de un objeto cambia, todos los objetos relacionados son notificados y actualizados automáticamente.

- La dependencia de --uno a muchos-- es entre un Sujeto(uno) y Observadores(Muchos)
- Existe una dependencia ya que los Observadores no tienen acceso directo a los datos sino que el Sujeto es el que provee a los Observadores de estos datos

> Permite a una colección de objetos(observadores) estar pendientes de un objeto(sujeto) y ser notificados ante un cambio.

Ventajas:
Causa un bajo acoplamiento entre las interacciones de los objetos, generando objetos más flexibles ante los cambios de requerimientos.En si este bajo acoplamiento significa que los objetos deben tener menos información sobre el resto.

Observer pattern provides this loose coupling as:

- El Sujeto solo sabe que el observer implementa una interfaz Observer. Nada más
- No hay necesidad de modificar el Sujeto para agregar o remover observadores
- Se pueden reutilizar las clases del sujeto y observador independientemente una de la otra.

> Considera usar este patrón en tu aplicación cuando **multiples** objetos dependen del estado de **un** objeto

## Referencias

- [Wikipedia](https://en.wikipedia.org/wiki/Software_design_pattern)
- [Practical design patterns in JS - Pluralsight](https://app.pluralsight.com/library/courses/javascript-practical-design-patterns/table-of-contents)
