"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const td = require("testdouble");
process.env.DATABASE_URL = 'sqlite://./test';
class Migration {
    static up() {
        return [{ file: 'a' }];
    }
    static down() {
        return [{ file: 'a' }];
    }
}
td.replace('../migration', { Migration: Migration });
const handlers_1 = require("../handlers");
describe('Handlers', function () {
    this.timeout(5000);
    const event = {};
    const context = {};
    before(() => {
    });
    after(() => {
    });
    describe('up', () => {
        before(() => {
        });
        it('sets context.callbackWaitsForEmptyEventLoop', (done) => {
            handlers_1.up(event, context, (err, result) => {
                chai_1.expect(context.callbackWaitsForEmptyEventLoop).to.be.false;
                done();
            });
        });
        it('returns OK', (done) => {
            handlers_1.up(event, context, (err, result) => {
                chai_1.expect(result).to.eql('ok: a');
                done();
            });
        });
    });
    describe('down', () => {
        before(() => {
        });
        it('sets context.callbackWaitsForEmptyEventLoop', (done) => {
            handlers_1.down(event, context, (err, result) => {
                chai_1.expect(context.callbackWaitsForEmptyEventLoop).to.be.false;
                done();
            });
        });
        it('returns OK', (done) => {
            handlers_1.down(event, context, (err, result) => {
                chai_1.expect(result).to.eql('ok: a');
                done();
            });
        });
    });
});
