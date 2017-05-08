/**
 * BetterDiscord Injector
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/
'use strict';

const _bd_fs = require('fs');
const _bd_process = require('process');
const _bd_platform = require('os').platform;
const _bd_osString = _bd_platform();

class Storage {
    constructor(options) {
        this.initConfig(options);
    }

    initConfig(options) {
        this.config = {
            defaults: {
                paths: {
                    base: (_bd_osString === 'win32' ? process.env.APPDATA : _bd_osString === 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + './config') + '/BetterDiscord'
                },
                config: {
                }
            },
            paths: {
                base: "",
                file: options.file || "bdStorage2"
            }
        };

        this.config.paths.base = options.basePath || this.config.defaults.paths.base;
    }

    read(cb) {
        const path = `${this.config.paths.base}/${this.config.paths.file}.json`;
        _bd_fs.stat(path, (err, stats) => {
            if (err) {
                // Does not exist, create it
                this.write(this.config.defaults.config, (err, result) => {
                    if (err) {
                        // Something went wrong with write
                        cb(err);
                        return;
                    }

                    cb(null, result);
                });
            }
            
            _bd_fs.readFile(path, (err, result) => {
                if (err) {
                    // Something went wrong with read
                    cb(err);
                    return;
                }

                try {
                    cb(null, JSON.parse(result));
                } catch(err) {
                    cb(err);
                }
            });
        });
    }

    write(data, cb) {
        const path = `${this.config.paths.base}/${this.config.paths.file}.json`;

        let json = null;
        try {
            json = JSON.stringify(data);
        } catch(err) {
            cb(err);
            return;
        }

        _bd_fs.writeFile(path, json, (err, result) => {
            if (err) {
                // Something went wrong with write
                cb(err);
                return;
            }

            cb(null, result);
        });
    }
}

class PluginStorage extends Storage {
    constructor(options) {
        super(options);
        this.config.paths.base += '/plugins';
        this.config.paths.file += '.config';
    }
}

module.exports = {
    Storage,
    PluginStorage
};