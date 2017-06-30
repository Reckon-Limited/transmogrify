import * as pg from 'pg';
import * as Sequelize from 'sequelize';
import * as Umzug from 'umzug';

const _ = pg; //typescript will ignore unused imports

export class Migration {
  url: string

  private _sequelize: Sequelize.Sequelize;
  private _umzug: Umzug.Umzug;

  constructor(url: string) {
    this.url = url;
    this.init();
  }

  private init() {
    let opts = {
      pool: {
        max: 1,
        min: 0,
        idle: 5000
      }
    }
    this._sequelize = new Sequelize(this.url, opts);

    this._umzug = new Umzug({
        storage: 'sequelize',
        storageOptions: {
          sequelize: this.sequelize
        },
        migrations: {
          params: [
            this._sequelize.getQueryInterface(), // queryInterface
            this._sequelize.constructor // DataTypes
          ]
        },
        logging: function() {
          console.log.apply(null, arguments);
        }
    });
  }

  get sequelize() {
    return this._sequelize;
  }

  get umzug() {
    return this._umzug;
  }

  up() {
    let results: any = this.umzug.up();
    return results.map( (m: {file: string}) => m.file);
  }

  down() {
    let results: any = this.umzug.down();
    return results.map( (m: {file: string}) => m.file);
  }

  async drop(name: string) {

    let disableConnections = `UPDATE pg_database SET datallowconn = false WHERE datname = '${name}'`;
    let terminateBackend = `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '${name}'`;
    let revokeUser = `REVOKE ALL PRIVILEGES ON DATABASE ${name} FROM ${name};`;
    let dropUser = `DROP ROLE ${name};`;
    let dropDb = `DROP DATABASE ${name}`;

    console.log(`Dropping Database and User: ${name}`);

    try {
      await this.sequelize.query(disableConnections);
      await this.sequelize.query(terminateBackend);
      await this.sequelize.query(revokeUser);
      await this.sequelize.query(dropUser);
      await this.sequelize.query(dropDb);
    } catch(err) {
      console.log(`Error Dropping Database and User: ${name}`);
      console.log(err);
      throw err;
    }
  }

  async create(name: string) {

    let password = Math.random().toString(36).substring(2, 20);

    let createDb = `CREATE DATABASE ${name}`;
    let createUser = `CREATE ROLE ${name} WITH LOGIN PASSWORD '${password}' NOINHERIT`;
    let grantUser = `GRANT ALL PRIVILEGES ON DATABASE ${name} TO ${name};`;

    console.log(`Creating Database and User: ${name}`);

    try {
      await this.sequelize.query(createDb);
      await this.sequelize.query(createUser);
      await this.sequelize.query(grantUser);
    } catch(err) {
      console.log(`Error Creating Database and User: ${name}`);
      console.log('Rollback');
      this.drop(name);
      throw err;
    }

    return password;
  }
}
