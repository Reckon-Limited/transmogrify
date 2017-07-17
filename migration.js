"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg = require("pg");
const Sequelize = require("sequelize");
const Umzug = require("umzug");
const _ = pg;
class Migration {
    constructor(url) {
        this.url = url;
        this.init();
    }
    init() {
        let opts = {
            pool: {
                max: 1,
                min: 0,
                idle: 5000
            }
        };
        this._sequelize = new Sequelize(this.url, opts);
        this._umzug = new Umzug({
            storage: 'sequelize',
            storageOptions: {
                sequelize: this.sequelize
            },
            migrations: {
                params: [
                    this._sequelize.getQueryInterface(),
                    this._sequelize.constructor
                ]
            },
            logging: function () {
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
        let results = this.umzug.up();
        return results.map((m) => m.file);
    }
    down() {
        let results = this.umzug.down();
        return results.map((m) => m.file);
    }
    check() {
        return __awaiter(this, void 0, void 0, function* () {
            let disableConnections = 'SELECT 1 = 1;';
            console.log('Checking connection to Database');
            try {
                yield this.sequelize.query(disableConnections);
            }
            catch (err) {
                console.log('Error checking connection to Database');
                console.log(err);
                throw err;
            }
        });
    }
    drop(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let disableConnections = `UPDATE pg_database SET datallowconn = false WHERE datname = '${name}'`;
            let terminateBackend = `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '${name}'`;
            let revokeUser = `REVOKE ALL PRIVILEGES ON DATABASE ${name} FROM ${name};`;
            let dropUser = `DROP ROLE ${name};`;
            let dropDb = `DROP DATABASE ${name}`;
            console.log(`Dropping Database and User: ${name}`);
            try {
                yield this.sequelize.query(disableConnections);
                yield this.sequelize.query(terminateBackend);
                yield this.sequelize.query(revokeUser);
                yield this.sequelize.query(dropUser);
                yield this.sequelize.query(dropDb);
            }
            catch (err) {
                console.log(`Error Dropping Database and User: ${name}`);
                console.log(err);
                throw err;
            }
        });
    }
    create(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = Math.random().toString(36).substring(2, 20);
            let createDb = `CREATE DATABASE ${name}`;
            let createUser = `CREATE ROLE ${name} WITH LOGIN PASSWORD '${password}' NOINHERIT`;
            let grantUser = `GRANT ALL PRIVILEGES ON DATABASE ${name} TO ${name};`;
            console.log(`Creating Database and User: ${name}`);
            try {
                yield this.sequelize.query(createDb);
                yield this.sequelize.query(createUser);
                yield this.sequelize.query(grantUser);
            }
            catch (err) {
                console.log(`Error Creating Database and User: ${name}`);
                throw err;
            }
            return password;
        });
    }
}
exports.Migration = Migration;
