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
process.env.DATABASE_URL = 'postgres://toby.hede:@localhost:5432/postgres';
const sequelize = new Sequelize(process.env.DATABASE_URL);
const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: sequelize,
    },
    migrations: {
        params: [
            sequelize.getQueryInterface(),
            sequelize.constructor,
        ]
    },
    logging: function () {
        console.log.apply(null, arguments);
    }
});
class Migration {
    static up() {
        return umzug.up();
    }
    static down() {
        return umzug.down();
    }
    static drop(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let revokeUser = `REVOKE ALL PRIVILEGES ON DATABASE ${name} FROM ${name};`;
            let dropDb = `DROP DATABASE IF EXISTS ${name}`;
            let dropUser = `DROP ROLE IF EXISTS ${name};`;
            yield sequelize.query(revokeUser);
            yield sequelize.query(dropUser);
            yield sequelize.query(dropDb);
        });
    }
    static create(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = Math.random().toString(36).substring(2, 20);
            let createDb = `CREATE DATABASE ${name}`;
            let createUser = `CREATE ROLE ${name} WITH LOGIN PASSWORD '${password}' NOINHERIT`;
            let grantUser = `GRANT ALL PRIVILEGES ON DATABASE ${name} TO ${name};`;
            try {
                yield sequelize.query(createDb);
                yield sequelize.query(createUser);
                yield sequelize.query(grantUser);
            }
            catch (err) {
                console.log('Rolling back create');
                Migration.drop(name);
                throw err;
            }
            return password;
        });
    }
}
exports.Migration = Migration;
