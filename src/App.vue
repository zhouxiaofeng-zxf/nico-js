<script setup>
import {reactive, ref} from "vue";
import {entorpyFromWords, entorpyFromWordsList} from "./util/index.js";
import {message} from "ant-design-vue";
import * as bip39 from '@scure/bip39';
import {wordlist} from "@scure/bip39/wordlists/english";

const formState = reactive({mnemonic: [{value: ''}]})
const mnemonic = ref('')
const bitSize = ref(128)
const selectOptions = ref([{
  value: 128,
  label: 12
}, {
  value: 160,
  label: 15
}, {
  value: 192,
  label: 18
}, {
  value: 224,
  label: 21
}, {
  value: 256,
  label: 24
}])

const onFinish = async values => {
  let arr = [];
  values.mnemonic.map(e => arr.push(e.value))
  const entropy = entorpyFromWordsList(arr, bitSize.value);
  if (entropy === 'Invalid strength') {
    mnemonic.value = ''
    message.error('Invalid strength')
  } else {
    mnemonic.value = await bip39.entropyToMnemonic(entropy, wordlist);
  }
};

const deleteItem = (index) => {
  formState.mnemonic.splice(index, 1);
}

const createItem = () => {
  formState.mnemonic.push({value: ''});
}

const onFinishFailed = () => {
  mnemonic.value = ''
};
</script>

<template>
  <div class="container">
    <div class="readme">
      <h2>Nico</h2>
      <p>Nico is a simple and easy-to-remember personalized mnemonic generation scheme. Users can customize any sentence, map out the corresponding mnemonic, and thus replace the mnemonic's memory, support multiple languages without language restrictions.
        This is an upgraded version based on the BIP-39 proposals, making it easier and more effective for users to obtain their mnemonics, without worrying about forgetting the mnemonic, or even without having to write down the mnemonic. It only requires the user to remember the customized sentence.
        The principle of the code mainly involves processing the user-defined sentence with the sha256 algorithm to generate corresponding entropy, and then obtaining the corresponding mnemonic through entropy. This method is fully compatible with the bip39 proposals.</p>
      <h3>Motivation</h3>
      <p>Mnemonics and private keys are the keys for users to participate in blockchain and web3. As a web3 development technician, I sometimes use different wallets and manage many mnemonics and public-private key pairs. Although the BIP39 proposals has greatly improved user experience through mnemonics,
        it still cannot avoid the problem of mnemonics being difficult to remember, and users need to use other ways to backup their mnemonics. Based on this pain point, I have thought of a method to generate corresponding mnemonics based on custom sentences. Users only need to remember their custom sentences.</p>
    </div>
    <div class="form">
      <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
      >
        <div v-for="(items, index) in formState.mnemonic" :key="index">
            <a-form-item
                label="Input words"
                name="mnemonic"
                :rules="[{ required: true, message: 'Please input some words!' }]"
            >
              <a-input v-model:value="items.value" />
              <a-button danger v-if="index !== 0" @click.stop="deleteItem(index)">-</a-button>
              <a-button v-if="index === formState.mnemonic.length - 1" @click.stop="createItem">+</a-button>
            </a-form-item>
        </div>
        <a-form-item :wrapper-col="{ offset: 3, span: 16 }">
          <a-button type="primary" html-type="submit">Confirm</a-button>
          to generate
          &nbsp;
          <a-select
              v-model:value="bitSize"
              style="width: 120px"
          >
            <a-select-option v-for="(item, index) in selectOptions" :key="index" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
          &nbsp;
          mnemonic words
        </a-form-item>
        <a-form-item
            label="Mnemonic"
            name="mnemonic"
        >
          <a-textarea v-model:value="mnemonic" disabled />
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 960px;
  margin: 100px auto;
  text-align: left;
}

.readme p {
  font-size: 14px;
}
</style>

<style>
.ant-input {
  width: 80%;
  margin-right: 10px;
}

.ant-btn-dangerous {
  margin-right: 10px;
}
</style>