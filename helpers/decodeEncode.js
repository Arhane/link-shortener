const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const base = alphabet.length;

module.exports.decode = function decode(shortURL){
    let id = 0;

    shortURL.split('').reverse().forEach(letter => id = id * base + alphabet.split('').findIndex((item) => item === letter));

    return id;
};

module.exports.encode = function encode(id) {
    let shortUrl = '';
    while (id) {
        if (id < base) {
            shortUrl += (alphabet[id]);
            id = 0;
        } else {
            shortUrl += (alphabet[id%base]);
            id = (id - id%base) /base;
        }
    }
    return shortUrl;
};
