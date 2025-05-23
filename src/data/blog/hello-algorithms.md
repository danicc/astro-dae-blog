---
id: 'hello-algorithms'
date: '2020-04-08'
title: 'Hello Algorithms'
description: 'Is a finite sequence of steps or instructions followed to solve a problem, also they must be accurate and unambiguous. Writing them using natural language expressions is a bad idea because they usually are verbose and ambiguous, therefore to define them there are better tools like pseudocode, flowcharts and programming languages, considering the programming languages as the best tool for expressing algorithms because they allow as to write them in way that is going to be understandable and executable by computers.'
category: 'Programming'
tags: ['algorithms', 'programming']
banner: '/images/bg/hello-algorithms.jpg'
locale: 'en'
---

# Algorithms

## What is an algorithm?

Is a finite sequence of steps or instructions followed to solve a problem, also they must be accurate and unambiguous. Writing them using natural language expressions is a bad idea because they usually are verbose and ambiguous, therefore to define them there are better tools like **pseudocode**, **flowcharts** and **programming languages**, considering the programming languages as the best tool for expressing algorithms because they allow as to write them in way that is going to be understandable and executable by computers.

There are two measures to estabish the efficiency of an algorithm written in any programming language, these will measure time and space complexity. Is very important to work with efficient algorithms, because an optimal algorithm even running in old hardware, would produce faster results than a non-optimal algorithm for the same purpose, running in more effiecient hardware(that is why algorithms, like computer hardware, are considered technology).

> Time and Space complexity is expressed using big O notation for worst cases.

## Clasification

### By Implementation:

- Logical.
- Serial, parallel or distributed.
- Deterministic or non-deterministic.
- Exact or approximate.
- Quantum algorithm.
- **Recursion**:
  A recursive algorithm is one that invokes(makes reference to) itself repeatedly until a certain condition (also known as base or termination condition) matches, which is a method common to functional programming. Every recursive version has an equivalent (but possibly more or less complex) iterative version, and vice versa. A particular problem is solved using recursion representing it in terms of one or more smaller problems, and add one or more base conditions that stop the recursion. Recursive algorithms could throw Stack Overflow errors, this happends if the base case is not reached or not defined, then stack overflow problem may arise.

### By design paradigm:

The most common paradigms are:

- Brute-force or exhaustive search: This is the naive method of trying every possible solution to see which is best.
- Divide and conquer: Repeatedly reduces an instance of a problem to one or more small instances of the same problem(usually recursively) until the instances are small enough to solve easily. Merge sorting is a good example of divide and conquer, and the binary search algorithm is considered as decrease and conquer because the conquer stage is less complex.
- Search and enumeration: Many problems (such as playing chess) can be modeled as problems on graphs. A graph exploration algorithm specifies rules for moving around a graph and is useful for such problems. This category also includes search algorithms, branch and bound enumeration and backtracking.

### Optimization problems

An algorithm for such problems may fall into one or more of the general categories described above as well into one of the following:

- Linear programming
- Dynamic programming: When a problem shows optimal substructures, meaning the optimal solution to a problem can be constructed from optimal solutions to subproblems and overlapping subproblems. Therefore the same subproblems are used to solve many different problem instances, we could use dynamic programming that avoids recomputing solutions that have already been computed.
  In other words dynamic programming is an optimization over plain recursion. Wherever we see a recursive solution that has repeated calls for same inputs, we can optimize it using Dynamic Programming. The idea is to simple **store the results** of subproblems, so that we do not have to re-compute them when needed later.
- Greedy method: Is similar to dynamic programming algorithms in that it works by examining substructures, in this case not of the problem but of a given solution. Such algorithms start with some solution, which may be given or have been constructed in some way, and improve it by making small modifications.
  It builds up a solution piece by piece, always choosing the next piece that offers the most obvious and immediate benefit. So the problems where choosing locally optimal also leads to global solution are best fit for Greedy.

> The difference between Dynamic programming and Divide and Conquer is that the subproblems are more or less independent in divide and conquer, whereas subproblems overlap in dynamic programming.

> The difference between Dynamic programming and straightforward recursion is in caching or memoization of recursive calls.

### By complexity

- Constant time: if the time needed by the algorithm is the same, regardless of the input size. E.g. an access to an array element.
- Logarithmic time: if the time is a logarithmic function of the input size. E.g. binary search algorithm.
- Linear time: if the time is proportional to the input size. E.g. the traverse of a list.
- Polynomial time: if the time is a power of the input size. E.g. the bubble sort algorithm has quadratic time complexity.
- Exponential time: if the time is an exponential function of the input size. E.g. Brute-force search.
