
module.exports = {
    data: {
        validator: {
            valid: null
        }
    },
    methods: {
        validate() {
            this.validator.valid = true
            for (let i in this.validations) {
                this.validator[i] = {valid: true}
                for (let k in this.validations[i]) {
                     let rule = k.charAt(0).toUpperCase() + k.slice(1)
                    this.validator[i][k] = this[`validate${rule}Field`](this[i], this.validations[i][k])
                    this.validator[i]['valid'] = this.validator[i][k] ? this.validator[i]['valid'] : false
                    this.validator.valid = this.validator[i][k] ? this.validator.valid : false
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
            if (options == true) {
                   return value ? true : false
            } else return true
        },
        validateNumericField(value, options) {
            switch (options) {
                case 'all_numbers': return /^[-+]?[0-9]+$/.test(value); break;
                case 'positive_numbers': return /^[0-9]+$/.test(value); break;
            }
        },
        validateCepField(value, options) {
            return /^([0-9]){5}\-([0-9]){3}$/.test(value)
        },
        validateEmailField(value, options) {
            return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value)
        },
        getValidationErrorMessages() {
            let err = []
            for (let i in this.validator) {
                if (!this.validator[i].valid) {
                    for (let k in this.validator[i]) {
                        if (!this.validator[i][k] && k != 'valid' && this.validations[i][k].error) {
                            err.push(this.validations[i][k].error)
                        }
                    }
                }
            }
            return err;
        },
    }
}

