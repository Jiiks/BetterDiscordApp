# BetterDiscord (v2)

This is a rewrite of BetterDiscord. As of right now, all development is happening here. This branch is not ready for production yet. Looking to download the current stable version of BetterDiscord? [Check the releases](https://github.com/Jiiks/BetterDiscordApp/releases) or [the site](https://betterdiscord.net).

## Setting up a development environment

**Step 1**:  
Clone this repository (`git clone https://github.com/jiiks/betterdiscordapp`) and switch to the v2 branch (`git checkout v2`).

**Step 2**:  
Run `npm install` (or `yarn install`) to pull in all required dependencies.

**Step 3**:  
Copy the files in `src/injector` to `<path to discord>/resources/app`. `<path to discord>/resources/app/index.js` should be [the `index.js` from `src/injector`](https://github.com/Jiiks/BetterDiscordApp/blob/v2/src/injector/index.js).

**Step 4**:  
Modify `<path to discord>/resources/app/config.json` to point to the correct paths. The following values need to be adjusted:
- `basePath` should point to the location of the cloned repository.
- `dataPath` should contain to a directory where user settings can be stored (this can be anything, as long as it exists).
- `bdPath` should point to the location of `src/core/main.js`. Most of the time this is simply `<location to cloned repo>/src/core/main.js`.

The rest of the settings can be left as-is.

**Step 5**:  
Run `npm run build-client` to build the `src/client` bundle. You can use `npm run watch-client` to do this automatically whenever a file changes.

**Step 6**:  
Restart Discord.

You can now simply `git pull` and restart Discord to retrieve any new changes.

## License

BetterDiscord is released under the [MIT License](https://github.com/Jiiks/BetterDiscordApp/blob/v2/LICENSE).