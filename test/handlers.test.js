"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const td = require("testdouble");
process.env.DATABASE_URL = 'sqlite://./test';
describe('Handlers', function () {
    this.timeout(5000);
    const event = {};
    const context = {};
    let handlers;
    before(() => {
        let Migration = td.constructor(['up', 'down']);
        td.replace('../migration', { Migration: Migration });
        td.when(Migration.prototype.up()).thenReturn('001');
        td.when(Migration.prototype.down()).thenReturn('001');
        handlers = require("../handlers");
    });
    after(() => {
        td.reset();
    });
    describe('up', () => {
        it('sets context.callbackWaitsForEmptyEventLoop', (done) => {
            handlers.up(event, context, (err, result) => {
                chai_1.expect(context.callbackWaitsForEmptyEventLoop).to.be.false;
                done();
            });
        });
        it('returns OK', (done) => {
            handlers.up(event, context, (err, result) => {
                chai_1.expect(result).to.eql('ok: 001');
                done();
            });
        });
    });
    describe('down', () => {
        it('sets context.callbackWaitsForEmptyEventLoop', (done) => {
            handlers.down(event, context, (err, result) => {
                chai_1.expect(context.callbackWaitsForEmptyEventLoop).to.be.false;
                done();
            });
        });
        it('returns OK', (done) => {
            handlers.down(event, context, (err, result) => {
                chai_1.expect(result).to.eql('ok: 001');
                done();
            });
        });
    });
});
