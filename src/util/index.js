import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import sha256 from 'crypto-js/sha256.js';
import CryptoJS from 'crypto-js'

//进行异或运算处理
function xor(hex1, hex2) {
    const buf1 = hexUint8Array(hex1);
    const buf2 = hexUint8Array(hex2);
    var bufResult = [];
    for (let i = 0; i < buf1.length; i++) {
        const b = buf1[i] ^ buf2[i]
        bufResult[i] = b
    }
    return bufResult;
}
function hexUint8Array(hexString){
    return Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
}

export function entorpyFromWords(words, strength) {
    console.log(words)
    if (strength === void 0) { strength = 128; }
    //判断是不是128,256等数字
    if (Number.isSafeInteger(strength) &&
        strength > 0 &&
        strength <= 256 &&
        strength % 32 === 0) {
        console.log('符合128,256条件')
    } else {
        console.log(1)
        return 'Invalid strength'
    }

    let byteLength = strength / 8; // 16
    let sentenceLength = byteLength / 2; // 8
    //对字符分割成字符串数组
    let wordList = words.split(" ");

    let wordsLength = wordList.length;
    //校验传入字符长度
    if (!(wordsLength < sentenceLength ||
        wordsLength > 3 * sentenceLength ||
        words.length > 3 * strength)) {
        console.log('符合字符长度条件')
    } else {
        console.log(2)
        return 'Invalid strength'
    }

    //对字符进行hash
    let wordsHash = sha256(words).toString(CryptoJS.enc.Hex);

    var arr = new Uint8Array(byteLength);
    for (let i = byteLength - 1; i >= 0; i--) {
        //
        let word = wordList[i % wordsLength];
        //进行hash
        let hash = sha256(i + word).toString(CryptoJS.enc.Hex);
        //对两个hash值进行异或运算
        let xorResult = xor(hash, wordsHash);
        // console.log("xorResult:"+i+"==="+xorResult.toString('hex'))
        let result = padByteSliceSuper(xorResult, 1);
        // console.log("result:"+i+"==="+result)
        // arr.push(result);
        arr[byteLength-i-1] = result
    }
    // return new Uint8Array(arr);
    return arr;

}

export function entorpyFromWordsList(words, strength) {
    if (strength === void 0) { strength = 128; }
    //判断是不是128,256等数字
    if (Number.isSafeInteger(strength) &&
        strength > 0 &&
        strength <= 256 &&
        strength % 32 === 0) {
        console.log('符合128,256条件')
    } else {
        return 'Invalid strength'
    }

    let byteLength = strength / 8; // 16
    let sentenceLength = byteLength / 2; // 8

    if (words.length<0){
        return 'Invalid strength'
    }
    var holeWord=""

    for (let i = 0; i < words.length; i++) {
        let w= words[i]
        let wordList = w.split(" ");
        let wordsLength = wordList.length;
        //校验传入字符长度
        if (!(wordsLength < sentenceLength ||
            wordsLength > 3 * sentenceLength ||
            words.length > 3 * strength)) {
            console.log('符合字符长度条件')
        } else {
            return 'Invalid strength'
        }
        holeWord=holeWord+w;
    }

    //对字符分割成字符串数组
    let wordList = words[0].split(" ");

    let wordsLength = wordList.length;

    //对字符进行hash
    let wordsHash = sha256(holeWord).toString(CryptoJS.enc.Hex);
    console.log("wordsHash:" + wordsHash)

    var arr = new Uint8Array(byteLength);
    for (let i = byteLength - 1; i >= 0; i--) {
        //
        let word = wordList[i % wordsLength];
        //进行hash
        let hash = sha256(i + word).toString(CryptoJS.enc.Hex);
        // console.log("hash:" + i + "===" + hash)
        //对两个hash值进行异或运算
        let xorResult = xor(hash, wordsHash);
        // console.log("xorResult:" + i + "===" + xorResult)
        let result = padByteSliceSuper(xorResult, 1);
        // console.log("result:" + i + "===" + result)
        arr[byteLength - i - 1] = result
    }
    // return new Uint8Array(arr);
    return arr;

}

//截取对应长度的字节数组
function padByteSliceSuper(xorResult, length) {
    let offset = xorResult.length - length;
    if (offset <= 0) {
        return slice;
    }
    return xorResult[offset];
}
// var list =["君 不 见 ， 黄 河 之 水 天 上 来 ， 奔 流 到 海 不 复 回","君 不 见 ， 黄 河 之 水 天 上 来 ， 奔 流 到 海 不 复 回"]
// const entropyList = entorpyFromWordsList(list, 256)
// console.log(entropyList)
//
// // Converts entropy to mnemonic
// const mnemonicList = await bip39.entropyToMnemonic(entropyList, wordlist);
//
// console.log(mnemonicList)
// const entropy = entorpyFromWords("君 不 见 ， 黄 河 之 水 天 上 来 ， 奔 流 到 海 不 复 回", 128)
// console.log(entropy)
//
// // Converts entropy to mnemonic
// const mnemonic = await bip39.entropyToMnemonic(entropy, wordlist);
// // => 预期值 'cross process mammal assume federal hip warm clock iron razor pull announce'
// console.log(mnemonic)
//
// // Validates mnemonic
// const valid = await bip39.validateMnemonic(mnemonic, wordlist);
// // => true
// console.log(valid)
