function obj(root, parts) {
    var root_name = parts.shift();
    if (!(root_name in root)) {
        return null;
    } else if (parts.length === 0) {
        return root[root_name];
    }
    return obj(root[root_name], parts)
}

function enxmail_core(){
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
            if (data["code"] == 1){
                window.location.href = "/";
            }
            document.title = "Profile: " + escape(data.username);
            $(".page-title h1").html('<span class="icon iconfont icon-info"></span>Profile: ' + escape(data.username));
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
                    premium_test = name.indexOf("_premium");
                    console.log(premium_test);
                    if (finger_test !== -1){
                        $(element).text(fingerprint);
                    } else if (premium_test !== -1){
                        if (data["p"] == 1) {
                            $(element).text("Enabled");
                        } else {
                            $(element).text("Disabled");
                        }
                    } else if(v !== null) {
                        $(element).text(v);
                    }
                }
            });
            console.log(data["cert"]);
            $("#certi").html("");
            for(var i in data["cert"]){
                var xdata = '<span class="badge ' + data["cert"][i]["type"] + '" style="vertical-align: top;">' + data["cert"][i]["data"] + '</span>';
                console.log(xdata);
                $("#certi").html($("#certi").html() + xdata);
            }
        });
    });

    $(function () {
        if (window.location.pathname !== "/board/") {
            return;
        }
    
        var url = "https://enxmail_api.rdpstudio.top/api/v1/clientserver/theboard";
        $.getJSON(url, function (data) {
            if (data["code"] == 1){
                window.location.href = "/";
            }
    
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
                    if(v !== null) {
                        $(element).html(v);
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
}

function enxmail_core_starter(){
    try {
        enxmail_core();
    } catch (error) {
        setTimeout(enxmail_core_starter, 500);
    }
}

setTimeout(enxmail_core_starter, 500);