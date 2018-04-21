import validator from 'email-validator';

export const isRequired = (value) => {
    return value && value.length;
};

export const isEmail = (value) => {
    return validator.validate(value);
};