function cookiesOfforOn() {
	var cookiesOn = false;
	if (!( (document.cookie == '') || (document.cookie == null)
			|| (document.cookie == 'null') )) {
		cTemp = '';
		setCookie('cookies_on', 'yes', null, '/');
		cTemp = getCookie('cookies_on');
		if (cTemp == 'yes') {
			cookiesOn = true;
			deleteCookie('cookies_on', '/');
		} else if (cTemp != 'yes') {
			cookiesOn = false;
		}
	} else {
		cookiesOn = false;
	}
	return cookiesOn;
}

function setCookie(name, value, expires, path, domain, secure) {
	if (!domain) {
		domain = getDomain()
	}
	var curCookie = name + "=" + escape(value)
			+ ((expires) ? "; expires=" + expires.toGMTString() : "")
			+ ((path) ? "; path=" + path : "")
			+ ((domain) ? "; domain=" + domain : "")
			+ ((secure) ? "; secure" : "");
	document.cookie = curCookie;
}

function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0)
			return null;
	} else
		begin += 2;
	var end = document.cookie.indexOf(";", begin);
	if (end == -1)
		end = dc.length;
	return unescape(dc.substring(begin + prefix.length, end));
}

// Return the last 2 components of domain name with preceding dot, or empty string if no dot present
function getDomain() {
	var dom = ""
	var doms = document.domain.split(".")
	if (doms.length>=2) {
		dom = "." + doms.slice(doms.length-2).join(".")
	}
	return dom
}

function deleteCookie(name, path, domain) {
	if (getCookie(name)) {
		document.cookie = name + "=" + ((path) ? "; path=" + path : "")
				+ ((domain) ? "; domain=" + domain : "")
				+ "; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}
