function end(c) {
    console.log('\n[Execution finished]');
}

let _stdout = '';

function _pExec(c) {
    process.stdout.write(_stdout);
    init(c);
}

function _pEnd(c) {
    if(c)
    switch(c.val) {
        case ' ': _pEnd(c.next());break;
        case '\n':
        case '\r':
        case ';': _pExec(c.next());break;
        default: end();
    }
    else end();
}

function _pInStdOut(c) {
    _stdout += c.val;
    c = c.next();
    if(c)
    switch(c.val) {
        case '\'': _pEnd(c.next());break;
        default: _pInStdOut(c);
    }
    else end();
}

function _pInit(c) {
    _stdout = '';
    if(c)
    switch(c.val) {
        case "\'": _pEnd(c.next());break;
        default: _pInStdOut(c);
    }
    else end();
}

{
    let nome1 = 'Jefferson';
    
}

function _pInitL(c) {
    lastStore = c.val;
    _stdout = store[lastStore]+'';
    c = c.next();
    if(c)
    switch(c.val) {
        case ';': _pExec(c);break;
        default: end();
    }
    else end();
}

function _p(c) {
    if(c)
    switch(c.val) {
        case null: end();break;
        case ' ': _p(c.next());break;
        case "'": _pInit(c.next());break;
        default: _pInitL(c);
    }
    else end();
}

let store = {};
let lastStore = null;
let _storeVal = '';

function _lEnd(c) {
    store[lastStore] = _storeVal;
    init(c);
}

function _lEndStr(c) {
    if(c)
    switch(c.val) {
        case ' ': _EndStr(c.next());break;
        case ';': _lEnd(c.next());break;
        default: end();
    }
    else end();
}

function _lInsStr(c) {
    _storeVal += c.val;
    c = c.next();
    if(c)
    switch(c.val) {
        case "\'": _lEndStr(c.next());break;
        default: _lInsStr(c);
    }
    else end();
}

function _lInsOther(c) {
    store[lastStore] = parseInt(c.val);
    c = c.next();
    if(c)
    switch(c.val) {
        case ';': init(c.next());break;
        default: end();
    }
    else end();
}

function _lTilVal(c) {
    if(c)
    switch(c.val) {
        case "\'": _lInsStr(c.next());break;
        case ' ': _lTilVal(c.next());break;
        default: _lInsOther(c);
    }
    else end();
}

function _lInit(c) {
    lastStore = c.val;
    store[lastStore] = null;
    _storeVal = '';
    c = c.next();
    if(c)
    switch(c.val) {
        case ' ': _lTilVal(c.next());break;
        default: end();
    }
    else end();
}

function _lTilChar(c) {
    if(c)
    switch(c.val) {
        case ' ': _lTilChar(c.next());break;
        default: _lInit(c);break;
    }
    else end();
}

function _l(c) {
    if(c)
    switch(c.val) {
        case ' ': _lTilChar(c.next());break;
        default: end();
    }
    else end();
}

function init(c) {
    if(c)
    switch(c.val) {
        case 'p': _p(c.next());break;
        case 'l': _l(c.next());break;
        case '\n':
        case '\r':
        case ';':
        case ' ': init(c.next());break;
        default: end(c); 
    }
    else end();
}

function makeItParserable(con) {
    let o = {
        i: 0,
        con: con
    };
    
    o.next = () => {
        if(o.i >= o.con.length) return {
            val: null,
            next: () => {
                console.log('Error! END OF FILE!');
            }
        }
        return  {
            val: o.con[o.i++],
            next: o.next
        }
    }
    
    return o;
}

function parse(con) {
    let parserable = makeItParserable(con);
    init(parserable.next());
}

let content = `
p 'Hello Buddy!\n';
p 'Can you please tell me your name!?\n';
l n 'Jefferson';
p n;
p '\n';
p 'Hi ';p n;p '!\n';
p 'How are you!? How old are you?\n';
l a 9;
p a;
p '\n';
p 'Cool! So you are ';p a;p ' years old!\n';
p 'What a nice age to be alive! Huh!?\n';
`;

parse(content);

console.log("\n\n\n");
console.log('store: ');
console.log(store);
