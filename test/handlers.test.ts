import { expect } from 'chai';
import * as td from 'testdouble';

process.env.DATABASE_URL = 'sqlite://./test'

// const Migration = td.replace('./migration')

import { up, down } from '../handlers';
import { Migration } from '../migration'

describe('Handlers', function() {
  this.timeout(5000);

  const event = {};
  const context: any = {};

  after( () => {
    td.reset()
  });

  describe('up', () => {

    before( () => {
      td.replace(Migration, 'up') //.return(['ok'])
    })

    it('sets context.callbackWaitsForEmptyEventLoop', (done) => {
      up(event, context, (err: Error, result: any) => {
        expect(context.callbackWaitsForEmptyEventLoop).to.be.false
        done();
      });
    });

    // it('returns 200', (done) => {
    //   up(event, context, (err: Error, result: any) => {
    //     expect(result.statusCode).to.eql(200)
    //     done();
    //   });
    // });

    it('returns OK', (done) => {
      up(event, context, (err: Error, result: any) => {
        console.log(result);
        expect(result).to.eql('ok')
        done();
      });
    });
  });

  describe('down', () => {

    before( () => {
      td.replace(Migration, 'down')
    })

    it('sets context.callbackWaitsForEmptyEventLoop', (done) => {
      down(event, context, (err: Error, result: any) => {
        expect(context.callbackWaitsForEmptyEventLoop).to.be.false
        done();
      });
    });

    // it('returns 200', (done) => {
    //   down(event, context, (err: Error, result: any) => {
    //     expect(result.statusCode).to.eql(200)
    //     done();
    //   });
    // });

    it('returns OK', (done) => {
      down(event, context, (err: Error, result: any) => {
        expect(result).to.eql('ok')
        done();
      });
    });

  });
});
