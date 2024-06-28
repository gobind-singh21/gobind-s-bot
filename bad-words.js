const BAD_WORDS = ["fuck", "bullshit", "son of a bitch", "loda", "lode", "lodu", "chod", "mc", "bc", "lund", "bhsdk", "bhosad", "bhosd", "gand", "jhaat", "jhaant", "jhanth", "jhat", "chut"];

const checkBadWords = (message) => {

    for (const word of BAD_WORDS) {
        if (message.includes(word))
            return true;
    }
    return false;
};

export { checkBadWords };