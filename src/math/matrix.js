/*

    Stolen from here...
    https://github.com/sloisel/numeric

    I've pulled in the relative code that we need and refactored it a bit because there was
    a global var ref'd and the project looks like its not maintained.

    Heres a copy of the licence at the time of gathering. (15/03/2017)


    Numeric Javascript
    Copyright (C) 2011 by Sébastien Loisel

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

*/

/* eslint-disable */
function _dim(x) {
    var ret = [];
    while (typeof x === 'object') {
        ret.push(x.length);
        x = x[0];
    }
    return ret;
}

function dim(x) {
    var y, z;
    if (typeof x === 'object') {
        y = x[0];
        if (typeof y === 'object') {
            z = y[0];
            if (typeof z === 'object') {
                return _dim(x);
            }
            return [x.length, y.length];
        }
        return [x.length];
    }
    return [];
}


function sdim(A, ret, k) {
    if (typeof ret === 'undefined') {
        ret = [];
    }
    if (typeof A !== 'object') return ret;
    if (typeof k === 'undefined') {
        k = 0;
    }
    if (!(k in ret)) {
        ret[k] = 0;
    }
    if (A.length > ret[k]) ret[k] = A.length;
    var i;
    for (i in A) {
        if (A.hasOwnProperty(i)) dim(A[i], ret, k + 1);
    }
    return ret;
}


function clone(A, k, n) {
    if (typeof k === 'undefined') {
        k = 0;
    }
    if (typeof n === 'undefined') {
        n = sdim(A).length;
    }
    var i, ret = Array(A.length);
    if (k === n - 1) {
        for (i in A) {
            if (A.hasOwnProperty(i)) ret[i] = A[i];
        }
        return ret;
    }
    for (i in A) {
        if (A.hasOwnProperty(i)) ret[i] = clone(A[i], k + 1, n);
    }
    return ret;
}




function transpose(x) {
    var i, j, m = x.length,
        n = x[0].length,
        ret = Array(n),
        A0, A1, Bj;
    for (j = 0; j < n; j++) ret[j] = Array(m);
    for (i = m - 1; i >= 1; i -= 2) {
        A1 = x[i];
        A0 = x[i - 1];
        for (j = n - 1; j >= 1; --j) {
            Bj = ret[j];
            Bj[i] = A1[j];
            Bj[i - 1] = A0[j];
            --j;
            Bj = ret[j];
            Bj[i] = A1[j];
            Bj[i - 1] = A0[j];
        }
        if (j === 0) {
            Bj = ret[0];
            Bj[i] = A1[0];
            Bj[i - 1] = A0[0];
        }
    }
    if (i === 0) {
        A0 = x[0];
        for (j = n - 1; j >= 1; --j) {
            ret[j][0] = A0[j];
            --j;
            ret[j][0] = A0[j];
        }
        if (j === 0) {
            ret[0][0] = A0[0];
        }
    }
    return ret;
}

function dotVV(x, y) {
    var i, n = x.length,
        i1, ret = x[n - 1] * y[n - 1];
    for (i = n - 2; i >= 1; i -= 2) {
        i1 = i - 1;
        ret += x[i] * y[i] + x[i1] * y[i1];
    }
    if (i === 0) {
        ret += x[0] * y[0];
    }
    return ret;
}

function dotMV(x, y) {
    var p = x.length,
        i;
    var ret = Array(p);
    for (i = p - 1; i >= 0; i--) {
        ret[i] = dotVV(x[i], y);
    }
    return ret;
}

function dotMMsmall(x, y) {
    var i, j, k, p, q, r, ret, foo, bar, woo, i0;
    p = x.length;
    q = y.length;
    r = y[0].length;
    ret = Array(p);
    for (i = p - 1; i >= 0; i--) {
        foo = Array(r);
        bar = x[i];
        for (k = r - 1; k >= 0; k--) {
            woo = bar[q - 1] * y[q - 1][k];
            for (j = q - 2; j >= 1; j -= 2) {
                i0 = j - 1;
                woo += bar[j] * y[j][k] + bar[i0] * y[i0][k];
            }
            if (j === 0) {
                woo += bar[0] * y[0][k];
            }
            foo[k] = woo;
        }
        ret[i] = foo;
    }
    return ret;
}

function rep(s, v, k) {
    if (typeof k === 'undefined') {
        k = 0;
    }
    var n = s[k],
        ret = Array(n),
        i;
    if (k === s.length - 1) {
        for (i = n - 2; i >= 0; i -= 2) {
            ret[i + 1] = v;
            ret[i] = v;
        }
        if (i === -1) {
            ret[0] = v;
        }
        return ret;
    }
    for (i = n - 1; i >= 0; i--) {
        ret[i] = rep(s, v, k + 1);
    }
    return ret;
}

function diag(d) {
    var i, i1, j, n = d.length,
        A = Array(n),
        Ai;
    for (i = n - 1; i >= 0; i--) {
        Ai = Array(n);
        i1 = i + 2;
        for (j = n - 1; j >= i1; j -= 2) {
            Ai[j] = 0;
            Ai[j - 1] = 0;
        }
        if (j > i) {
            Ai[j] = 0;
        }
        Ai[i] = d[i];
        for (j = i - 1; j >= 1; j -= 2) {
            Ai[j] = 0;
            Ai[j - 1] = 0;
        }
        if (j === 0) {
            Ai[0] = 0;
        }
        A[i] = Ai;
    }
    return A;
}

function identity(n) {
    return diag(rep([n], 1));
}

function inv(_x) {
    var s = dim(_x),
        abs = Math.abs,
        m = s[0],
        n = s[1];
    var A = clone(_x),
        Ai, Aj;
    var I = identity(m),
        Ii, Ij;
    var i, j, k, x;
    for (j = 0; j < n; ++j) {
        var i0 = -1;
        var v0 = -1;
        for (i = j; i !== m; ++i) {
            k = abs(A[i][j]);
            if (k > v0) {
                i0 = i;
                v0 = k;
            }
        }
        Aj = A[i0];
        A[i0] = A[j];
        A[j] = Aj;
        Ij = I[i0];
        I[i0] = I[j];
        I[j] = Ij;
        x = Aj[j];
        for (k = j; k !== n; ++k) Aj[k] /= x;
        for (k = n - 1; k !== -1; --k) Ij[k] /= x;
        for (i = m - 1; i !== -1; --i) {
            if (i !== j) {
                Ai = A[i];
                Ii = I[i];
                x = Ai[j];
                for (k = j + 1; k !== n; ++k) Ai[k] -= Aj[k] * x;
                for (k = n - 1; k > 0; --k) {
                    Ii[k] -= Ij[k] * x;
                    --k;
                    Ii[k] -= Ij[k] * x;
                }
                if (k === 0) Ii[0] -= Ij[0] * x;
            }
        }
    }
    return I;
}
/* eslint-enable */
module.exports = Object.freeze({
    transpose,
    dotMMsmall,
    dotMV,
    inv
});