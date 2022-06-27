import React, { useState } from 'react'
import * as Yup from "yup";
import { Formik } from 'formik'
import {
    StyledFormArea,
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line
} from './style'
import TextInput from './atoms/TextInput'

import Toast from 'react-native-toast-message';
import { ActivityIndicator } from 'react-native'
import ErrorMessage from './atoms/ErrorMessage';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const validationSchema = Yup.object().shape({
    mobileNumber: Yup.string().required('Mobile number cannot be empty').length(10,'Enter 10 digits').matches(phoneRegExp, 'Phone number is not valid'),
    password: Yup.string().required('Password cannot be empty'),
   });


export default function LoginForm({handleSubmitLogin,loading,loginSuccess}) {

    const [hidePassword, sethidePassword] = useState(true)

    
    if(!loginSuccess) {
        Toast.show({
            type: 'success',
            text1: 'Login Failed',          
          });
    }

    return (
        <>
            <Formik
                initialValues={{ mobileNumber: '', password: '' }}
                onSubmit={(values) => {
                    handleSubmitLogin(values)
                }}
                validationSchema={validationSchema}>
                {({ handleChange, handleBlur, handleSubmit, values,touched,errors }) => (
                    <StyledFormArea>

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
                        <MsgBox>...</MsgBox>
                        {loading ?
                        
                        <ActivityIndicator size={'large'}/>
                        :
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>
                                Login
                            </ButtonText>
                        </StyledButton>}
                       
                        <Line />

                    </StyledFormArea>
                )}

            </Formik>
        </>
    )
}