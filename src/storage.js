'use strict';

const fs = require('fs');
const process = require('process');
const { platform } = require('os');
const osString = platform();

class Storage {

	constructor() {
		this.initConfig();
	}

	initConfig() {
		this.config = {
			defaults: {
				paths: {
					base: (osString === 'win32' ? process.env.APPDATA : osString === 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + './config') + '/BetterDiscord'
				},
				config: {
					"hi": "hi!"
				}
			},
			storage: []
		};

		this.config.paths = this.config.defaults.paths;
	}


	read(cb) {
		let path = `${this.config.paths.base}/bdStorage2.json`;
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
		let path = `${this.config.paths.base}/bdStorage2.json`;
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


module.exports = {
	Storage: new Storage()
}
