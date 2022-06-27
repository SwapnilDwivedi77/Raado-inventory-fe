import React from 'react'
import {StatusBar ,SafeAreaView,StyleSheet} from 'react-native'
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
import SignupForm from '../components/SignupForm';
import {navigateToTarget} from '../navigation/callNavigate'
import { userSignUpCall } from '../actions/userSignUpAction';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../navigation/routes';

const Signup = (props) => {

    const dispatch = useDispatch();
    const signUpState = useSelector(state => state.userSignUp)
    const handleSubmitSignup = (values) => {
       let payload = {
        name: values.fullName,
        phoneNo: values.mobileNumber,
        password: values.password,
      }
        dispatch(userSignUpCall(payload) );
    }

    return (
        <SafeAreaView style={styles.container}>
        
            <StatusBar style='dark' />
            <InnerContainer>
            <PageLogo resizeMode="cover" source={require('../../assets/img/logo.png')} smallLogo={150}/>
                {/* <PageTitle>Raado Inventory</PageTitle> */}
                <SubTitle>Account Signup</SubTitle>
                <SignupForm
                handleSubmitSignup={handleSubmitSignup}
                loading = {signUpState.loading}/>
                <ExtraView>
                    <ExtraText>
                        Already have an account?  </ExtraText>
                    <TextLink onPress={()=>navigateToTarget(routes.LOGIN,props.navigation)}>
                        <TextLinkContent>
                            Login
                            </TextLinkContent>
                    </TextLink>
                </ExtraView>
            </InnerContainer>
       
        </SafeAreaView>
    );
}

export default Signup

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
  });