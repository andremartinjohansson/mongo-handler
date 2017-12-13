Mongodb Handler
==============

[![Travis CI Build Status](https://api.travis-ci.org/andymartinj/mongo-handler.svg?branch=master)](https://travis-ci.org/andymartinj/mongo-handler)
[![Maintainability](https://api.codeclimate.com/v1/badges/fbfb99c6a84296e537e8/maintainability)](https://codeclimate.com/github/andymartinj/mongo-handler/maintainability)
[![Scrutinizer Build](https://scrutinizer-ci.com/g/andymartinj/mongo-handler/badges/build.png?b=master)](https://scrutinizer-ci.com/g/andymartinj/mongo-handler/?branch=master)
[![Code Quality](https://scrutinizer-ci.com/g/andymartinj/mongo-handler/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/andymartinj/mongo-handler/?branch=master)
[![Code Coverage Status](https://coveralls.io/repos/github/andymartinj/mongo-handler/badge.svg?branch=1.0.0)](https://coveralls.io/github/andymartinj/mongo-handler?branch=1.0.0)

Module for connecting and using mongodb

## Installation

```
npm install mongo-amj --save
```

## Setup

```javascript
const dsn = "mongodb://localhost:27017/chat";
const db  = require('mongo-amj').init(dsn, 'collection');
```

## Usage

**Get data from collection**
```javascript
const data = await db.get();
```

**Insert an item**
```javascript
var item = {
    user: "Andy",
    message: "Testing"
};

await db.insert(item);
```

**Update an item**
```javascript
const msg = await db.get();
const old = msg[1];

var item = {
    user: "Andy",
    message: "Edited"
};

await db.update(old._id, item);
```

**Remove an item**
```javascript
const msg = await db.get();
const old = msg[1];

await db.delete(old._id);
```

**Reset collection**
```javascript
await db.reset();
```

**Express example, use database with submit form**
```javascript
// Get data from collection and send it to view
router.get("/crud", async (req, res) => {
    const data = await db.get();

    await db.close();
    res.render("crud", {
        title: "Crud",
        items: data
    });
});
// Insert object and return to previous page
router.post("/insert", async (req, res) => {
    var item = {
        make: req.body.make,
        model: req.body.model,
        submodel: req.body.submodel,
        year: req.body.year
    };

    try {
        await db.insert(item);
        res.redirect('back');
    } catch (err) {
        console.log(err);
    }
});
// Update object and return to previous page
router.post("/update", async (req, res) => {
    var item = {
        make: req.body.make,
        model: req.body.model,
        submodel: req.body.submodel,
        year: req.body.year
    };

    try {
        await db.update(req.body.id, item);
        res.redirect('back');
    } catch (err) {
        console.log(err);
    }
});
// Delete an item and return to previous page
router.post("/delete", async (req, res) => {
    try {
        await db.delete(req.body.id);
        res.redirect('back');
    } catch (err) {
        console.log(err);
    }
});
// Reset collection and return to previous page
router.post("/reset", async (req, res) => {
    try {
        await db.reset();
        await db.close();
        res.redirect('back');
    } catch (err) {
        console.log(err);
    }
});
```
