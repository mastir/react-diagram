export function _map(object, mapper){
    return Object.keys(object).map(k => mapper(object[k], k));
}
export function point_sum(...points){
    let r = [0,0];
    points.forEach(p => {
        r[0] = r[0] + p[0];
        r[1] = r[1] + p[1];
    });
    return r;
}