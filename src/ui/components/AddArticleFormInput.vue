<template>
  <div>
    {{ label }}
    <input v-model="innerValue" @input="handleInput" />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

interface Input {
  value: string
  label: string
}

// This is an unnecessarily complex component, just to showcase
// some TypeScript goodies
export default Vue.extend({
  props: {
    input: {
      type: Object,
      required: true,
    } as PropOptions<Input>,
  },

  data() {
    return {
      innerValue: this.input.value,
    }
  },

  computed: {
    label(): string {
      return `Label: ${this.input.label}`
    },
  },

  methods: {
    handleInput() {
      this.$emit('input', this.innerValue)
    },
  },
})
</script>
