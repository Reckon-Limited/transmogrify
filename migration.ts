import * as pg from 'pg';
import * as Sequelize from 'sequelize';
import * as Umzug from 'umzug';

const _ = pg; //typescript will ignore unused imports

process.env.DATABASE_URL = 'postgres://toby.hede:@localhost:5432/postgres'
const sequelize = new Sequelize(process.env.DATABASE_URL);

const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: sequelize,
    },
    migrations: {
      params: [
        sequelize.getQueryInterface(), // queryInterface
        sequelize.constructor, // DataTypes
      ]
    },
    logging: function() {
      console.log.apply(null, arguments);
    }
});

export class Migration {

  static up() {
    return umzug.up();
  }

  static down() {
    return umzug.down();
  }

  static async drop(name: string) {
    let revokeUser = `REVOKE ALL PRIVILEGES ON DATABASE ${name} FROM ${name};`;
    let dropDb = `DROP DATABASE IF EXISTS ${name}`;
    let dropUser = `DROP ROLE IF EXISTS ${name};`;

    await sequelize.query(revokeUser);
    await sequelize.query(dropUser);
    await sequelize.query(dropDb);
  }

  static async create(name: string) {

    let password = Math.random().toString(36).substring(2, 20);

    let createDb = `CREATE DATABASE ${name}`;
    let createUser = `CREATE ROLE ${name} WITH LOGIN PASSWORD '${password}' NOINHERIT`;
    let grantUser = `GRANT ALL PRIVILEGES ON DATABASE ${name} TO ${name};`;

    try {
      await sequelize.query(createDb);
      await sequelize.query(createUser);
      await sequelize.query(grantUser);
    } catch(err) {
      console.log('Rolling back create');
      Migration.drop(name);

      throw err;
    }

    return password;
  }
}
