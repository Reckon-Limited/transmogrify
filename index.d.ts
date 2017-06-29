declare class Transmogrify {
    serverless: any;
    options: any;
    provider: string;
    hooks: {
        [hook: string]: () => void;
    };
    handlers: {
        [handler: string]: string;
    };
    constructor(serverless: any, options: any);
    afterDeployFunctions: () => Promise<void>;
}
export = Transmogrify;
