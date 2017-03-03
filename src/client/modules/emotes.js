/**
 * BetterDiscord Emote Module
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree. 
*/

'use strict';

const Logger = require('./logger');
const Events = require('./events');
const Cache = require('./cache');
const Settings = require('./settings');
const Utils = require('./utils');
const { $, React } = require('../vendor');

import Renderer from './renderer';
import { CEmote } from '../ui/components';

const urlTwitchGlobal = { 'prefix': 'https://static-cdn.jtvnw.net/emoticons/v1/', 'suffix': '/1.0' };
const urlTwitchSub = urlTwitchGlobal;
const urlBttv = { 'prefix': 'https://cdn.betterttv.net/emote/', 'suffix': '/1x' };
const urlFfz = { 'prefix': 'https://cdn.frankerfacez.com/emoticon/', 'suffix': '/1' };

class Emotes {

    constructor() {
        let self = this;
        self.emoteCache = new Cache(true);
        self._cacheFile = `${Settings.settings['dataPath']}/cache/emotecache.json`;
        self.debug = Settings.settings['debug'] || true;

        let age = Utils.fileAgeSync(self._cacheFile);
        if (age && age.days < 3 && self.checkLocalCache()) {
            if (self.debug) Logger.log('Emotes', `Loading Cache from local file: ${self._cacheFile}`);
            self.emoteCache = Utils.tryParse(Utils.readFileSync(self._cacheFile)) || self.emoteCache;
        } else {
            if (self.debug) Logger.log('Emotes', `Downloading new Cache to local file: ${self._cacheFile}`);
            self.updateCache(true);
        }

        if (self.debug) window._emoteCache = self.emoteCache;

        Events.on('new-message', message => {
            if (self.debug) Logger.log('Emotes', `new-message event, State: ${message.state}`);
            if (message.state !== 'SENT') return;

            /* Check if message has possible emotes*/
            if (!/:[\w]+:/gmi.test(message.content) || !self.containsEmotes(message.content)) return;

            /* TODO: Use message.ref directly */
            let ref = $(message.ref).find('.markup').last();
            self.injectEmotes(ref);
            /*
            let coms = $('.comment').get();
            coms.forEach((com) => {
                let mark = $(com).find('.markup').last();
                self.injectEmotes(mark);
            });
            */
        });

    }

    injectEmotes(ref) {
        let self = this;
        let contents = ref.contents().get();
        let scroller = $(ref).parents('.scroller.messages').get(0);
        let wasMaxScrolled = ((scroller.scrollHeight - scroller.clientHeight) === scroller.scrollTop);
        let injected = false;
        $(ref).empty();
        /* Clear content of ref, then rebuild it with emotes or restore the original if no valid emotes are found*/
        contents.forEach((node) => {
            if (node.nodeType !== 3) {
                $(ref).append(node);
                return;
            }

            let words = node.nodeValue.split(/([^\s]+)([\s]|$)/g);

            if (!words.some(val => self.isEmote(val.slice(1, -1)))) {
                $(ref).append(node);
                return;
            }

            let tmpIndex = 0;
            words.forEach((wordRaw, wordIndex) => {
                let wordClean = wordRaw.slice(1, -1);
                if (!/^:[\w]+:$/.test(wordRaw) || !self.isEmote(wordClean)) return;

                let url = self.getUrlFromEmoteName(wordClean);
                if (!url) return;

                let containsMore = words.slice(wordIndex + 1).some(val => self.isEmote(val.slice(1, -1)));

                let span = $('<span/>');
                Renderer.render(span, <CEmote src={url} name={wordClean} />);

                $(ref).append(document.createTextNode(words.slice(tmpIndex, wordIndex).join('')));
                $(ref).append(span);
                if (!containsMore)
                    $(ref).append(document.createTextNode(words.slice(wordIndex + 1).join('')));

                tmpIndex = wordIndex + 1;
                injected = true;
                return;
            });
        });
        /* Fix scroller position*/
        if (injected && wasMaxScrolled) {
            window.setTimeout(() => {
                $('.message-group').last().get(0).scrollIntoView(false);
            }, 100);
        }
        if (contents.length > ref.contents().get().length) {
            Logger.log('Emotes', 'Error injecting emotes. Trying to restore Message contents.', 'err');
            $(ref).empty();
            $(ref).html(contents);
        }
    }

    containsEmotes(str) {
        let self = this;
        let pEmotes = str.match(/:[\w]+:/gmi);
        for (let i = 0; i < pEmotes.length; i++) {
            if (self.isEmote(pEmotes[i].slice(1, -1))) return true;
        }
        return false;
    }

    isEmote(word) {
        let self = this;
        for (let val in self.emoteCache.cache) {
            if (!self.emoteCache.cache.hasOwnProperty(val)) continue;
            if (self.emoteCache.cache[val][word]) return true;
        }
        return false;
    }

    getUrlFromEmoteName(name) {
        let self = this;
        for (let val in self.emoteCache.cache) {
            if (!self.emoteCache.cache.hasOwnProperty(val)) continue;
            let id = self.emoteCache.cache[val][name];
            if (id) {
                return self.getUrl(id, `${val}`);
            }
        }
        return null;
    }

