import * as Yup from 'yup';
import YupPassword from 'yup-password'

YupPassword(Yup);

const validators = {
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(9, 'Password must be at least 9 characters long')
                .minLowercase(1, 'Password must contain at least 1 lower case letter')
                .minUppercase(1, 'Password must contain at least 1 upper case letter')
                .minNumbers(1, 'Password must contain at least 1 number')
                .minSymbols(1, 'Password must contain at least 1 special character')
                .required('Password is required'),
};

export default validators;