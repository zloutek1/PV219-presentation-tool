function getUrlVars() {
    var vars = {}, hash;
    var hashes = window.location.search.replace(/\?/, '')
    if (hashes != '') {
        hashes = hashes.split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars[hash[0]] = hash[1];
        }
    }
    return vars;
}

function setUrlVar(name, value) {
    let vars = getUrlVars();
    vars[name] = value;
    let hashes = '?' + $.param(vars, true);
    window.history.pushState('data', 'Title', hashes);
}

function deleteUrlVar(name) {
    let vars = getUrlVars();
    delete vars[name];
    let hashes = '?' + $.param(vars, true);
    window.history.pushState('data', 'Title', hashes);
}

function toggleUrlVar(name, value) {
    if (name in getUrlVars()) {
        deleteUrlVar(name);
    } else {
        setUrlVar(name, value);
    }
}
