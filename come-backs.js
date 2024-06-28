const COME_BACKS = [
    "Chup bhsdk saale gaali bakta hai hain!!!",
    "Teri amma ka gaali kaisa baka re tu!!",
    "Hold your horses brother don't actually act like the mother fucker you are.",
    "Dhat teri maa ki chut aainda se gaali bakta hua dikha gand mein chaaku maar ke hatya kar dunga!!"];

const getComeBack = () => {
    const randomNum = Math.random();
    console.log(randomNum);
    const index = Math.floor(randomNum * 12343) % COME_BACKS.length;
    console.log(index);
    return COME_BACKS[index];
}

export { getComeBack };