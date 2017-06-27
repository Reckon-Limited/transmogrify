"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
process.env.DATABASE_URL = 'sqlite://./test';
const handlers_1 = require("../handlers");
const migration_1 = require("../migration");
describe('Handlers', function () {
    this.timeout(5000);
    const event = {};
    const context = {};
    const sandbox = sinon.sandbox.create();
    after(() => {
        sandbox.restore();
    });
    describe('up', () => {
        let stub = sandbox.stub(migration_1.Migration, 'up');
        it('calls up migration', (done) => {
            handlers_1.up(event, context, (err, result) => {
                chai_1.expect(stub.calledOnce).to.be;
                done();
            });
        });
        it('sets context.callbackWaitsForEmptyEventLoop', (done) => {
            handlers_1.up(event, context, (err, result) => {
                chai_1.expect(context.callbackWaitsForEmptyEventLoop).to.be.false;
                done();
            });
        });
        it('returns 200', (done) => {
            handlers_1.up(event, context, (err, result) => {
                chai_1.expect(result.statusCode).to.eql(200);
                done();
            });
        });
        it('returns OK', (done) => {
            handlers_1.up(event, context, (err, result) => {
                chai_1.expect(result.body).to.include('ok');
                done();
            });
        });
    });
    describe('down', () => {
        let stub = sandbox.stub(migration_1.Migration, 'down');
        it('calls down migration', (done) => {
            handlers_1.up(event, context, (err, result) => {
                chai_1.expect(stub.calledOnce).to.be;
                done();
            });
        });
        it('sets context.callbackWaitsForEmptyEventLoop', (done) => {
            handlers_1.up(event, context, (err, result) => {
                chai_1.expect(context.callbackWaitsForEmptyEventLoop).to.be.false;
                done();
            });
        });
        it('returns 200', (done) => {
            handlers_1.up(event, context, (err, result) => {
                chai_1.expect(result.statusCode).to.eql(200);
                done();
            });
        });
        it('returns OK', (done) => {
            handlers_1.up(event, context, (err, result) => {
                chai_1.expect(result.body).to.include('ok');
                done();
            });
        });
    });
});
