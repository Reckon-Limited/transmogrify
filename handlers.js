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
    console.log('up');
    return handler(migration_1.Migration.up, callback);
});
exports.down = (event, context, callback) => __awaiter(this, void 0, void 0, function* () {
    context.callbackWaitsForEmptyEventLoop = false;
    return handler(migration_1.Migration.down, callback);
});
let handler = (fn, callback) => __awaiter(this, void 0, void 0, function* () {
    let migrations = yield fn();
    console.log(`Transmogrify Migrations: ${migrations}`);
    const response = {
        statusCode: 200,
        body: JSON.stringify('ok')
    };
    return callback(undefined, response);
});
