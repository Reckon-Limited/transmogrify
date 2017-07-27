"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Transmogrify {
    constructor(serverless, options) {
        this.handlers = {
            'transmogrify.up': 'node_modules/serverless-transmogrify/handlers.up',
            'transmogrify.down': 'node_modules/serverless-transmogrify/handlers.down',
            'transmogrify.create': 'node_modules/serverless-transmogrify/handlers.create',
            'transmogrify.drop': 'node_modules/serverless-transmogrify/handlers.drop',
            'transmogrify.check': 'node_modules/serverless-transmogrify/handlers.check'
        };
        this.afterDeployFunctions = () => __awaiter(this, void 0, void 0, function* () {
            if (this.options.function) {
                this.serverless.cli.log(`Calling migration function: ${this.options.function}`);
                this.serverless.pluginManager.invoke(['invoke']);
            }
            else {
                this.serverless.cli.log('No migration function defined');
                this.serverless.cli.log('Specify a function name using the --function option / -f shortcut.');
            }
        });
        this.serverless = serverless;
        this.options = options;
        this.provider = 'aws';
        this.serverless.service.getAllFunctions().forEach((name) => {
            let fn = this.serverless.service.functions[name];
            this.serverless.cli.log(`Transmogrify the Handler for Function ${name}`);
            if (this.handlers[fn.handler]) {
                fn.handler = this.handlers[fn.handler];
            }
        });
        this.hooks = {
            'after:deploy:deploy': this.afterDeployFunctions
        };
    }
}
module.exports = Transmogrify;
