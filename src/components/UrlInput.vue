<template>
  <div>
    <input
      type="url"
      v-model="url"
      @enter="onInput"
      placeholder="Paste a URL"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from "vue";

const url = ref("https://www.thesun.co.uk/news/17643654/brexit-eu-student-loans-saving/");

const emits = defineEmits<{
  (e: "url-entered", url: URL): void;
}>();

function onInput() {
  console.log("onInput", url.value);
  if (isValidUrl(url.value)) {
    emits("url-entered", new URL(url.value));
  }
}

function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
