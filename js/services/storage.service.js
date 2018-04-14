const STORAGE_KEYS = {
    MAILS: 'maills'
}
Object.freeze(STORAGE_KEYS);
export { STORAGE_KEYS };

function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return Promise.resolve();
}

function load(key) {
    var value = JSON.parse(localStorage.getItem(key));
    return Promise.resolve(value);
}

export default {
    save,
    load
}