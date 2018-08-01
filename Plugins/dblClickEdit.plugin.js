//META{"name":"dblClickEdit"}*//

var dblClickEdit = function () {};

dblClickEdit.prototype.onMessage = function () {
};
dblClickEdit.prototype.onSwitch = function () {
};
dblClickEdit.prototype.start = function () {
    $(document).on("dblclick.dce", function(e) {
        var target = $(e.target);
        if(target.parents(".message-1PNnaP").length > 0) {
            var msg = target.parents(".message-1PNnaP").first();
            var opt = msg.find(".button-3Jq0g9");
            opt.click();

            $.each($(".popout-3sVMXz .button-38aScr"), (index, value) => {
                var option = $(value);
                if(option.text() === "Edit") {
                    option.click();
                }
            });

        }
    });
};

dblClickEdit.prototype.load = function () {};
dblClickEdit.prototype.unload = function () {
    $(document).off("dblclick.dce");
};
dblClickEdit.prototype.stop = function () {
    $(document).off("dblclick.dce");
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
