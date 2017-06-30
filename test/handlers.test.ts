import { expect } from 'chai';
import * as td from 'testdouble';

process.env.DATABASE_URL = 'sqlite://./test'

// import * as handlers from '../handlers';

describe('Handlers', function() {
  this.timeout(5000);

  const event = {};
  const context: any = {};

  let handlers: any;

  before( () => {
    let Migration = td.constructor(['up', 'down']);

    td.replace('../migration', { Migration: Migration } )
    td.when(Migration.prototype.up()).thenReturn('001')
    td.when(Migration.prototype.down()).thenReturn('001')

    handlers = require("../handlers");
  })

  after( () => {
    td.reset()
  });

  describe('up', () => {

    it('sets context.callbackWaitsForEmptyEventLoop', (done) => {

      handlers.up(event, context, (err: Error, result: any) => {

        expect(context.callbackWaitsForEmptyEventLoop).to.be.false
        done();
      });
    });

    it('returns OK', (done) => {
      handlers.up(event, context, (err: Error, result: any) => {
        expect(result).to.eql('ok: 001')
        done();
      });
    });
  });

  describe('down', () => {

    it('sets context.callbackWaitsForEmptyEventLoop', (done) => {
      handlers.down(event, context, (err: Error, result: any) => {
        expect(context.callbackWaitsForEmptyEventLoop).to.be.false
        done();
      });
    });

    it('returns OK', (done) => {
      handlers.down(event, context, (err: Error, result: any) => {
        expect(result).to.eql('ok: 001')
        done();
      });
    });

  });
});
