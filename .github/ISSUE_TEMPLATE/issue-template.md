---
name: Issue template
about: Template for all future issues

---

*Before* you create an issue, make sure you have:

1. Checked that that issue hasn't already been submitted. You can search open issues [here](https://github.com/Jiiks/BetterDiscordApp/issues).
2. Checked that there isn't an answer in either of the Discord servers (if you can access them - don't complain if you can't).
3. Checked that it isn't in the following list of frequently asked questions.

If none of that helps you, delete the prefilled contents of this issue and ask whatever question you may have *in English so we can understand it*.

### FAQ

> *BetterDiscord doesn't work.*  
> *BetterDiscord won't install.*  
> *BetterDiscord doesn't support macOS.*

This branch isn't being updated anymore. Until BetterDiscord v2 is released you can use [Zach Rauen's fork](https://github.com/rauenzi/BetterDiscordApp).

> *BetterDiscord doesn't support Linux.*

There's an installer script for BetterDiscord on Linux available [here](https://github.com/bb010g/betterdiscordctl).

> *BetterDiscord doesn't work in my browser.*

The browser version doesn't exist anymore. Use the desktop client.

> *BetterDiscord doesn't work on my phone.*

... and never will. BetterDiscord is a client modification for Discord's desktop Electron client. (Electron is a framework for making cross platform apps using web technologies. Basically the desktop client is just the web client in a specialised web browser.)

> *Is there any security risks involved with installing BetterDiscord?*  
> *My friend was hacked after he/she installed BetterDiscord.*

*Not by itself.* However, BetterDiscord allows loading plugins. Discord, BetterDiscord, and any plugins you install (even without enabling) have full access to your system as your local user account. (Including full access to your Discord account.) So, make sure you only download plugins from sources you trust.

Also, please note that [BetterDocs](https://betterdocs.net) and other third-party sources by definition *are not* affiliated with BetterDiscord or it's developers.

> *How do I install plugin [x]?*  
> *Is there a plugin to [x]?*  
> *Does [x] theme exist?*

https://imgur.com/lczPQxW

> *Minimal mode broke everything.*

You can get back into Discord's settings to disable it by pressing `Control + ,` on Windows and Linux or `Command + ,` on macOS.

> *How do I completely hide messages from people I've blocked?*

Add this to your custom CSS:

```css
.message-group-blocked {
    display: none !important;
}
```

> *How do I remove BetterDiscord?*

BetterDiscord is installed to the following locations:

Platform     | Discord path
-------------|---------------
Windows      | `%APPDATA%`\discord\0.0.`*`\modules\discord_desktop_core
macOS        | ~/Library/Application Support/discord/0.0.`*`/modules/discord_desktop_core
Linux        | ~/.config/discord/0.0.`*`/modules/discord_desktop_core

To remove BetterDiscord, open the file `index.js` in that directory and make sure only this line exists:

```js
module.exports = require('./core');
```

Then, delete the `core` directory.

BetterDiscord's data is stored in the following locations:

Platform     | BetterDiscord data path
-------------|---------------
Windows      | `%APPDATA%`\BetterDiscord
macOS        | ~/Library/Preferences/BetterDiscord
Linux        | ~/.config/BetterDiscord

To remove all of BetterDiscord's data, just delete that directory.

> *BetterDiscord v2?*

[BetterDiscord v2 is the new version of BetterDiscord currently in development.](https://github.com/JsSucks/BetterDiscordApp) If you'd like to help out with BetterDiscord v2, join the JsSucks Discord server. (Invite code `KYKwv4R`.) The only requirement is JavaScript/ES6 knowledge.
