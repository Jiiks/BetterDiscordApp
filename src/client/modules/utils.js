/**
 * BetterDiscord Utilities Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/
'use strict';

const fs = require('fs');
const _path = require('path');
const { moment } = require('../vendor');

class Utils {
    static tryParse(data) {
        try {
            return JSON.parse(data);
        } catch(err) {
            console.log(err);
            return null;
        }
    }

    static fileExistsSync(path) {
        try {
            return fs.statSync(path).isFile();
        } catch(err) {
            return false;
        }
    }

    static readFileSync(path, encoding = 'utf8') {
        if (!this.fileExistsSync(path)) return null;
        return fs.readFileSync(path, encoding);
    }

    static writeFileSync(path, data, encoding = 'utf8') {
        this.createDirRecursiveSync(_path.dirname(path));
        try {
            fs.writeFileSync(path, data, encoding);
            return true;
        } catch (err) {
            return false;
        }
    }

    static readDir(path, cb) {
        fs.readdir(path, (err, files) => {
            if (err) {
                cb(null);
                return;
            }
            cb(files);
        });
    }

    static createDirRecursiveSync(path) {
        if (fs.existsSync(path)) return true;

        return !!path.split('/').reduce((path, subdir) => {
            path = `${path}${subdir}/`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }

            return path;
        }, '');
    }

    static fileAgeSync(path) {
        try {
            const stats = fs.statSync(path);
            const diff = moment.duration(moment().diff(stats.mtime));

            return {
                days: diff.days(),
                hours: diff.hours(),
                minutes: diff.minutes(),
                seconds: diff.seconds()
            };
        } catch (err) {
            return null;
        }
    }
}

module.exports = Utils;