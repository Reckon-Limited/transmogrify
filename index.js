"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = require("request-promise-native");
class Transmogrify {
    constructor(serverless, options) {
        this.afterDeployFunctions = () => __awaiter(this, void 0, void 0, function* () {
            console.log('afterDeployFunctions');
            this.serverless.cli.log('afterDeployFunctions');
            this.serverless.cli.log(JSON.stringify(this.serverless.service.provider.apiKeys));
            let url = this.config.up;
            let token = this.config.token;
            if (!url) {
                this.serverless.cli.log(`WARNING no endpoint configured for migration`);
                return;
            }
            this.serverless.cli.log(`Calling migration endpoint: ${url}`);
            try {
                let opts = {
                    url: url,
                    headers: { 'x-api-key': token }
                };
                let result = yield request(opts);
                if (result.statusCode != 200 && result.body == 'OK') {
                    throw new Error(result.statusCode);
                }
                this.serverless.cli.log(`Migration OK`);
            }
            catch (err) {
                this.serverless.cli.log(`ERROR calling migration endpoint ${err}`);
            }
        });
        this.serverless = serverless;
        this.provider = 'aws';
        this.hooks = {
            'after:deploy:deploy': this.afterDeployFunctions
        };
    }
    get config() {
        if (this.serverless.service.custom && this.serverless.service.custom.transmogrify) {
            return this.serverless.service.custom.transmogrify;
        }
        else {
            return {};
        }
    }
}
module.exports = Transmogrify;
