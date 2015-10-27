/*
 * BetterDiscordApp Installer v0.3.2
 */

var dver = "0.0.280";

var asar = require('asar');
var wrench = require('wrench');
var fs = require('fs-promise');
var readline = require('readline');
var util = require('util');
var path = require('path');

var _discordPath = path.join(process.env.LOCALAPPDATA, `/Discord/app-${dver}`, "/resources");
var _appPath = path.join(_discordPath, '/app');
var _betterDiscordPath = path.join(_appPath, '/node_modules', '/BetterDiscord');
var _packageJson = path.resolve('../app/package.json');
var _index = path.resolve('../app/app/index.js');

function install() {
    console.log(`Looking for discord resources at: ${_discordPath}`);

    fs.stat(_discordPath)
        .then(() => {
            console.log(
                `Discord resources found at: ${_discordPath}`
            );

            fs.stat(_appPath)
                .then(() => {
                    console.log(`Deleting ${_appPath} folder.`);
                    return fs.rmdir(_appPath)
                        .then(() => {
                            console.log(`Deleted ${_appPath} folder.`);              
                        });
                })
                .catch(err => {
                    console.log("App path not found, continuing...");
                })

            fs.stat(_betterDiscordPath)
                .then(() => {
                    console.log(`Deleting ${_betterDiscordPath} folder.`);

                    return fs.rmdir(_betterDiscordPath)
                        .then(() => {
                            console.log(`Deleted ${_betterDiscordPath} folder.`);
                        });
                })
                .catch(err => {
                    console.log("Old better discord installation not found, continuing...");
                })
        })
        .catch(err => {
            console.log("Unable to locate discord installation, stopping...");
            process.exit();
        });
    /*
    fs.stat(_discordPath, function(err, stats) {
        if(err) {
            console.log(err);
            process.exit();
        }

        console.log(
            `Discord resources found at: ${_discordPath}
            Looking for app folder...`
        );

        if(fs.statSync(_discordPath + _appFolder)) {
            console.log("Deleting " + _discordPath + _appFolder + " folder.");
            wrench.rmdirSyncRecursive(_discordPath + _appFolder);
            console.log("Deleted " + _discordPath + _appFolder + " folder.");
        }

            if(fs.existsSync(_discordPath + "\\node_modules\\BetterDiscord")) {
                console.log("Deleting " + _discordPath + "\\node_modules\\BetterDiscord" + " folder.");
                wrench.rmdirSyncRecursive(_discordPath + "\\node_modules\\BetterDiscord");
                console.log("Deleted " + _discordPath + "\\node_modules\\BetterDiscord" + " folder.");
            }

            console.log("Copying BetterDiscord");

            fs.mkdirSync(_discordPath + "\\node_modules\\BetterDiscord");

            wrench.copyDirSyncRecursive(__dirname + "\\BetterDiscord\\", _discordPath + "\\node_modules\\BetterDiscord\\", {forceDelete: true});

            console.log("Looking for app archive");
            if(fs.existsSync(_discordPath + _appArchive)) {
                console.log("App archive found at: " + _discordPath + _appArchive);
            } else {
                console.log("Failed to locate app archive at: " + _discordPath + _appArchive);
                process.exit();
            }

            console.log("Extracting app archive");


            asar.extractAll(_discordPath + _appArchive, _discordPath + _appFolder);

			fs.exists(_discordPath + _appFolder, function(exists) {
				if(exists) {
					console.log("Extracted to: " + _discordPath + _appFolder);
					console.log("Injecting index.js");

					var data = fs.readFileSync(_discordPath + _index).toString().split("\n");
					data.splice(83, 0, 'var _betterDiscord = require(\'betterdiscord\');\n');
					data.splice(497, 0, '_betterDiscord = new _betterDiscord.BetterDiscord(mainWindow); \n _betterDiscord.init(); \n');


					fs.writeFile(_discordPath + _index, data.join("\n"), function(err) {
						if(err) return console.log(err);

						console.log("Injected index.js");
						console.log("Injecting package.json");

						var data = fs.readFileSync(_discordPath + _packageJson).toString().split("\n");
						data.splice(10, 0, '"betterdiscord":"^0.1.2",');

						fs.writeFile(_discordPath + _packageJson, data.join("\n"), function(err) {
							if(err) return console.log(err);

							console.log("Injected package.json");
							console.log("Looks like were done here :)");
							process.exit();
						});
					});

				} else {
					console.log("Something went wrong, rerun.");
					process.exit();
				}
			});

        } else {
            console.log("Discord resources not found at: " + _discordPath);
            process.exit();
        }

    });
    */
}

function init() {

    console.log("BetterDiscord Simple Installer v0.3 for Discord "+dver+" by Jiiks.");
    console.log("If Discord has updated then download the latest installer.");

    var rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    rl.question("The following directories will be deleted if they exists: discorpath\\app, discordpath\\node_modules\\BetterDiscord, is this ok? Y/N \n", function(answer) {

        var alc = answer.toLowerCase();

        switch(alc) {
            case "y":
                install();
                break;
            case "yes":
                install();
                break;
            case "n":
                process.exit();
                break;
            case "no":
                process.exit();
                break;
        }
    });
}

init();
