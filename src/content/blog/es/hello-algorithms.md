---
id: "hello-algorithms"
date: "2020-04-08"
title: "Hola Algoritmos"
description: "Es una secuencia finita de pasos o instrucciones seguidos para resolver un problema, también deben ser precisos y no-ambiguos. Escribirlos utilizando expresiones del lenguaje natural es una mala idea porque usualmente son verborrágicos y ambiguos, por lo tanto para definirlos existen mejores herramientas como pseudocódigo, diagramas de flujo y lenguajes de programación. Siendo los lenguajes de programación la herramienta estrella para escribir algoritmos debido a que nos brindan la posibilidad de que dicho algoritmo sea entendido y ejecutado por la computadora."
category: "Programación"
tags: ["algoritmos", "programación"]
banner: "/images/bg/hello-algorithms.jpg"
locale: "es"
---

# Algoritmos

### ¿Qué es un algoritmo?

Es una secuencia finita de pasos o instrucciones seguidos para resolver un problema, también deben ser precisos y no-ambiguos. Escribirlos utilizando expresiones del lenguaje natural es una mala idea porque usualmente son verborrágicos y ambiguos, por lo tanto para definirlos existen mejores herramientas como **pseudocódigo**, **diagramas de flujo** y **lenguajes de programación**. Siendo los lenguajes de programación la herramienta estrella para escribir algoritmos debido a que nos brindan la posibilidad de que dicho algoritmo sea entendido y ejecutado por la computadora.

Existen dos medidas para establecer la eficiencia de un algoritmo escrito en cualquier lenguaje de programación, estas medirán la complejidad del tiempo y espacio. Es muy importante trabajar con algoritmos eficientes debido a que ellos, incluso ejecutándose en hardware más antiguo, podrían producir resultados más rápido que un algoritmo no-óptimo con el mismo propósito ejecutándose en mejor hardware(por esto los algoritmos, como el hardware, es considerado tecnología).

> Complejidad de tiempo y espacio es expresada utilizando la notación de "Big O" para los peores casos.

## Clasificación

### Por implementación:

- Lógicos.
- Seriales, paralelos o distribuidos.
- Determinista o no-determinista.
- Exactos o de aproximación.
- **Recursivos**: Un algoritmo recursivo es aquel que se invoca o hace referencia a sí mismo repetidamente hasta que se cumple cierta condición(denominada como condición base o de terminación), esta es una práctica muy común en programación funcional. Cada versión recursiva tiene una versión iterativa equivalente (más o menos compleja) y viceversa. Se resuelve un problema específico utilizando recursividad, al dividirlo en uno o más subproblema, que en cada ejecución se acerquen a cumplir la condición base y de esta forma parar la recursividad.

### Por el paradigma de diseño:

Existen muchos paradigmas incluyendo diferentes tipos de algoritmos. Los paradigmas más comunes son:

- Fuerza bruta: Resuelve el problema probando cada posible solución hasta decidir cuál es la mejor.
- Divide y vencerás(Divide and conquer): Repetidamente reduce la instancia de un problema en una o más instancias del mismo problema(recursivamente) hasta que las instancias son lo suficientemente pequeñas para resolverlas fácilmente. `Merge sort` es un ejemplo perfecto del divide y vencerás en cambio el algoritmo de `binary search` es considerado como decrementar y conquistar(decrease and conquer) ya que la fase de conquistar es menos compleja.
- Búsqueda y enumeración: Muchos problemas(como jugar ajedrez) pueden ser modelados como problemas de grafos. Son útiles para resolver estos problemas los algoritmos de exploración de grafos que especifican reglas para moverse dentro de ellos. Esta categoría también incluye algoritmos de búsqueda, `branch and bound`, entre otros.

### Problemas de optimización

Un algoritmo para estos problemas podría categorizarse en uno o más de las categorías definidas anteriormente como también en alguna de las siguientes:

- programación Lineal.
- Programación dinámica: Cuando la solución óptima puede ser construida a partir de las soluciones óptimas de subproblemas y a su vez estas soluciones son utilizadas repetidamente para resolver otras instancias del problema, se puede usar la programación dinámica que evita volver a calcular las soluciones óptimas a los subproblemas que ya fueron resueltos.
  En otras palabras la programación dinámica es un una optimización sobre un algoritmo recursivo básico. Dónde sea que vemos una solución recursiva que tiene llamadas repetidas para las mismas entradas, se puede utilizar programación dinámica. La idea es simplemente **almacenar los resultados** de los subproblemas para no volver a calcularlos cuando se los necesite.
- Codiciosos (Greedy algorithms )
  Es similar a la programación dinámica ya que funciona examinando subestructuras, en estos casos se tiene en cuenta la solución encontrada y no el problema. Dichos algoritmos empiezan con una solución que puede ser construida de alguna forma de antemano y la continúan mejorando con pequeñas modificaciones.
  Construye una solución pieza a pieza, siempre eligiendo la siguiente pieza que ofrece el beneficio más obvio e inmediato.

> La diferencia entre dynamic programming y divide and conquer es que los subproblemas tienden a ser más independientes en los algoritmos de divide and conquer, donde los subproblemas en la programación dinámica se superponen.

> La diferencia entre programación dinámica y la recursividad es el `caching` o `memoization` de las llamadas recursivas.

## Por complejidad

Pueden ser clasificados por la cantidad de tiempo y espacio que necesitan para ejecutarse. Se tiene en cuenta el tamaño de la entrada para poder calcular la complejidad de los mismos.

- Constante: El tiempo necesitado por el algoritmo es el mismo sin importar la variación del tamaño de la entrada. Por ejemplo el acceso al elemento de un array.
- Logarítmico: Si se calcula a través de una función logarítmica.
- Lineal: La medida es proporcional al tamaño de la entrada.
- Polinomial.
- Exponencial.
