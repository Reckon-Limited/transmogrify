declare class Transmogrify {
    serverless: any;
    options: any;
    provider: string;
    hooks: {
        [hook: string]: () => void;
    };
    constructor(serverless: any, options: any);
    readonly config: any;
    afterDeployFunctions: () => Promise<void>;
}
export = Transmogrify;
