<template>
  <validation-provider
    v-slot="{ errors, required }"
    class="text-input"
    tag="div"
    :vid="id"
    :rules="rules"
    :bails="bails"
  >
    <label :for="id">
      <span v-text="label" />
      <span v-if="required" v-text="'*'" />
    </label>
    <input :id="id" v-model="innerValue" v-bind="$attrs" />
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

export default {
  name: 'TextInput',

  components: {
    ValidationProvider,
  },

  props: {
    id: {
      type: String,
      default: undefined,
    },

    bails: {
      type: Boolean,
      default: true,
    },

    label: {
      type: String,
      required: true,
    },

    rules: {
      type: [Object, String],
      default: '',
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
