# 中文
## Nico
Nico是一种最简单易于记忆的个性化助记词生成方案.用户可以自定义任何语句,支持多语言没有语言限制,映射出对应的助记词,从而代替助记词的记忆,支持多语言,没有语言限制.
这是基于BIP-39提案的升级,使用户更加方便有效的获得自己的助记词,不在当心助记词的忘记,甚至不用记下助记词,仅靠脑部记忆自定义的语句就行.
代码原理主要是将自定义语句进行sha256算法处理生成对应的熵,在通过熵获得对应的助记词,并且此方法完全兼容bip39提案.

### 动机
助记词,私钥是用户参与区块链和web3的钥匙.本人是web3的开发技术人员,有时候会经常用到不同的钱包,管理很多的助记词和公私钥.虽然bip39提案通过助记词方式已经大大提高了用户的体验,
让用户越来越方便的管理自己的钱包和私钥地址.但是还是免不了助记词的难以记忆,需要用其他途径把助记词给备份.基于该痛点,我思考了以自定义语句方式生产对应的助记词,只需记住自定义语句即可


## 举例(每组字符之间以空格分开 UTF-8)

### 案例1 诗 将进酒 李白 : 
自定义语句: 君 不 见 ， 黄 河 之 水 天 上 来 ， 奔 流 到 海 不 复 回

对应的熵: 3415721a86f546d7fdc95b765656b504

对应的助记词: cross process mammal assume federal hip warm clock iron razor pull announce

### 案例2 诗 将进酒 李白(进行不同的组合排列,把不见和天上来合为一组数据):  
自定义语句: 君不见 ， 黄 河 之 水 天上来 ， 奔 流 到 海 不 复 回

对应的熵: 87d57173407087b56ebd419da6e8ddac

对应的助记词: march process fresh liberty anchor survey road popular oval dance danger floor

### 案例3 歌曲 my love westlife (支持多语言,不受语言限制):
自定义语句: an empty street an empty house a hole inside my heart 西域男孩 my love

对应的熵: 3b4944936a2fcc8dab75e1e0fb914ba4

对应的助记词: deputy enforce cave stairs wolf egg punch rotate thought symptom fancy embody

#### 说明:用户可以根据自己的喜好,方便记忆的自定义语句来获取到对应的助记词和熵,当然为了保证语句不易被恶意获取,可以对自定义语句进行简单的加工增加一定的复杂度.用户可自由发挥,改变组合,增加一些随机密码等.
例如

原句:  君 不 见 ， 黄 河 之 水 天 上 来 ， 奔 流 到 海 不 复 回             ->对应助记词: cross process mammal assume federal hip warm clock iron razor pull announce

修饰后: 君 不 见 ， 黄 河 之 水 天 上 来 ， 奔 流 到 海 不 复 回 1qaz@wsx   ->对应助记词: exhaust icon flash wild toilet stone bracket dune artwork harvest inform write






# English
## Nico
Nico is a simple and easy-to-remember personalized mnemonic generation scheme. Users can customize any sentence, map out the corresponding mnemonic, and thus replace the mnemonic's memory, support multiple languages without language restrictions.
This is an upgraded version based on the BIP-39 proposals, making it easier and more effective for users to obtain their mnemonics, without worrying about forgetting the mnemonic, or even without having to write down the mnemonic. It only requires the user to remember the customized sentence.
The principle of the code mainly involves processing the user-defined sentence with the sha256 algorithm to generate corresponding entropy, and then obtaining the corresponding mnemonic through entropy. This method is fully compatible with the bip39 proposals.
### Motivation
Mnemonics and private keys are the keys for users to participate in blockchain and web3. As a web3 development technician, I sometimes use different wallets and manage many mnemonics and public-private key pairs. Although the BIP39 proposals has greatly improved user experience through mnemonics, 
it still cannot avoid the problem of mnemonics being difficult to remember, and users need to use other ways to backup their mnemonics. Based on this pain point, I have thought of a method to generate corresponding mnemonics based on custom sentences. Users only need to remember their custom sentences.

## Example (spaces are used to separate each group of characters in UTF-8).

### Case 1 poem 将进酒 李白 :
customize sentence: 君 不 见 ， 黄 河 之 水 天 上 来 ， 奔 流 到 海 不 复 回

entropy: 3415721a86f546d7fdc95b765656b504

mnemonic: cross process mammal assume federal hip warm clock iron razor pull announce

### Case 2 poem 将进酒 李白(Make different combinations and arrangements to combine the '君不见' and '天上来'  into one set):
customize sentence: 君不见 ， 黄 河 之 水 天上来 ， 奔 流 到 海 不 复 回

entropy: 87d57173407087b56ebd419da6e8ddac

mnemonic: march process fresh liberty anchor survey road popular oval dance danger floor

### Case 3 song my love westlife (Supports multiple languages without language restrictions):
customize sentence: an empty street an empty house a hole inside my heart 西域男孩 my love

entropy: 3b4944936a2fcc8dab75e1e0fb914ba4

mnemonic: deputy enforce cave stairs wolf egg punch rotate thought symptom fancy embody

#### Note: Users can obtain the corresponding mnemonic and entropy according to their preferences and customizable sentences that are easy to remember. Of course, in order to ensure that the sentences are not easily obtained by malicious means, simple processing can be performed on the customizable sentences to add some complexity. Users can freely play with combinations, add random passwords, and so on.
Example

original sentence:  君 不 见 ， 黄 河 之 水 天 上 来 ， 奔 流 到 海 不 复 回             
mnemonic: cross process mammal assume federal hip warm clock iron razor pull announce

revised sentence: 君 不 见 ， 黄 河 之 水 天 上 来 ， 奔 流 到 海 不 复 回 1qaz@wsx   
mnemonic: exhaust icon flash wild toilet stone bracket dune artwork harvest inform write






## installation：

```console
git get https://github.com/zhouxiaofeng-zxf/nico.git
```

### You can refer to the main.go and _pro_test.go files in the code.

```go
package main

import (
  "fmt"
  "github.com/tyler-smith/go-bip39"
  "github.com/tyler-smith/go-bip32"
  "github.com/zhouxiaofeng-zxf/nico/util"
)

func main(){
	// Generate a mnemonic for memorization or user-friendly seeds
	entropy, _ := util.NewEntropyFromWords("nico 床 前 明 月 光 , 疑 是 地 上 霜 .", 128)
	mnemonic, _ := bip39.NewMnemonic(entropy)

	// Generate a Bip32 HD wallet for the mnemonic and a user supplied password
	seed := bip39.NewSeed(mnemonic, "Secret Passphrase")

	masterKey, _ := bip32.NewMasterKey(seed)
	publicKey := masterKey.PublicKey()

	// Display mnemonic and keys
	fmt.Println("Mnemonic: ", mnemonic)
	fmt.Println("Master private key: ", masterKey)
	fmt.Println("Master public key: ", publicKey)
}
```


