/* BetterDiscordApp Entry
 * Version: 1.3
 * Author: Jiiks | http://jiiks.net
 * Date: 27/08/2015 - 15:51
 * Last Update: 25/10/2015 - 23:48
 * https://github.com/Jiiks/BetterDiscordApp
 */
var _fs = require("fs");
var _config = require("./config.json");
var _utils = require("./utils");

//Use beta javascript
var _beta = false;

var _ipc = require('ipc');

var _version;
var _mainWindow;
var _updater;
var _hash;


var _userDefault = {"cache": null};
var _userConfig = {"cache": null};
var _cacheExpired = false;
var _cacheDays = 0;
var _dataPath;

// OS specific _dataPath
var _os = process.platform;
if (_os == "win32") {
    _dataPath = "../BetterDiscordData";
} else if (_os == "darwin") {
    _dataPath = "~/Library/Application Support/discord/BetterDiscordData";
}

var _userFile = _dataPath + "/user.json";

function BetterDiscord(mainWindow) {
    _mainWindow = mainWindow;
    _version = _config.Core.Version;
    _utils = new _utils.Utils(mainWindow);
}

BetterDiscord.prototype.getUtils = function() {
    return _utils;
};

BetterDiscord.prototype.init = function() {

    var self = this;

    //Check emotedata cache
    this.getUtils().log("Checking cache");

    try {
        if(!_fs.existsSync(_dataPath)) {
            _fs.mkdirSync(_dataPath);
        }

        if(!_fs.existsSync(_userFile)) {
            _fs.writeFileSync(_userFile, JSON.stringify(_userDefault));
        }

        if(_fs.existsSync(_userFile)) {
            _userConfig = JSON.parse(_fs.readFileSync(_userFile));
        }

        if(_userConfig.cache == null) {
            _userDefault.cache = new Date();
            _userConfig = _userDefault;
            _fs.writeFileSync(_userFile, JSON.stringify(_userConfig));
            _cacheExpired = true;
        } else {
            var curDate = new Date();
            var cacheDate = new Date(_userConfig.cache);
            if(Math.abs(curDate.getDate() - cacheDate.getDate()) > _cacheDays) {
                _cacheExpired = true;
                _userConfig.cache = curDate;
                _fs.writeFileSync(_userFile, JSON.stringify(_userConfig));
            }
        }

    }catch(err) { _cacheExpired = true; console.log(err); }

    this.getUtils().log("Cache expired: " + _cacheExpired);

    //Get updater
    self.getUtils().download("api.github.com", "/repos/Jiiks/BetterDiscordApp/releases", function(updater) {
        _updater = JSON.parse(updater);
        var _LatestVersion = _updater[0]["tag_name"];

        self.getUtils().log("Latest Version: " + _LatestVersion);
        self.start();
    });
};

