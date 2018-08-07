//META{"name":"dblClickEdit"}*//

var dblClickEdit = function () {};

dblClickEdit.prototype.handler = function(e) {
    const message = e.target.closest('[class^=messageCozy]');
    if (!message) return;
    const btn = message.querySelector('[class^=buttonContainer] [class^=button-]');
    if (!btn) return;
    btn.click();
    for (let btn of [...document.querySelectorAll(`[role=menu] [type=button]`)]) { if (btn.innerText && btn.innerText.includes('Edit')) btn.click(); }
};

dblClickEdit.prototype.onMessage = function () {
};
dblClickEdit.prototype.onSwitch = function () {
};
dblClickEdit.prototype.start = function () {
    document.addEventListener('dblclick', this.handler);
};

dblClickEdit.prototype.load = function () {};
dblClickEdit.prototype.unload = function () {
    document.removeEventListener('dblclick', this.handler);
};
dblClickEdit.prototype.stop = function () {
    document.removeEventListener('dblclick', this.handler);
};
dblClickEdit.prototype.getSettingsPanel = function () {
    return "";
};

dblClickEdit.prototype.getName = function () {
    return "Double click edit";
};
dblClickEdit.prototype.getDescription = function () {
    return "Double click messages to edit them";
};
dblClickEdit.prototype.getVersion = function () {
    return "0.1.2";
};
dblClickEdit.prototype.getAuthor = function () {
    return "Jiiks";
};
