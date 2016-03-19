var opts = {
    type: 0
};
//添加class
var addclas = function(elem, className) {
    var fullClassName = elem.className;
    fullClassName += " ";
    fullClassName += className;
    elem.className = fullClassName;
};
//ajax
var ajax = function(method, url, cb, data, dataType) {

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open(method.toUpperCase(), url, true);
    if (method.toLowerCase() == 'get') {
        xhr.send(null);
    } else {
        var contentType = 'application/x-www-form-urlencoded';
        if (dataType) {
            if (dataType.toLowerCase() == 'json') {
                contentType = 'application/json';
            };
        };
        xhr.setRequestHeader("Content-type", contentType);
        xhr.send(data);
    };
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                cb(xhr.responseText);
            };
        };
    };
};
var removeClas = function(elem, className) {
    var fullClassName = elem.className;
    var newClasName = fullClassName.split(className)
}
var q = function(css) {
    return document.querySelector(css);
};
var qa = function(css) {
    return document.querySelectorAll(css);
}

var hiddenBox = function() {
    addclas(q('.to'), 'toa');
    addclas(q('.bo'), 'boa');
    setTimeout(function() {
        addclas(qa('.box')[0], 'hiddenBox');
        addclas(qa('.box')[1], 'hiddenBox');
    }, 3000);
};
var show = function() {
    addclas(q('.text'), 'blText');
    addclas(q('.sumb'), 'blSumb');
    addclas(q('.iBox p'), 'opp');

};
var verification = function() {
    if (q('.text').value !== "") {
        return true;
    };
};
var afSubmit = function(data) {
    console.log(data);
    var json = JSON.parse(data);
    if (json.succ) {
        alert('挖坑成功');
        window.location.reload();
    } else {
        alert(json.msg);
        window.location.reload();
    }
}
var afQuery = function(data) {
    console.log(data);
    var json = JSON.parse(data);
    if (json.succ) {
        console.log(json.msg.msg);
        addclas(q('.iBox'), 'show');
        q('.result').innerText = json.msg.msg;
        addclas(q('.result'), 'opp');
    } else {
        alert(json.msg);
        window.location.reload();
    }
}
var submit = function() {
    if (verification) {
        var data = { msg: q('.iBox textarea').value };
        var jsonData = JSON.stringify(data);
        ajax('post', 'api/submit', afSubmit, jsonData, 'json');
    }else{
        alert('内容不合法');
    };
};
var query = function() {
    ajax('get', 'api/query', afQuery);
}
var ani = function(num) {
    hiddenBox();
    if (num === 1) {
        addclas(q('.iBox'), 'show');
        setTimeout(show, 130);
    };
    if (num === 2) {
        query();
    }
    console.log(num);
    opts.type = num;
}
qa('.box span')[0].addEventListener('click', function() {
    ani(1);
}, false);
qa('.box span')[1].addEventListener('click', function() {
    ani(2);
}, false);
q('.sumb').addEventListener('click', submit, false);
