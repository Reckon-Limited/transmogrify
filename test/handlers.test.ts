import { expect } from 'chai';
import * as td from 'testdouble';

process.env.DATABASE_URL = 'sqlite://./test'


class Migration {
  static up() {
    return [{file: 'a'}]
  }
  static down() {
    return [{file: 'a'}]
  }
}

td.replace('../migration', { Migration: Migration })

import { up, down } from '../handlers';

describe('Handlers', function() {
  this.timeout(5000);

  const event = {};
  const context: any = {};

  before( () => {

  });


  after( () => {
    // td.reset()
  });

  describe('up', () => {

    before( () => {
      // let up = td.replace(Migration, 'up')
      // console.log(up)
    })

    it('sets context.callbackWaitsForEmptyEventLoop', (done) => {
      up(event, context, (err: Error, result: any) => {
        expect(context.callbackWaitsForEmptyEventLoop).to.be.false
        done();
      });
    });

    it('returns OK', (done) => {
      up(event, context, (err: Error, result: any) => {
        expect(result).to.eql('ok: a')
        done();
      });
    });
  });

  describe('down', () => {

    before( () => {
      // td.replace(Migration, 'down')
    })

    it('sets context.callbackWaitsForEmptyEventLoop', (done) => {
      down(event, context, (err: Error, result: any) => {
        expect(context.callbackWaitsForEmptyEventLoop).to.be.false
        done();
      });
    });


    it('returns OK', (done) => {
      down(event, context, (err: Error, result: any) => {
        expect(result).to.eql('ok: a')
        done();
      });
    });

  });
});
