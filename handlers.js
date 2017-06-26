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
exports.handler = (event, context, callback) => __awaiter(this, void 0, void 0, function* () {
    context.callbackWaitsForEmptyEventLoop = false;
    let migrations = yield umzug.up();
    console.log(`Migrations ${migrations}`);
    const response = {
        statusCode: 200,
        body: JSON.stringify('ok')
    };
    return callback(undefined, response);
});