BetterDiscord.prototype.start = function() {

    var self = this;

    console.log("BetterDiscord: init");

    self.getUtils().getWebContents().on('dom-ready', function() {

        if(_LatestVersion > _version) {
            self.getUtils().execJs('alert("An update for BetterDiscord is available(v'+ _updater.LatestVersion +')! Download the latest version from GitHub!")');
        }

        //Create loading element
        self.getUtils().execJs('var loadingNode = document.createElement("DIV");');
        self.getUtils().execJs('loadingNode.innerHTML = \' <div style="height:30px;width:100%;background:#282B30;"><div style="padding-right:10px; float:right"> <span id="bd-status" style="line-height:30px;color:#E8E8E8;">BetterDiscord - Loading Libraries : </span><progress id="bd-pbar" value="10" max="100"></progress></div></div> \'');
        self.getUtils().execJs('var flex = document.getElementsByClassName("flex-vertical flex-spacer")[0]; flex.appendChild(loadingNode);');

        //Create ipc
        self.getUtils().execJs("var betterDiscordIPC = require('ipc');");

        //ipc listener
        _ipc.on('asynchronous-message', function(event, arg){
            switch(arg) {
                //jQuery loaded, load jQuery cookie
                case 'loaded-jquery':
                    self.getUtils().updateLoading("Loading Resources(jQuery Cookie)", 10, 100);
                    self.getUtils().injectJavaScriptSync("//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js", "loaded-jquery-cookie");
                    break;
                //jQuery cookie loaded, load css
                case 'loaded-jquery-cookie':
                    self.getUtils().updateLoading("Loading Resources(css)", 20, 100);
                    //TODO make this nicer
                    // self.getUtils().injectStylesheetSync(_updater.CDN + "/Jiiks/BetterDiscordApp/" + _hash + "/css/main.min.css", "loaded-css");
                    self.getUtils().execJs('function injectMainCss() { $(\'head\').append( \'<link rel=\"stylesheet\" type=\"text\/css\" href=\"\/\/'+_updater.CDN+'\/Jiiks\/BetterDiscordApp\/'+_hash+'\/css\/main.min.css\">\' ) }');
                    self.getUtils().execJs('injectMainCss();');
                    self.getUtils().sendIcpAsync("loaded-css");
                    break;
                //Css loaded, load main javascript
                case 'loaded-css':
                    self.getUtils().updateLoading("Loading Resources(js)", 30, 100);
                    self.getUtils().injectJavaScriptSync("//" + _updater.CDN + "/Jiiks/BetterDiscordApp/"+_hash+"/js/main.min.js", "loaded-js");
                    break;
                //Main javascript loaded, load public servers
                case 'loaded-js':
                    self.getUtils().updateLoading("Loading Resources(Public Servers)", 40, 100);
                    self.getUtils().download("raw.githubusercontent.com", "/Jiiks/BetterDiscordApp/"+_hash+"/serverlist.json", function(data) {
                        self.getUtils().execJs('var publicServers = '+data+';');
                        self.getUtils().execJs('var ps = '+data+';');
                        self.getUtils().sendIcpAsync("loaded-publicservers");
                    });
                    break;
                //Public Servers loaded, load global twitch emotes
                case 'loaded-publicservers':
                    self.getUtils().updateLoading("Loading Resources(Twitch Global Emotedata)", 50, 100);

                    var tgExists = false;
                    try {
                        tgExists = _fs.existsSync(_dataPath + "/emotes_twitch_global.json");
                    }catch(err) { console.log(err); }

                    if(tgExists && !_cacheExpired) {
                        try {
                            self.getUtils().log("Reading Twitch global emotes from file");
                            var emotedata = _fs.readFileSync(_dataPath + "/emotes_twitch_global.json", "utf8");
                            JSON.parse(emotedata);
                            emotedata = emotedata.replace(/\$/g, "\\$").replace(/'/g, "\\'").replace(/"/g, "\\\"");
                            self.getUtils().execJs('var emotesTwitch  = JSON.parse(\''+emotedata+'\');');
                            self.getUtils().sendIcpAsync("loaded-emotedata-twitchglobal");
                            break;
                        }catch(err) { console.log(err); }
                    }
                    self.getUtils().log("Downloading Twitch global emotes");
                    self.getUtils().downloadHttp("http://twitchemotes.com/api_cache/v2/global.json", function(emotedata) {
                        try {
                            self.getUtils().log("Writing Twitch global emotes to file");
                            _fs.writeFileSync(_dataPath + "/emotes_twitch_global.json", emotedata, "utf8");
                        }catch(err) {}
                        emotedata = emotedata.replace(/\$/g, "\\$").replace(/'/g, "\\'").replace(/"/g, "\\\"");
                        self.getUtils().execJs('var emotesTwitch  = JSON.parse(\''+emotedata+'\');');
                        self.getUtils().sendIcpAsync("loaded-emotedata-twitchglobal");
                    });

                    break;
                //Global twitch emotes loaded, load sub emotes
                case 'loaded-emotedata-twitchglobal':
                    self.getUtils().updateLoading("Loading Resources(Twitch Subscriber Emotedata)", 60, 100);

                    var tsExists = false;

                    try {
                        tsExists = _fs.existsSync(_dataPath + "/emotes_twitch_sub.json");
                    }catch(err) { console.log(err); }

                    if(tsExists && !_cacheExpired) {
                        try {
                            self.getUtils().log("Reading Twitch sub emotes from file");
                            var tsEmotedata = _fs.readFileSync(_dataPath + "/emotes_twitch_sub.json", "utf8");
                            JSON.parse(tsEmotedata);
                            self.getUtils().execJs('var subEmotesTwitch = '+tsEmotedata+';');
                            self.getUtils().sendIcpAsync("loaded-emotedata-twitchsubs");
                            break;
                        }catch(err) { console.log(err); }
                    }

                    self.getUtils().log("Downloading Twitch sub emotes");
                    self.getUtils().downloadHttp("http://twitchemotes.com/api_cache/v2/subscriber.json", function(emotedata) {
                        self.getUtils().updateLoading("Parsing Resources(Twitch Subscriber Emotedata)", 70, 100);

                        //Since there's so many sub emotes, parse them to a simple object.
                        //Input: {"channel":{"emotes":["emote":emoteid]}}
                        //Output: {"emote":emoteid}
                        emotedata = JSON.parse(emotedata);
                        var emoteData = {};
                        var channels = emotedata["channels"];

                        for(var channel in channels) {
                            var emotes = channels[channel]["emotes"];
                            for(var i = 0 ; i < emotes.length ; i++) {
                                var code = emotes[i]["code"];
                                var id = emotes[i]["image_id"]
                                emoteData[code] = id;
                            }
                        }

                        try {
                            self.getUtils().log("Writing Twitch sub emotes to file");
                            _fs.writeFile(_dataPath + "/emotes_twitch_sub.json", JSON.stringify(emoteData), "utf8");
                        }catch(err) { console.log(err); }

                        self.getUtils().execJs('var subEmotesTwitch = '+JSON.stringify(emoteData)+';');
                        self.getUtils().sendIcpAsync("loaded-emotedata-twitchsubs");
                    });
                    break;
                //Twitch sub emotes loaded, load ffz emotes
                case 'loaded-emotedata-twitchsubs':

                    var ffzExists = false;

                    try {
                        ffzExists = _fs.existsSync(_dataPath + "/emotes_ffz.json");
                    }catch(err) { console.log(err); }

                    if(ffzExists && !_cacheExpired) {
                        try {
                            self.getUtils().log("Reading FFZ emotes from file");
                            var ffzEmotedata = _fs.readFileSync(_dataPath + "/emotes_ffz.json", "utf8");
                            JSON.parse(ffzEmotedata);
                            self.getUtils().execJs('var emotesFfz = JSON.parse(\''+ffzEmotedata+'\');');
                            self.getUtils().sendIcpAsync("loaded-emotedata-ffz");
                            break;
                        }catch(err) { console.log(err); }
                    }

                    self.getUtils().log("Downloading FFZ emotes");
                    self.getUtils().updateLoading("Loading Resources(FFZ Emotedata)", 80, 100);
                    self.getUtils().download(_updater.CDN , "/Jiiks/BetterDiscordApp/"+_hash+"/emotedata_ffz.json", function(emotedata) {

                        try {
                            self.getUtils().log("Writing FFZ emotes to file");
                            _fs.writeFileSync(_dataPath + "/emotes_ffz.json", emotedata, "utf8");
                        }catch(err) { console.log(err); }

                        self.getUtils().execJs('var emotesFfz = JSON.parse(\''+emotedata+'\');');
                        self.getUtils().sendIcpAsync("loaded-emotedata-ffz");
                    });
                    break;
                //Ffz emotes loaded, load bttv emotes
                case 'loaded-emotedata-ffz':
                    self.getUtils().updateLoading("Loading Resources(BTTV Emotedata)", 85, 100);

                    var bttvExists = false;

                    try {
                        bttvExists = _fs.existsSync(_dataPath + "/emotes_bttv.json");
                    }catch(err) { console.log(err); }

                    if(bttvExists && !_cacheExpired) {
                        try {
                            self.getUtils().log("Loading BTTV emotes from file");
                            var bttvEmotedata = _fs.readFileSync(_dataPath + "/emotes_bttv.json", "utf8");
                            JSON.parse(bttvEmotedata);
                            self.getUtils().execJs("var emotesBTTV = " + bttvEmotedata + ";");
                            self.getUtils().sendIcpAsync("loaded-emotedata-bttv");
                            break;
                        }catch(err) { console.log(err); }
                    }

                    self.getUtils().log("Downloading BTTV emotes");
                    self.getUtils().download("api.betterttv.net", "/emotes", function(emotedata) {
                        self.getUtils().updateLoading("Parsing Resource(BTTV Emotedata)", 90, 100);

                        var emoteData = {};

                        emotedata = JSON.parse(emotedata);
                        for(var emote in emotedata.emotes) {
                            var e = emotedata.emotes[emote];
                            var url = e.url;
                            var code = e.regex;

                            emoteData[code] = url;
                        }

                        try {
                            self.getUtils().log("Writing BTTV emotes to file");
                            _fs.writeFileSync(_dataPath + "/emotes_bttv.json", JSON.stringify(emoteData), "utf8");
                        }catch(err) { console.log(err); }

                        self.getUtils().execJs('var emotesBTTV = '+JSON.stringify(emoteData) +';');
                        self.getUtils().sendIcpAsync("loaded-emotedata-bttv");
                    });
                    break;
                //Bttv emotes loaded
                case 'loaded-emotedata-bttv':
                    self.getUtils().sendIcpAsync("start-betterdiscord");
                    break;
                //Start BetterDiscord
                case 'start-betterdiscord':
                    self.getUtils().updateLoading("Starting Up", 100, 100);
                    self.getUtils().execJs('var mainCore; var startBda = function() { mainCore = new Core(); mainCore.init(); }; startBda();');

                    //Remove loading node
                    setTimeout(function() {
                        self.getUtils().execJs('$("#bd-status").parent().parent().hide();');
                    }, 2000);

                    break;
            }
        });

        self.getUtils().execJs('var version = "'+_version+'"');
        //Load jQuery
        self.getUtils().updateLoading("Loading Resources(jQuery)", 0, 100);
        self.getUtils().injectJavaScriptSync("//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js", "loaded-jquery");
    });
};

exports.BetterDiscord = BetterDiscord;