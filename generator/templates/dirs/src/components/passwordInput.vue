<template>
    <v-text-field
        ref="input"
        :value="compValue"
        :label="label"
        :append-icon="showPass ? 'visibility_off' : 'visibility'"
        :type="showPass ? 'text' : 'password'"
        :rules="rules"
        @input="emit"
        @click:append="showPass = !showPass"
    />
</template>

<script>
export default {
    name: 'passwordInput',
    props: {
        value: {
            type: String,
            default: '',
        },
        rules: {
            type: Array,
            default: () => [],
        },
        label: {
            type: String,
            default: 'Пароль',
        },
    },
    data() {
        return {
            showPass: false,
        };
    },
    computed: {
        compValue() {
            return this.value;
        },
    },
    methods: {
        emit(value) {
            this.$emit('input', value);
        },
        validate() {
            this.$refs.input.validate();
        },
    },
};
</script>

<style>
</style>
