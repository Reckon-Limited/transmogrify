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
const migration_1 = require("./migration");
exports.up = (event, context, callback) => __awaiter(this, void 0, void 0, function* () {
    context.callbackWaitsForEmptyEventLoop = false;
    const migration = new migration_1.Migration(process.env.DATABASE_URL);
    const results = yield migration.up();
    console.log(`Transmogrify Migrations: ${results}`);
    return callback(undefined, `ok: ${results}`);
});
exports.down = (event, context, callback) => __awaiter(this, void 0, void 0, function* () {
    context.callbackWaitsForEmptyEventLoop = false;
    const migration = new migration_1.Migration(process.env.DATABASE_URL);
    const results = yield migration.down();
    console.log(`Transmogrify Migrations: ${results}`);
    return callback(undefined, `ok: ${results}`);
});
exports.create = (event, context, callback) => __awaiter(this, void 0, void 0, function* () {
    context.callbackWaitsForEmptyEventLoop = false;
    if (!event.name) {
        return callback(new Error('Name is required'), undefined);
    }
    try {
        let migration = new migration_1.Migration(process.env.DATABASE_URL);
        let password = yield migration.create(event.name);
        return callback(undefined, `Created Database and User ${event.name} with password '${password}'`);
    }
    catch (err) {
        return callback(err, undefined);
    }
});
exports.drop = (event, context, callback) => __awaiter(this, void 0, void 0, function* () {
    context.callbackWaitsForEmptyEventLoop = false;
    if (!event.name) {
        return callback(new Error('Name is required'), undefined);
    }
    try {
        let migration = new migration_1.Migration(process.env.DATABASE_URL);
        migration.drop(event.name);
        return callback(undefined, `Dropped Database and User ${event.name}`);
    }
    catch (err) {
        return callback(err, undefined);
    }
});
exports.check = (event, context, callback) => __awaiter(this, void 0, void 0, function* () {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        let migration = new migration_1.Migration(process.env.DATABASE_URL);
        yield migration.check();
        return callback(undefined, 'Connection ok');
    }
    catch (err) {
        return callback(err, undefined);
    }
});
