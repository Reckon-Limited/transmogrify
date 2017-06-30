import { expect } from 'chai';
// import * as td from 'testdouble';

import { Migration } from '../migration';

const DATABASE_URL = 'sqlite://./test';

describe('Migration', function() {
  this.timeout(5000);

  after( () => {

  });

  before( () => {

  })

  it('initializes sequelize', () => {    
    let migration = new Migration(DATABASE_URL);
    expect(migration.sequelize).to.exist
    expect(migration.umzug).to.exist
  });

});
