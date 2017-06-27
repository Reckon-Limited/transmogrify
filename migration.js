"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg = require("pg");
const Sequelize = require("sequelize");
const Umzug = require("umzug");
const _ = pg;
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
exports.Migration = umzug;
