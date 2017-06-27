import * as request from 'request-promise-native';

class Transmogrify {
  serverless: any
  options: any

  provider: string
  hooks: {[hook: string]: () => void}

  constructor(serverless: any, options: any) {
    this.serverless = serverless
    this.options = options

    this.provider = 'aws';
    this.serverless.service.getAllFunctions().forEach( (name: string) => {
      let fn: {handler: string} = this.serverless.service.functions[name];
      this.serverless.cli.log(`Transmogrify the Handler for Function ${name}` );

      if (fn.handler == 'transmogrify.up') {
        fn.handler = 'node_modules/transmogrify/handlers.up';
      }

      if (fn.handler == 'transmogrify.down') {
        fn.handler = 'node_modules/transmogrify/handlers.down';
      }
    });

    // this.hooks = {
    //   'info:info': () => this.serverless.pluginManager.spawn('aws:info'),
    //
    //   'deploy:deploy':

    this.hooks = {
      'after:deploy:deploy': this.afterDeployFunctions
    };
  }

  // get config() {
  //   if (this.serverless.service.custom && this.serverless.service.custom.transmogrify) {
  //     return this.serverless.service.custom.transmogrify;
  //   } else {
  //     return {};
  //   }
	// }

  afterDeployFunctions = async () => {
    if (this.options.function) {
      this.serverless.cli.log(`Calling migration function: ${this.options.function}`);
      this.serverless.pluginManager.invoke(['invoke']);
    } else {
      this.serverless.cli.log('No migration function defined');
      this.serverless.cli.log('Specify a function name using the --function option / -f shortcut.');
    }
    // let url = this.config.up;
    // let token = this.config.token;
    //
    // if (!url) {
    //   this.serverless.cli.log(`WARNING no endpoint configured for migration`);
    //   return;
    // }
    //
    // this.serverless.cli.log(`Calling migration endpoint: ${url}`);
    // try {
    //
    //   let opts = {
    //     url: url,
    //     headers: { 'x-api-key': token }
    //   };
    //
    //   let result = await request(opts);
    //
    //   if (result.statusCode != 200 && result.body == 'OK') {
    //       throw new Error(result.statusCode)
    //   }
    //   this.serverless.cli.log(`Migration OK`);
    //
    // } catch(err) {
    //   this.serverless.cli.log(`ERROR calling migration endpoint ${err}`);
    // }
  }
}

export = Transmogrify;
