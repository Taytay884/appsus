function getRandomItemFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function genLorem(wordCount = getRandomIntInclusive(1, 3)) {
    var lorem = '';

    for (let i = 0; i < wordCount; i++) {
        lorem += genRandomStr(getRandomIntInclusive(3, 5));
        if (i !== wordCount-1) lorem += ' ';
    }

    return lorem;
}

function genRandomStr(length) {
    var str = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return str;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
    getRandomItemFromArray,
    genLorem,
    genRandomStr,
    getRandomIntInclusive
}