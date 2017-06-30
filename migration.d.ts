/// <reference types="sequelize" />
/// <reference types="umzug" />
import * as Sequelize from 'sequelize';
import * as Umzug from 'umzug';
export declare class Migration {
    url: string;
    private _sequelize;
    private _umzug;
    constructor(url: string);
    private init();
    readonly sequelize: Sequelize.Sequelize;
    readonly umzug: Umzug.Umzug;
    up(): any;
    down(): any;
    drop(name: string): Promise<void>;
    create(name: string): Promise<string>;
}
