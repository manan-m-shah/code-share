const hashCode = document.getElementById('hash-code');
const textHolder = document.getElementById('text-holder');

//* Initializing Vars
let normalText = textHolder.value;
let hashedText = hashCode.innerText;
const myPassword = "nothingToHideHere!"
console.log('popup.js loaded');

const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, myPassword);
}

const decrypt = (hash) => {
    const decryptedText = CryptoJS.AES.decrypt(hash, myPassword);
    console.log(decryptedText)
    return decryptedText.toString(CryptoJS.enc.Utf8);
}

// const shortHash = (hash) => {
//     return hash
// }

const setText = (text) => {
    hashedText = encrypt(text);
    const shortText = hashedText.toString().substring(10, 20) + '...';
    hashCode.innerText = shortText;
}

const setHash = async () => {
    console.log('pasting');

    var temp = document.createElement("input");
    document.body.appendChild(temp);
    temp.focus();
    document.execCommand("paste");
    const text = temp.value; //this is your clipboard data
    document.body.removeChild(temp);
    
    console.log('Hash code: ' + text);
    hashedText = text;
    hashCode.innerText = text.substring(10, 20) + '...';
    normalText = decrypt(text);
    textHolder.value = normalText;

}

const readHash = async () => {
    console.log('copying');
    navigator.clipboard.writeText(hashedText);
    normalText = '';
    textHolder.value = normalText;
    hashedText = '#HashCode';
    hashCode.innerText = hashedText;
}

textHolder.addEventListener('input', (event) => {
    setText(event.target.value);
});

hashCode.addEventListener('click', async (event) => {
    if (hashedText !== '#HashCode') {
        await readHash();
    } else {
        // const str = await navigator.clipboard.readText()
        // alert("Setting str");
        await setHash();
    }
});
