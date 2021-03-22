<template>
  <validation-provider
    v-slot="{ errors }"
    :rules="rules"
    :bails="bails"
    :vid="vid"
    tag="div"
  >
    <slot />
    <template v-if="errors.length">
      <ma-text
        v-for="err in errors"
        :key="err"
        size="xsmall"
        tone="red"
        v-text="err"
      />
    </template>
  </validation-provider>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationProvider } from 'vee-validate'

export default Vue.extend({
  name: 'InputValidationProvider',

  components: {
    ValidationProvider,
  },

  props: {
    bails: {
      type: Boolean,
      default: true,
    },

    vid: {
      type: String,
      default: '',
    },

    rules: {
      type: [Object, String],
      default: '',
    },
  },
})
</script>
