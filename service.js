function obj(root, parts) {
    var root_name = parts.shift();
    if (!(root_name in root)) {
        return null;
    } else if (parts.length === 0) {
        return root[root_name];
    }
    return obj(root[root_name], parts)
}

$(function () {
    if (window.location.pathname !== "/profile/") {
        return;
    }

    var fingerprint = window.location.search.substr(1);
    if( fingerprint[0] === '!' )
        fingerprint = fingerprint.substr(1);

    if (fingerprint.length !== 37) {
        window.location.href = "/guide/#profile-page-guide";
        return;
    }

    var url = "https://enxmail_api.rdpstudio.top/api/v1/keyserver/get?fingerprint=" + fingerprint;
    $.getJSON(url, function (data) {
        document.title = escape(data.username);
        console.log(document.title);

        $('*[class^="unit."]').each(function (_, element) {
            var name = $(element).attr('class').split(' ')[0];
            var parts = name.split('.');
            console.log(name);
            console.log(parts);

            // remove unit.
            parts.shift();
            // console.log(parts);
            var v = obj(data, parts);
            // console.log("v = " + v);

            if (true) {
                finger_test = name.indexOf("_fingerprint");
                console.log(finger_test);
                if (finger_test !== -1){
                    $(element).text(fingerprint);
                } else if(v !== null) {
                    $(element).text(v);
                }
            }
        });
    });
});

$(function () {
    if (window.location.pathname !== "/") {
        return;
    }

    var url = "https://enxmail_api.rdpstudio.top/api/v1/clientserver/sysstatus";
    $.getJSON(url, function (data) {
        $('*[class^="sys."]').each(function (_, element) {
            var name = $(element).attr('class').split(' ')[0];
            var parts = name.split('.');

            // remove unit.
            parts.shift();
            // console.log(parts);
            var v = obj(data, parts);
            // console.log("v = " + v);

            if (v !== null) {
                $(element).text(v);
            }
        });
    });
});