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
const chai_1 = require("chai");
const td = require("testdouble");
process.env.DATABASE_URL = 'postgres://toby.hede:@localhost:5432/postgres';
const migration_1 = require("../migration");
describe('Migration', function () {
    this.timeout(5000);
    after(() => {
        td.reset();
    });
    describe('create', () => {
        before(() => {
        });
        it.only('creates a database', () => __awaiter(this, void 0, void 0, function* () {
            yield migration_1.Migration.drop('test1');
            let password = yield migration_1.Migration.create('test1');
            console.log(password);
            chai_1.expect(password).to.not.be.undefined;
        }));
    });
});
