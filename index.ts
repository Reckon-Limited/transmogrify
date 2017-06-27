import * as request from 'request-promise-native';

class Transmogrify {
  serverless: any
  options: any

  provider: string
  hooks: {[hook: string]: () => void}

  constructor(serverless: any, options: any) {
    this.provider = 'aws';

    this.serverless = serverless

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

    this.hooks = {
      'after:deploy:deploy': this.afterDeployFunctions
    };
  }

  get config() {
    if (this.serverless.service.custom && this.serverless.service.custom.transmogrify) {
      return this.serverless.service.custom.transmogrify;
    } else {
      return {};
    }
	}

  afterDeployFunctions = async () => {
    // console.log('afterDeployFunctions');
    // this.serverless.cli.log('afterDeployFunctions');
    // this.serverless.cli.log(JSON.stringify(this.serverless.service.provider.apiKeys));

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

      let result = await request(opts);

      if (result.statusCode != 200 && result.body == 'OK') {
          throw new Error(result.statusCode)
      }
      this.serverless.cli.log(`Migration OK`);

    } catch(err) {
      this.serverless.cli.log(`ERROR calling migration endpoint ${err}`);
    }

  }
}

export = Transmogrify;
