import React from 'react'
import {
    ToastAndroid,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { navigateToTarget } from '../navigation/callNavigate'

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,

} from '../components/style'

import LoginForm from '../components/LoginForm'
import { saveLoginDetails } from '../actions/users'
import routes from '../navigation/routes';
import { userLoginCall } from '../actions/userLoginAction';


const Login = (props) => {

    const userData = useSelector(state => state.user);
    const loginState = useSelector(state => state.userLogin);

    const dispatch = useDispatch();

    const handleSubmitLogin = (values) => {

        dispatch(userLoginCall(values))
    }
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <PageLogo source={require('../../assets/img/logo.png')} style={{ width: 360 }} />
                {/* <PageTitle>Raado Inventory</PageTitle> */}
                <SubTitle>Account Login</SubTitle>
                <LoginForm
                    handleSubmitLogin={handleSubmitLogin}
                    loading={loginState.loading}
                    loginSuccess={loginState.success}
                />
                <ExtraView>
                    <ExtraText>
                        Don't have an account already?  </ExtraText>
                    <TextLink onPress={() => navigateToTarget(routes.SIGNUP, props.navigation)}>
                        <TextLinkContent >
                            Signup
                        </TextLinkContent>
                    </TextLink>
                </ExtraView>
            </InnerContainer>
        </StyledContainer>
    );
}

export default Login