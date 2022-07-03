import React, { useState } from 'react'
import * as Yup from "yup";
import { Formik, useFormikContext } from 'formik'
import { Fontisto } from '@expo/vector-icons'
import {
    StyledFormArea,
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line
} from './style'
import TextInput from './atoms/TextInput'
import { ActivityIndicator } from 'react-native'
import ErrorMessage from './atoms/ErrorMessage';


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Name cannot be empty').min(1).max(15).label("Name"),
    mobileNumber: Yup.string().required('Mobile number cannot be empty').length(10,'Enter 10 digits').matches(phoneRegExp, 'Phone number is not valid').label('Mobile Number'),
    password: Yup.string().required('Password cannot be empty'),
    confirmPassword: Yup.string().required('Passwords cannot be empty')
     .oneOf([Yup.ref('password'), null], 'Passwords must match').label('Password')
});

export default function SignupForm({handleSubmitSignup,loading}) {

    const [hidePassword, sethidePassword] = useState(true)
   
    return (
        <>
            <Formik
                initialValues={{fullName:'', mobileNumber: '', password: '',confirmPassword:'' }}
                onSubmit={(values) => {
                    handleSubmitSignup(values)
                }}
                validationSchema={validationSchema}>
                {({ handleChange, handleBlur, handleSubmit, values,errors,touched }) => {
                    return(
                    <StyledFormArea>

                        <TextInput
                            label={"Full Name"}
                            icon="person"
                            placeholder="John Doe"
                            placeholderTextColor={Colors.darkLight}
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            value={values.fullName}
                        />
                         <ErrorMessage error={errors['fullName']} visible={touched['fullName']} />
                        <TextInput
                            label={"Mobile Number"}
                            icon="phone-enabled"
                            placeholder="802XXXX101"
                            placeholderTextColor={Colors.darkLight}
                            onChangeText={handleChange('mobileNumber')}
                            onBlur={handleBlur('mobileNumber')}
                            value={values.email}
                            keyboardType="number-pad"
                        />
                             <ErrorMessage error={errors['mobileNumber']} visible={touched['mobileNumber']} />
                        <TextInput
                            label={"Password"}
                            icon="lock"
                            placeholder="********"
                            placeholderTextColor={Colors.darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            sethidePassword={sethidePassword}
                        />
                         <ErrorMessage error={errors['password']} visible={touched['password']} />
                        <TextInput
                            label={"Confirm Password"}
                            icon="lock"
                            placeholder="********"
                            placeholderTextColor={Colors.darkLight}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            sethidePassword={sethidePassword}
                        />
                         <ErrorMessage error={errors['confirmPassword']} visible={touched['confirmPassword']} />
                        <MsgBox>...</MsgBox>
                       {!loading ?  <StyledButton onPress={handleSubmit}>
                            <ButtonText>
                                Signup
                            </ButtonText>
                        </StyledButton> : <ActivityIndicator size={'large'}/>}
                        <Line />

                    </StyledFormArea>
                )}}

            </Formik>
        </>
    )
}