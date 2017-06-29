/// <reference types="umzug" />
import * as Umzug from 'umzug';
export declare class Migration {
    static up(): Promise<Umzug.Migration[]>;
    static down(): Promise<Umzug.Migration[]>;
    static drop(name: string): Promise<void>;
    static create(name: string): Promise<string>;
}
