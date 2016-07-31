/* BetterDiscordApp DevMode JavaScript
 * Version: 1.0
 * Author: Jiiks | http://jiiks.net
 * Date: 22/05/2016
 * Last Update: 22/05/2016
 * https://github.com/Jiiks/BetterDiscordApp
 */
 
 function devMode() {}
 
 devMode.prototype.enable = function() {
     var self = this;
     $(window).on("keydown.bdDevmode", function(e) {
         if(e.which === 119) {//F8
            console.log('%c[%cDM%c] %cBreak/Resume', 'color: red;', 'color: #303030; font-weight:700;', 'color:red;', '');
            debugger;
         }
     });
     /*
     $(window).on("mousedown.bdDevmode", function(e) {
         if(e.which !== 3) return;
         var parents = [];
         $(e.toElement).parents().addBack().not('html').each(function() {
             var entry = "";
             if(this.className) {
                 entry += "." + this.className.trim().replace(/ /g, ".");
                 parents.push(entry);
             }
         });
         self.lastSelector = parents.join(" ").trim();

         function attach() {
            var cm = $(".context-menu");
            if(cm.length <= 0) {
                return;
                cm = $("body").append('<div class="context-menu"></div>');
            }
            
            var cmo = $("<div/>", {
                class: "item-group"
            });
            var cmi = $("<div/>", {
                class: "item",
                click: function() {
                    var t = $("<textarea/>", { text: self.lastSelector }).appendTo("body");
                    t.select();
                    document.execCommand("copy");
                    t.remove();
                    cm.remove();
                }
            }).append($("<span/>", { text: "Copy Selector" }));
            cmo.append(cmi);
            cm.append(cmo);
            cm.css("top", (cm.css("top").replace("px", "") - 28) + "px");
         }
         
         setTimeout(attach, 100);
         
         e.stopPropagation();
     });
     */
 };
 
 devMode.prototype.disable = function() {
     $(window).off("keydown.bdDevmode");
     $(window).off("mousedown.bdDevmode")
 };