export default class DrawAttack{
  fineArrowDefualParam() {
    return {
        headHeightFactor: .18,
        headWidthFactor: .3,
        neckHeightFactor: .85,
        neckWidthFactor: .15,
        tailWidthFactor: .1,
        headTailFactor: .8,
        swallowTailFactor: 1
    }
}

fineArrow(inputPoint) {
    var $this = this;
    inputPoint = $this.dereplication(inputPoint);
    let tailWidthFactor = $this.fineArrowDefualParam().tailWidthFactor;
    let swallowTailFactor = $this.fineArrowDefualParam().swallowTailFactor;
    let swallowTailPnt = $this.fineArrowDefualParam().swallowTailPnt;
    //控制点
    var result = {
        controlPoint: null,
        polygonalPoint: null
    };
    result.controlPoint = inputPoint;
    var t = inputPoint.length;
    if (!(2 > t)) {
        if (2 == inputPoint.length) {
            result.polygonalPoint = inputPoint;
            return result;
        }
        var o = inputPoint,
            e = o[0],
            r = o[1];
        $this.isClockWise(o[0], o[1], o[2]) && (e = o[1], r = o[0]);
        var n = $this.mid(e, r),
            g = [n].concat(o.slice(2)),
            i = $this.getAttackArrowHeadPoints(g, e, r, $this.fineArrowDefualParam()),
            s = i[0],
            a = i[4],
            l = $this.distance(e, r),
            u = $this.getBaseLength(g),
            c = u * tailWidthFactor * swallowTailFactor;
        swallowTailPnt = $this.getThirdPoint(g[1], g[0], 0, c, !0);
        var p = l / u,
            h = $this.getAttackArrowBodyPoints(g, s, a, p),
            t = h.length,
            d = [e].concat(h.slice(0, t / 2));
        d.push(s);
        var f = [r].concat(h.slice(t / 2, t));
        var newArray = [];
        f.push(a),
            d = $this.getQBSplinePoints(d),
            f = $this.getQBSplinePoints(f),
            newArray = $this.array2Dto1D(d.concat(i, f.reverse(), [swallowTailPnt, d[0]]));
        result.polygonalPoint = Cesium.Cartesian3.fromDegreesArray(newArray);
    }
    return result;
}

getArrowBodyPoints(t, o, e, r) {
    var $this = this;
    for (var n = $this.wholeDistance(t), g = $this.getBaseLength(t), i = g * r, s = $this.distance(o, e), a = (i - s) / 2, l = 0, u = [], c = [], p = 1; p < t.length - 1; p++) {
        var h = $this.getAngleOfThreePoints(t[p - 1], t[p], t[p + 1]) / 2;
        l += $this.distance(t[p - 1], t[p]);
        var d = (i / 2 - l / n * a) / Math.sin(h),
            f = $this.getThirdPoint(t[p - 1], t[p], Math.PI - h, d, !0),
            E = $this.getThirdPoint(t[p - 1], t[p], h, d, !1);
        u.push(f),
            c.push(E)
    }
    return u.concat(c)
}

getAttackArrowHeadPoints(t, o, e, defaultParam) {
    var $this = this;
    let headHeightFactor = defaultParam.headHeightFactor;
    let headTailFactor = defaultParam.headTailFactor;
    let headWidthFactor = defaultParam.headWidthFactor;
    let neckWidthFactor = defaultParam.neckWidthFactor;
    let neckHeightFactor = defaultParam.neckHeightFactor;
    var r = $this.getBaseLength(t),
        n = r * headHeightFactor,
        g = t[t.length - 1];
    r = $this.distance(g, t[t.length - 2]);
    var i = $this.distance(o, e);
    n > i * headTailFactor && (n = i * headTailFactor);
    var s = n * headWidthFactor,
        a = n * neckWidthFactor;
    n = n > r ? r : n;
    var l = n * neckHeightFactor,
        u = $this.getThirdPoint(t[t.length - 2], g, 0, n, !0),
        c = $this.getThirdPoint(t[t.length - 2], g, 0, l, !0),
        p = $this.getThirdPoint(g, u, Math.PI / 2, s, !1),
        h = $this.getThirdPoint(g, u, Math.PI / 2, s, !0),
        d = $this.getThirdPoint(g, c, Math.PI / 2, a, !1),
        f = $this.getThirdPoint(g, c, Math.PI / 2, a, !0);
    return [d, p, g, h, f]
}

getAttackArrowBodyPoints = function (t, o, e, r) {
    var $this = this;
    for (var n = $this.wholeDistance(t), g = $this.getBaseLength(t), i = g * r, s = $this.distance(o, e), a = (i - s) / 2, l = 0, u = [], c = [], p = 1; p < t.length - 1; p++) {
        var h = $this.getAngleOfThreePoints(t[p - 1], t[p], t[p + 1]) / 2;
        l += $this.distance(t[p - 1], t[p]);
        var d = (i / 2 - l / n * a) / Math.sin(h),
            f = $this.getThirdPoint(t[p - 1], t[p], Math.PI - h, d, !0),
            E = $this.getThirdPoint(t[p - 1], t[p], h, d, !1);
        u.push(f),
            c.push(E)
    }
    return u.concat(c)
}

getAngleOfThreePoints(t, o, e) {
    var r = this.getAzimuth(o, t) - this.getAzimuth(o, e);
    return 0 > r ? r + Math.PI * 2 : r
}

dereplication(array) {
    var last = array[array.length - 1];
    var change = false;
    var newArray = [];
    newArray = array.filter(function (i) {
        if (i[0] != last[0] && i[1] != last[1]) {
            return i;
        }
        change = true;
    });
    if (change) newArray.push(last);
    return newArray;
}

getBaseLength(t) {
    return Math.pow(this.wholeDistance(t), .99)
}

wholeDistance(t) {
    for (var o = 0, e = 0; e < t.length - 1; e++) o += this.distance(t[e], t[e + 1]);
    return o
}

distance(t, o) {
    return Math.sqrt(Math.pow(t[0] - o[0], 2) + Math.pow(t[1] - o[1], 2))
}

getThirdPoint(t, o, e, r, n) {
    var g = this.getAzimuth(t, o),
        i = n ? g + e : g - e,
        s = r * Math.cos(i),
        a = r * Math.sin(i);
    return [o[0] + s, o[1] + a]
}

getAzimuth(t, o) {
    var e, r = Math.asin(Math.abs(o[1] - t[1]) / this.distance(t, o));
    return o[1] >= t[1] && o[0] >= t[0] ? e = r + Math.PI : o[1] >= t[1] && o[0] < t[0] ? e = 2 * Math.PI - r : o[1] < t[1] && o[0] < t[0] ? e = r : o[1] < t[1] && o[0] >= t[0] && (e = Math.PI - r), e
}

isClockWise(t, o, e) {
    return (e[1] - t[1]) * (o[0] - t[0]) > (o[1] - t[1]) * (e[0] - t[0])
}

mid(t, o) {
    return [(t[0] + o[0]) / 2, (t[1] + o[1]) / 2]
}

getQBSplinePoints = function (t) {
    if (t.length <= 2) return t;
    var o = 2,
        e = [],
        r = t.length - o - 1, y = 0;
    e.push(t[0]);
    for (var n = 0; r >= n; n++)
        for (var g = 0; 1 >= g; g += .05) {
            for (var i = y = 0, s = 0; o >= s; s++) {
                var a = this.getQuadricBSplineFactor(s, g);
                i += a * t[n + s][0], y += a * t[n + s][1]
            }
            e.push([i, y])
        }
    return e.push(t[t.length - 1]), e
}
getQuadricBSplineFactor = function (t, o) {
    return 0 == t ? Math.pow(o - 1, 2) / 2 : 1 == t ? (-2 * Math.pow(o, 2) + 2 * o + 1) / 2 : 2 == t ? Math.pow(o, 2) / 2 : 0
}
array2Dto1D = function (array) {
    var newArray = [];
    array.forEach(function (elt) {
        newArray.push(elt[0]);
        newArray.push(elt[1]);
    });
    return newArray;
}
}
