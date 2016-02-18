/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function setInitialFocus(componentId) {
    return document.getElementById(componentId).focus();
}

function setMessageFocus() {
    document.getElementById('document:body').scrollIntoView();
    document.getElementById('form1:message').focus();
}


function submitAndDisable(button, msg, target) {
    //   disableBtnComponent(button.id);
    //    button.value=msg;
    if (target) {
        // In this case we want the non-ajax behavior, but we still need the indicator
        admingui.ajax.ajaxStart();
        var oldaction = button.form.action;
        var oldtarget = button.form.target;
        button.form.target = target;
        var sep = (button.form.action.indexOf("?") > -1) ? "&" : "?";
        button.form.action += sep + button.name + "=" + encodeURI(button.value) + "&bare=false"; //bug# 6294035
        button.form.submit();
        button.form.action = oldaction;
        button.form.target = oldtarget;
        return false;
    }
    var args = {};
    args[button.id] = button.id;
    admingui.ajax.postAjaxRequest(button, args);
    return false;
}
function setReadOnlyDate() {
    var images = document.getElementsByTagName('img');
    for (i = 0; i < images.length; i++) {
        if (images[i].onclick != null) {
            var onclickProperty = images[i].onclick.toString();
            if (onclickProperty.indexOf('getPosition') >= 0 || onclickProperty.indexOf('displayCalendar') >= 0) {
                var quote = /'/;
                if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
                    var firefoxVersion = new Number(RegExp.$1)
                    if (firefoxVersion < 16.0) {
                        quote = /"/;
                    }
                }
                var element = onclickProperty.split(quote)[1];
                if (element != undefined) {
                    document.getElementById(element.toString()).readOnly = true;
                }

            }
        }
    }
}
function deletedColor(tableId, trSize) {
    var rowsLength = document.getElementById('form1:' + tableId + '').getElementsByTagName('tr').length;
    for (var i = 0; i < rowsLength - trSize; i++) {
        var component = 'form1:' + tableId.concat(':').concat(i);
        if (document.getElementById(component).className.indexOf('iceRowSelSelected') >= 0) {
            document.getElementById(component).style.background = '#f1c8c8';
        }
    }

}
function deletedColors(tableId, trSize) {
    var rowsLength = document.getElementById('form1:panelTabSet1:0:' + tableId + '').getElementsByTagName('tr').length;
    for (var i = 0; i < rowsLength - trSize; i++) {
        var component = 'form1:panelTabSet1:0:' + tableId.concat(':').concat(i);
        if (document.getElementById(component).className.indexOf('iceRowSelSelected') >= 0) {
            document.getElementById(component).style.background = '#f1c8c8';
        }
    }
    function start() {
        PF('statusDialog').show();
    }

    function stop() {
        PF('statusDialog').hide();
    }

}