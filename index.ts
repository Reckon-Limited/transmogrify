// import * as request from 'request-promise-native';

class Transmogrify {
  serverless: any
  options: any

  provider: string
  hooks: {[hook: string]: () => void}


  handlers: {[handler:string]: string} = {
    'transmogrify.up': 'node_modules/transmogrify/handlers.up',
    'transmogrify.down': 'node_modules/transmogrify/handlers.down',
    'transmogrify.create': 'node_modules/transmogrify/handlers.create',
    'transmogrify.drop': 'node_modules/transmogrify/handlers.drop',
    'transmogrify.check': 'node_modules/transmogrify/handlers.check'
  }

  constructor(serverless: any, options: any) {
    this.serverless = serverless
    this.options = options

    this.provider = 'aws';
    this.serverless.service.getAllFunctions().forEach( (name: string) => {
      let fn: {handler: string} = this.serverless.service.functions[name];
      this.serverless.cli.log(`Transmogrify the Handler for Function ${name}` );

      if (this.handlers[fn.handler]) {
        fn.handler = this.handlers[fn.handler];
      }
    });

    this.hooks = {
      'after:deploy:deploy': this.afterDeployFunctions
    };
  }

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

  // get config() {
  //   if (this.serverless.service.custom && this.serverless.service.custom.transmogrify) {
  //     return this.serverless.service.custom.transmogrify;
  //   } else {
  //     return {};
  //   }
	// }

}

export = Transmogrify;
