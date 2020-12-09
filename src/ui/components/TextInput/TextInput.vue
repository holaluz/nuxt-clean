<template>
  <validation-provider
    v-slot="{ errors, required }"
    :ref="label"
    class="text-input"
    tag="div"
    :vid="vid"
    :rules="rules"
    :name="label"
    :bails="bails"
  >
    <label :for="label">
      <span v-text="label" />
      <span v-if="required" v-text="'*'" />
    </label>
    <input
      :id="label"
      v-model="innerValue"
      :disabled="disabled"
      :type="type"
      :placeholder="placeholder"
    />
    <ul v-if="errors.length" class="err-list">
      <li
        v-for="err in getErrorMsgs(errors)"
        :key="err"
        class="err-msg"
        v-text="err"
      />
    </ul>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

const INPUT_TYPES = [
  'url',
  'text',
  'password',
  'tel',
  'search',
  'number',
  'email',
]

export default {
  name: 'TextInput',

  components: {
    ValidationProvider,
  },

  props: {
    // Needed for cross-fields validations
    vid: {
      type: String,
      default: undefined,
    },

    bails: {
      type: Boolean,
      default: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      required: true,
    },

    rules: {
      type: [Object, String],
      default: '',
    },

    placeholder: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: 'text',
      validator: (val) => INPUT_TYPES.includes(val),
    },

    value: {
      type: null,
      default: '',
    },
  },

  data: () => ({
    innerValue: '',
    fieldErrors: [],
  }),

  watch: {
    innerValue(value) {
      this.$emit('input', value)
    },

    value(val) {
      if (val !== this.innerValue) {
        this.innerValue = val
      }
    },
  },

  created() {
    if (this.value) {
      this.innerValue = this.value
    }
  },

  methods: {
    getErrorMsgs(err) {
      return err.reduce((acc, cur) => {
        if (cur.startsWith('{')) {
          const { errors } = JSON.parse(cur)
          return [...acc, ...errors]
        }

        return [...acc, cur]
      }, [])
    },
  },
}
</script>

<style scoped>
.text-input {
  display: flex;
  flex-direction: column;
}

.err-list {
  list-style: none;
  padding-top: 4px;
  padding-left: 0;
}

.err-msg {
  color: #a71313;
}
</style>