    getUrl(id, provider) {
        return {
            'twitchGlobal': `${urlTwitchGlobal.prefix}${id}${urlTwitchGlobal.suffix}`,
            'twitchSub': `${urlTwitchSub.prefix}${id}${urlTwitchSub.suffix}`,
            'bttv': `${urlBttv.prefix}${id}${urlBttv.suffix}`,
            'ffz': `${urlFfz.prefix}${id}${urlFfz.suffix}`
        }[provider];
    }

    /* #################### Cache ################# */

    checkLocalCache() {
        let self = this;

        let _tmp = Utils.tryParse(Utils.readFileSync(self._cacheFile));
        if (!_tmp || !_tmp.hasOwnProperty('cache')) {
            Logger.log('Emotes', 'Invalid cache file.');
            return false;
        }

        let _tmpCache = new Cache(true);
        _tmpCache.cache = _tmp.cache;

        let returnVal = true;
        if (!_tmpCache.cached('twitchGlobal') || !_tmpCache.cache['twitchGlobal']) {
            Logger.log('Emotes', '"Twitch Global" Emotes are missing in the local cache.');
            returnVal = false;
        }
        if (!_tmpCache.cached('twitchSub') || !_tmpCache.cache['twitchSub']) {
            if (returnVal) Logger.log('Emotes', '"Twitch Subscriber" Emotes are missing in the local cache.');
            returnVal = false;
        }
        if (!_tmpCache.cached('bttv') || !_tmpCache.cache['bttv']) {
            if (returnVal) Logger.log('Emotes', '"BTTV" Emotes are missing in the local cache.');
            returnVal = false;
        }
        if (!_tmpCache.cached('ffz') || !_tmpCache.cache['ffz']) {
            if (returnVal) Logger.log('Emotes', '"FFZ" Emotes are missing in the local cache.');
            returnVal = false;
        }
        return returnVal;
    }

    updateCache(updateFile = false) {
        let self = this;

        self.downloadEmoteData().then(result => {
            let reduced = result.reduce((data, value) => { data[value.id] = { data: value.data, err: value.err }; return data; }, {});
            self.emoteCache.clear();

            let _tmp = Utils.tryParse(Utils.readFileSync(self._cacheFile));
            let _tmpCache = new Cache(true);
            if (_tmp && _tmp.hasOwnProperty('cache')) _tmpCache.cache = _tmp.cache;
            //_tmpCache = Object.assign(new Cache(true), { cache = _tmp.cache });
            $.each(reduced, (key, value) => {
                if (value.err) {
                    Logger.log('Emotes', `Error loading '${key}', attempt loading from local cache instead.`);
                    if (_tmpCache && _tmpCache.cached(key)) {
                        self.emoteCache.add(key, _tmpCache.cache[key]);
                    } else self.emoteCache.add(key, undefined);
                } else self.emoteCache.add(key, value['data']);
            });
            if (updateFile) Utils.writeFileSync(self._cacheFile, JSON.stringify(self.emoteCache));
        });
    }

    downloadEmoteData() {
        var twitchGlobalPromise = new Promise((resolve) => {
            $.get('//twitchemotes.com/api_cache/v2/global.json', data => {
                const emotes = {};
                $.each(data.emotes, (key, value) => { emotes[key] = value['image_id'] });
                resolve({ 'id': 'twitchGlobal', 'data': emotes });
            }).fail((err) => {
                resolve({ 'id': 'twitchGlobal', 'err': err });
            });

        });

        var twitchSubPromise = new Promise((resolve) => {
            $.get('//twitchemotes.com/api_cache/v2/subscriber.json', data => {
                const emotes = {};
                var channels = data['channels'];
                for (let channel in channels) {
                    if (channels.hasOwnProperty(channel)) {
                        const channelEmotes = channels[channel]['emotes'];
                        for (let i = 0; i < channelEmotes.length; i++) {
                            emotes[channelEmotes[i]['code']] = channelEmotes[i]['image_id'];
                        }
                    }
                }
                resolve({ 'id': 'twitchSub', 'data': emotes });
            }).fail((err) => {
                resolve({ 'id': 'twitchSub', 'err': err });
            });
        });

        var bttvPromise = new Promise((resolve) => {
            $.getJSON('//raw.githubusercontent.com/Jiiks/BetterDiscordApp/master/data/emotedata_bttv.json', data => {
                resolve({ 'id': 'bttv', 'data': data });
            }).fail((err) => {
                resolve({ 'id': 'bttv', 'err': err });
            });
        });

        var ffzPromise = new Promise((resolve) => {
            $.getJSON('//raw.githubusercontent.com/Jiiks/BetterDiscordApp/master/data/emotedata_ffz.json', data => {
                resolve({ 'id': 'ffz', 'data': data });
            }).fail((err) => {
                resolve({ 'id': 'ffz', 'err': err });
            });
        });

        return Promise.all([twitchGlobalPromise, twitchSubPromise, bttvPromise, ffzPromise]);
    }

}

module.exports = new Emotes();
