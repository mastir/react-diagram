export function _map(object, mapper){
    return Object.keys(object).map(k => mapper(object[k], k));
}