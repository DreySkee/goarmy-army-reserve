function hideSelectNodes() {
    hideShowSelectNodes('hidden');
}

function showSelectNodes() {
    hideShowSelectNodes('visible');
}

function hideShowSelectNodes(visibility) {
    //if (!Prototype.Browser.IE) return;
    //check to see if browser is ie
    if (!isIE6down()) return;
    var els = document.getElementsByTagName("select");
    if (els == null) return;

    for (var i = 0; i < els.length; i++) {
        els[i].style.visibility = visibility;
    }


}

function isIE6down() {
    if (navigator.userAgent.indexOf("MSIE") != -1) {
        if (navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE") + 5, navigator.userAgent.indexOf("MSIE") + 6) <= 6) {
            return true;
        }

    }
    return false;

}

function showTooltip(e, id) {

    document.getElementById(id).style.visibility = "visible";

    hideSelectNodes();

    Locate(e, id);
}

function hideTooltip(e, id) {
    showSelectNodes();
    document.getElementById(id).style.visibility = "hidden";
}


function Locate(e, id) {
    var posx = 0,posy = 0;
    if (e == null) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY) {
        if (document.documentElement.scrollTop) {
            posx = e.clientX + document.documentElement.scrollLeft;
            posy = e.clientY + document.documentElement.scrollTop;
        }
        else {
            posx = e.clientX + document.body.scrollLeft;
            posy = e.clientY + document.body.scrollTop;
        }
    }
    document.getElementById(id).style.top = (posy - 100) + "px";
    document.getElementById(id).style.left = (posx - 20) + "px";
    document.getElementById(id).zindex = 100;
    jQuery(e).css('cursor','default');
}


