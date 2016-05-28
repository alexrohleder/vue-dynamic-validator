
export default {
    data: {
        validations: {
            // define your validations
            // use a model name as key and a object with validations.
            // eg. user: { 'required': true }
        },
        validator: {
            valid: null
        }
    },

    watch: {
        validations() {
            this.validate();
        }
    }
    
    methods: {
        validate() {
            this.validator.valid = true

            for (const i in this.validations) {
                this.validator[i] = { valid: true }

                for (const j in this.validations[i]) {
                     const validation = 'validate' + j.charAt(0).toUpperCase() + j.slice(1) + 'Field'

                    this.validator[i][j] = this[validate](this[i], this.validations[i][j])
                    this.validator[i].valid = this.validator[i][j] ? this.validator[i].valid : false
                    this.validator.valid = this.validator[i][j] ? this.validator.valid : false
                }
            }

            return this.validator.valid
        },

        validateMinlengthField(value, options) {
            return value.length >= options
        },

        validateMaxlengthField(value, options) {
            return value.length <= options
        },

        validateRequiredField(value, options) {
            if (options === true) {
                   return !!value
            } else return  !value
        },

        validateNumericField(value, options) {
            switch (options) {
                case 'positives': return /^[0-9]+$/.test(value)
                case 'negatives': return /^\-[0-9]+$/.test(value)
                default: return /^[-+]?[0-9]+$/.test(value)
            }
        },

        validateCepField(value, options) {
            return /^([0-9]){5}\-([0-9]){3}$/.test(value)
        },

        validateEmailField(value, options) {
            return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value)
        },
    }
}

