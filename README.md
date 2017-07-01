# [kademlia-dht-js](https://github.com//kademlia-dht-js)

[![NPM version](http://img.shields.io/npm/v/kademlia-dht-js.svg?style=flat-square)](https://www.npmjs.com/package/kademlia-dht-js)
[![NPM downloads](http://img.shields.io/npm/dm/kademlia-dht-js.svg?style=flat-square)](https://www.npmjs.com/package/kademlia-dht-js)
[![Build Status](http://img.shields.io/travis//kademlia-dht-js/master.svg?style=flat-square)](https://travis-ci.org//kademlia-dht-js)
[![Coverage Status](https://img.shields.io/coveralls//kademlia-dht-js.svg?style=flat-square)](https://coveralls.io//kademlia-dht-js)
[![Dependency Status](http://img.shields.io/david//kademlia-dht-js.svg?style=flat-square)](https://david-dm.org//kademlia-dht-js)

> 

### How to Install

```sh
$ npm install kademlia-dht-js
```

### Getting Started

Kademlia has two main concepts:
 - `KademliaNode` - has an id and constructors for creating a random nodes and nodes with predefined ids. 
 - `KademliaRoutingTable` - after being initialised the Routing table can be updated with KademliaNodes which will then 
 be allocated in buckets. Node lookups are supported via the `findClosest` method.

### How to Test

Run one, or a combination of the following commands to lint and test your code:

```sh
$ npm run lint          # Lint the source code with ESLint
$ npm test              # Run unit tests with Mocha
$ npm run test:watch    # Run unit tests with Mocha, and watch files for changes
$ npm run test:cover    # Run unit tests with code coverage by Istanbul
```

### License

MIT © 2016 
