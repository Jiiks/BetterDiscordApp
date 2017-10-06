/**
 * BetterDiscord Utils Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import * as fs from 'fs';
import { IPluginConfig, IError } from '../interfaces';

export class Utils {

    /**
     * Read directory async
     * @param path Directory path
     */
    public static readDir(path: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err) {
                    reject(err);
                }
                resolve(files);
            });
        });
    }

    public static async readDirAsync(path: string): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err) {
                    reject(err);
                }
                resolve(files);
            });
        });
    }

    public static async delFile(path: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            fs.unlink(path, err => {
                if (err) {
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    /**
     * Check if file exists
     * @param path File path
     */
    public static fileExistsSync(path: string): boolean {
        try {
            return fs.statSync(path).isFile();
        } catch (err) {
            return false;
        }
    }

    /**
     * Read and parse json file
     * @param path File path
     * @param encoding File encoding
     */
    public static readJsonSync(path: string, encoding: string = 'utf8'): any {
        if(!this.fileExistsSync(path)) return null;
        const json = fs.readFileSync(path, encoding);
        return this.tryParse(json);
    }

    public static async fileExistsAsync(path: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            fs.stat(path, (err, stats) => {
                if(err) {
                    resolve(false);
                    return;
                };
                resolve(true);
            });
        });
    }

    public static async readFileAsync(path: string, encoding: string = 'utf8'): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            fs.readFile(path, { encoding }, (err, data) => {
                if(err) {
                    resolve(null);
                    return;
                }
                resolve(data);
            });
        });
    }

    public static async readJsonAsync(path: string, encoding: string = 'utf8'): Promise<any> {
        if(!await this.fileExistsAsync(path)) return null;

        const read = await this.readFileAsync(path, encoding);
        if(!read) return null;

        return await this.tryParseAsync(read);
    }

    public static async tryParseAsync(json: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                const parsed = JSON.parse(json);
                resolve(parsed);
            } catch(err) {
                resolve(null);
            }
        });
    }

    /**
     * Try to parse json
     * @param json json string
     */
    public static tryParse(json: string): IPluginConfig {
        try {
            return JSON.parse(json);
        } catch(err) {
            console.log(err);
            return null;
        }
    }

}

declare var console: any;
export class Logger {

    public static log(module: string, error: IError): void {
        const severity = this.severity(error);
        console[severity]('[%cBetter%cDiscord%c|%s] %s',
            'color: #3E82E5;',
            'color: #FFF; text-shadow: 0 0 2px #000;',
            '',
            `${module}${severity === 'debug' ? '|DBG' : ''}`,
            error.reason);
        console.log(error.native);
    }

    public static logAll(module: string, errors: IError[]): void {
        errors.forEach(error => this.log(module, error));
    }

    private static severity(error: IError): string {
        return [
            'log',
            'warn',
            'error',
            'debug'
        ][error.severity];
    }

}