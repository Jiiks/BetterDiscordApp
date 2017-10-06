window.aot = false;
window.liveUpdate = false;
window.autoSave = false;
window.hideBackdrop = false;
window.extEditor = false;

const { remote } = require('electron');
const { ipcRenderer } = require('electron');

ipcRenderer.on('bd-async', (event, arg) => {
    const { module, command, data } = arg;
    if (!module || module !== 'css-editor') return;
    if (!command || !data) return;

    if (data.error) {
        alert(JSON.stringify(data.message));
        return;
    }

    switch(command) {
        case 'set-css':
            mycm.setValue(data);
            document.getElementById("spinner").className = "hidden";
            break;
        case 'save-ok':
            var alert = document.getElementById("alert");
            alert.innerText = "Saved!";
            alert.className = "success visible";
            setTimeout(() => {
                alert.className = "success";
            }, 1500);
            break;
        case 'save-error':
            console.log(err);
            var alert = document.getElementById("alert");
            alert.innerText = "Failed to save! Check console for details";
            alert.className = "danger visible";
            setTimeout(() => {
                alert.className = "danger";
            }, 1500);
            break;
    }

});

function closeEditor() {
    const bounds = remote.getCurrentWindow().getBounds();
    ipcRenderer.send('bd-async', { module: 'css-editor', command: 'close-editor', data: { bounds } });
    closeWindow();
}

window.onbeforeunload = (e) => {
    ipcRenderer.send('bd-async', { module: 'css-editor', command: 'close-editor' });
}

function save() {
    ipcRenderer.send('bd-async', { module: 'css-editor', command: 'save', data: mycm.getValue() });
}

function update() {
    ipcRenderer.send('bd-async', { module: 'css-editor', command: 'update-css', data: { 'css': mycm.getValue() } });
}

function closeWindow() {
    window.close();
}

function toggleAot(e) {
    window.aot = !window.aot;
    let curwin = remote.getCurrentWindow();
    curwin.setAlwaysOnTop(window.aot);
    e.className = window.aot ? 'aot enabled' : 'aot';
}

function toggleOption(e, n) {
    switch (n) {
        case 'live-update':
            window.liveUpdate = !window.liveUpdate;
            e.className = window.liveUpdate ? 'checkbox-container checked' : 'checkbox-container';
            break;
        case 'auto-save':
            window.autoSave = !window.autoSave;
            e.className = window.autoSave ? 'checkbox-container checked' : 'checkbox-container';
            break;
        case 'hide-backdrop':
            window.hideBackdrop = !window.hideBackdrop;
            e.className = window.hideBackdrop ? 'checkbox-container checked' : 'checkbox-container';
            break;
        case 'external-editor':
            window.extEditor = !window.extEditor;
            if (window.extEditor) {
                ipcRenderer.send('css-editor', { command: 'open-ext-editor' });
                mycm.setOption('readOnly', true);
                document.getElementById("windowtitle").innerText = "CSS Editor - Read Only Mode";
                document.getElementById("eehint").className = "visible";
                window.autoSave = false;
                document.getElementById("cbAutoSave").className = "checkbox-container hidden";
                document.getElementById("btnSave").className = "hidden";
            } else {
                ipcRenderer.send('css-editor', { command: 'close-ext-editor' });
                document.getElementById("windowtitle").innerText = "CSS Editor";
                document.getElementById("eehint").className = "";
                document.getElementById("cbAutoSave").className = "checkbox-container";
                document.getElementById("btnSave").className = "";
            }

            mycm.setOption('readOnly', window.extEditor);
            e.className = window.extEditor ? 'checkbox-container checked' : 'checkbox-container';
            break;
    }
}
window.controlDown = false;

document.onkeyup = (e) => {
    e = e || window.event;

    let ctrl = false;
    if ("key" in e) {
        ctrl = (e.key === "Control" || e.key === "Ctrl");
    } else {
        ctrl = (e.keyCode === 17);
    }

    if (ctrl) {
        window.controlDown = false;
        document.getElementById("hints").className = "";
        document.getElementById("cmhints").className = "";
    }
};

document.onkeydown = (e) => {
    e = e || window.event;

    let isEscape = false;
    let ctrl = false;
    let saveDown = false;
    let updateDown = false;
    let alt = false;

    if ("key" in e) {
        isEscape = (e.key === "Escape" || e.key === "Esc");
        ctrl = (e.key === "Control" || e.key === "Ctrl");
        saveDown = (e.key === "s");
        updateDown = (e.key === "h");
        alt = (e.key === "Alt");
    } else {
        isEscape = (e.keyCode === 27);
        ctrl = (e.keyCode === 17);
        saveDown = (e.keyCode === 83);
        updateDown = (e.keyCode === 72);
        alt = (e.keyCode === 18);
    }

    if (isEscape) {
        window.close();
    }

    if (alt) {
        ctrl = false;
        window.controlDown = false;
        document.getElementById("hints").className = "";
        document.getElementById("cmhints").className = "";
    }

    if (ctrl) {
        window.controlDown = true;
        document.getElementById("hints").className = "visible";
        document.getElementById("cmhints").className = "visible";
    }

    if (saveDown && window.controlDown) save();
    if (updateDown && window.controlDown) update();
}

const mycm = CodeMirror(document.getElementById("cm-container"), {
    lineNumbers: true,
    mode: 'css',
    indentUnit: 4,
    theme: 'material',
    scrollbarStyle: 'overlay',
    extraKeys: { 'Ctrl-Space': 'autocomplete' },
    dialog: { 'position': 'bottom' }
});

ipcRenderer.send('bd-async', { module: 'css-editor', command: 'get-css' });

const ExcludedIntelliSenseTriggerKeys = {
    "8": "backspace",
    "9": "tab",
    "13": "enter",
    "16": "shift",
    "17": "ctrl",
    "18": "alt",
    "19": "pause",
    "20": "capslock",
    "27": "escape",
    "33": "pageup",
    "34": "pagedown",
    "35": "end",
    "36": "home",
    "37": "left",
    "38": "up",
    "39": "right",
    "40": "down",
    "45": "insert",
    "46": "delete",
    "91": "left window key",
    "92": "right window key",
    "93": "select",
    "107": "add",
    "109": "subtract",
    "110": "decimal point",
    "111": "divide",
    "112": "f1",
    "113": "f2",
    "114": "f3",
    "115": "f4",
    "116": "f5",
    "117": "f6",
    "118": "f7",
    "119": "f8",
    "120": "f9",
    "121": "f10",
    "122": "f11",
    "123": "f12",
    "144": "numlock",
    "145": "scrolllock",
    "186": "semicolon",
    "187": "equalsign",
    "188": "comma",
    "189": "dash",
    "190": "period",
    "191": "slash",
    "192": "graveaccent",
    "220": "backslash",
    "222": "quote"
}

mycm.on('keyup', function (editor, event) {
    if (window.controlDown) return;
    if (ExcludedIntelliSenseTriggerKeys[event.keyCode]) return;
    CodeMirror.commands.autocomplete(editor, null, { completeSingle: false });
});


mycm.on('change', cm => {
    if (window.liveUpdate) update();
    if (window.autoSave) save();
});