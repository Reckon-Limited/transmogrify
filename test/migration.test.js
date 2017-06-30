"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const migration_1 = require("../migration");
const DATABASE_URL = 'sqlite://./test';
describe('Migration', function () {
    this.timeout(5000);
    after(() => {
    });
    before(() => {
    });
    it('initializes sequelize', () => {
        let migration = new migration_1.Migration(DATABASE_URL);
        chai_1.expect(migration.sequelize).to.exist;
        chai_1.expect(migration.umzug).to.exist;
    });
});
