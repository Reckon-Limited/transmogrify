"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const td = require("testdouble");
describe('Migration', function () {
    this.timeout(5000);
    after(() => {
        td.reset();
    });
});
