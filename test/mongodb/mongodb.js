"use strict";

const assert = require("assert");
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const dsn =  process.env.DB_DSN || "mongodb://localhost:27017/chat";
const db = require("../../src/mongodb/mongodb.js").mongoInit(dsn, 'test');

describe("Test database", function() {
    describe("Reset collection", function() {
        it("Should delete everything and insert one message", async () => {
            await db.reset();
            const data = await db.get();

            assert.equal(data.length, 0);
            await db.close();
        });
    });
    describe("Insert new message", function() {
        it("Should insert one message", async () => {
            var item = {
                user: "Andy",
                message: "Testing"
            };

            await db.insert(item);
            const data = await db.get();

            assert.equal(data[0].user, "Andy");
            assert.equal(data[0].message, "Testing");
            await db.close();
        });
    });
    describe("Update message", function() {
        it("Should update second message in database", async () => {
            const msg = await db.get();
            const old = msg[0];

            var item = {
                user: "Andy",
                message: "Edited"
            };

            await db.update(old._id, item);
            const data = await db.get();

            assert.equal(data[0].user, "Andy");
            assert.equal(data[0].message, "Edited");
            await db.close();
        });
    });
    describe("Delete message", function() {
        it("Should delete second message in database", async () => {
            const msg = await db.get();
            const old = msg[0];

            await db.delete(old._id);
            const data = await db.get();

            assert.equal(data[0], undefined);
            await db.close();
        });
    });
});
