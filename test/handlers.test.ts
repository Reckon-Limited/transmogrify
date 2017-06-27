import { expect } from 'chai';
import * as Sequelize from 'sequelize';
import * as sinon from 'sinon';

process.env.DATABASE_URL = 'sqlite://./test'

import { up, down } from '../handlers';
import { Migration } from '../migration'

describe('Handlers', function() {
  this.timeout(5000);

  const event = {};
  const context: any = {};

  const sandbox = sinon.sandbox.create();

  after( () => {
    sandbox.restore();
  });

  describe('up', () => {

    let stub = sandbox.stub(Migration, 'up');

    it('calls up migration', (done) => {
      up(event, context, (err: Error, result: any) => {
        expect(stub.calledOnce).to.be
        done();
      });
    });

    it('sets context.callbackWaitsForEmptyEventLoop', (done) => {
      up(event, context, (err: Error, result: any) => {
        expect(context.callbackWaitsForEmptyEventLoop).to.be.false
        done();
      });
    });

    it('returns 200', (done) => {
      up(event, context, (err: Error, result: any) => {
        expect(result.statusCode).to.eql(200)
        done();
      });
    });

    it('returns OK', (done) => {
      up(event, context, (err: Error, result: any) => {
        expect(result.body).to.eql('ok')
        done();
      });
    });
  });

  describe('down', () => {
    let stub = sandbox.stub(Migration, 'down');

    it('calls down migration', (done) => {
      up(event, context, (err: Error, result: any) => {
        expect(stub.calledOnce).to.be
        done();
      });
    });

    it('sets context.callbackWaitsForEmptyEventLoop', (done) => {
      up(event, context, (err: Error, result: any) => {
        expect(context.callbackWaitsForEmptyEventLoop).to.be.false
        done();
      });
    });

    it('returns 200', (done) => {
      up(event, context, (err: Error, result: any) => {
        expect(result.statusCode).to.eql(200)
        done();
      });
    });

    it('returns OK', (done) => {
      up(event, context, (err: Error, result: any) => {
        expect(result.body).to.eql('ok')
        done();
      });
    });

  });
});
