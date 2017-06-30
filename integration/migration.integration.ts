import { expect } from 'chai';
import * as td from 'testdouble';

// process.env.DATABASE_URL = 'postgres://toby.hede:@localhost:5432/postgres'
// import { Migration } from '../migration'

describe('Migration', function() {
  this.timeout(5000);

  after( () => {
    td.reset()
  });

  // describe('create', () => {
  //
  //   before( () => {
  //     // td.replace(Migration, 'create') //.return(['ok'])
  //   })
  //
  //   it.only('creates a database', async () => {
  //     await Migration.drop('test1');
  //     let password = await Migration.create('test1');
  //     console.log(password);
  //     expect(password).to.not.be.undefined
  //   });
  //
  // });


});
