'use strict';

const fs = require('fs');
const process = require('process');
const { platform } = require('os');
const osString = platform();

class Storage {

    constructor(options) {
        this.initConfig(options);
    }

    initConfig(options) {

        this.config = {
            defaults: {
                paths: {
                    base: (osString === 'win32' ? process.env.APPDATA : osString === 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + './config') + '/BetterDiscord'
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
        let path = `${this.config.paths.base}/${this.config.paths.file}.json`;
        fs.stat(path, (err, stats) => {
            if(err) {
                //Does not exist, create it
                this.write(this.config.defaults.config, (err, result) => {
                    if(err) {
                        //Something went wrong with write
                        cb(err);
                        return;
                    }

                    cb(null, result);
                });
            }
            
            fs.readFile(path, (err, result) => {
                if(err) {
                    //Something went wrong with read
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
        let path = `${this.config.paths.base}/${this.config.paths.file}.json`;
        let json = null;
        try {
            json = JSON.stringify(data);
        } catch(err) {
            cb(err);
            return;
        }
        fs.writeFile(path, json, (err, result) => {
            if(err) {
                //Something went wrong with write
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
    Storage: Storage,
    PluginStorage: PluginStorage
}
