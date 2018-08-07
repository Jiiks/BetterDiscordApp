//META{"name":"dblClickEdit"}*//

var dblClickEdit = function () {};

dblClickEdit.prototype.handler = function(e) {
    const message = e.target.closest('[class^=messageCozy]') || e.target.closest('[class^=messageCompact]');
    if (!message) return;
    const btn = message.querySelector('[class^=buttonContainer] [class^=button-]');
    if (!btn) return;
    btn.click();
    const popup = document.querySelector('[class^=container][role=menu]');
    if (!popup) return;
    const rii = popup[Object.keys(popup).find(k => k.startsWith('__reactInternal'))];
    if (!rii || !rii.memoizedProps || !rii.memoizedProps.children || !rii.memoizedProps.children[1] || !rii.memoizedProps.children[1].props || !rii.memoizedProps.children[1].props.onClick) return;
    rii.memoizedProps.children[1].props.onClick();
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
    return "0.2.1";
};
dblClickEdit.prototype.getAuthor = function () {
    return "Jiiks";
};
