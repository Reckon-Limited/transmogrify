"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const td = require("testdouble");
process.env.DATABASE_URL = 'sqlite://./test';
const handlers_1 = require("../handlers");
const migration_1 = require("../migration");
describe('Handlers', function () {
    this.timeout(5000);
    const event = {};
    const context = {};
    after(() => {
        td.reset();
    });
    describe('up', () => {
        before(() => {
            td.replace(migration_1.Migration, 'up');
        });
        it('sets context.callbackWaitsForEmptyEventLoop', (done) => {
            handlers_1.up(event, context, (err, result) => {
                chai_1.expect(context.callbackWaitsForEmptyEventLoop).to.be.false;
                done();
            });
        });
        it('returns OK', (done) => {
            handlers_1.up(event, context, (err, result) => {
                console.log(result);
                chai_1.expect(result).to.eql('ok');
                done();
            });
        });
    });
    describe('down', () => {
        before(() => {
            td.replace(migration_1.Migration, 'down');
        });
        it('sets context.callbackWaitsForEmptyEventLoop', (done) => {
            handlers_1.down(event, context, (err, result) => {
                chai_1.expect(context.callbackWaitsForEmptyEventLoop).to.be.false;
                done();
            });
        });
        it('returns OK', (done) => {
            handlers_1.down(event, context, (err, result) => {
                chai_1.expect(result).to.eql('ok');
                done();
            });
        });
    });
});
