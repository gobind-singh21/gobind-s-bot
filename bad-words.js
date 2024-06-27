const BAD_WORDS = ["fuck", "bullshit", "son of a bitch", "loda", "lode", "lodu", "chod", "mc", "bc", "lund", "bhsdk", "bhosad", "bhosd", "gand"];

const checkBadWords = (message) => {
    BAD_WORDS.forEach((word) => {
        if (message.includes(word)) return true;
    });
    return false;
};

export { checkBadWords };