import styled from 'styled-components/native';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'
import { Dimensions } from 'react-native';
const StatusBarHeight = Constants.statusBarHeight
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// colors

export const Colors = {
    primary: '#ffffff',
    secondary: '#E5E7EB',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
    brand: '#E87060',
    green: '#00B2B9',
    textBlue: '#009FC5',
    red: '#E87060',
    light : '#edf8f5',
    dark : '#6A0D01'

}

const { primary, secondary, tertiary, darkLight, brand, green, red, textBlue,light,dark } = Colors

export const StyledContainer = styled.View`
flex:1 ;
padding: 25px ;
padding-top:${StatusBarHeight + 30}px ;
background-color: ${primary} ;
`

export const InnerContainer = styled.View`
flex:1 ;
width:100% ;
align-items: center;
`
export const PageLogo = styled.Image`


${(props) => props.smallLogo ? `
width: 360px;
height: 150px ;
` : `width: 250px;
height: 250px ;`}
`

export const PageTitle = styled.Text`
font-size: 30px ;
text-align: center ;
font-weight:bold;
color:${brand} ;
padding:10px ;
`

export const SubTitle = styled.Text`
font-size:18px ;
margin-bottom: 20px;
letter-spacing: 1px ;
font-weight: bold;
color: ${tertiary};
`

export const StyledFormArea = styled.View`
width: 90%;
`

export const StyledTextInput = styled.TextInput`

background-color: ${secondary} ;
padding: 15px ;
padding-left: 55px ;
padding-right: 55px;
border-radius: 16px ;
margin-vertical:3px;
margin-bottom: 10px;
color: ${tertiary} ;
`
export const StyledInputLabel = styled.Text`
color : ${tertiary};
font-size: 13px ;
text-align : left;
`

export const StyledNumericLabel = styled.Text`
color : ${brand};
font-size: 16px ;
text-align : left;
font-weight : 400;
`

export const LeftIcon = styled.View`
left:15px;
top: 38px;
position: absolute ;
z-index:1 ;
`

export const RightIcon = styled.TouchableOpacity`
right:15px;
top: 35px;
position: absolute ;
z-index:1 ;
`

export const StyledButton = styled.TouchableOpacity`
padding: 15px ;
background-color: ${brand} ;
justify-content: center ;
border-radius: 5px ;
margin-vertical: 5px;
height: 60px;
align-items:center;

${(props) => props.google && `
background-color: ${green} ;
flex-direction : row;
justify-content:center;
`}
`
export const ButtonText = styled.Text`
 color: ${primary};
 font-size: 16px;

 ${(props) => props.google && `
    padding-left :10px;
`}
 `

export const MsgBox = styled.Text`
 text-align: center ;
 font-size: 13px ;
`

export const Line = styled.View`
height: 1px ;
width: 100% ;
background-color: ${darkLight} ;
margin-vertical:10px;
`

export const ExtraView = styled.View`
justify-content: center ;
flex-direction:  row;
align-items:center;
padding: 10px;
`

export const ExtraText = styled.Text`
justify-content:center ;
align-content:center ;
color: ${tertiary} ;
font-size: 16px;
`

export const TextLink = styled.TouchableOpacity`
justify-content: center ;
align-items: center ;
`

export const TextLinkContent = styled.Text`
color: ${brand} ;
font-size: 15px ;
`


export const HeaderWrapper = styled.View`

background-color: ${secondary} ;
display: flex;
flex-direction: row;
align-items: center;
justify-content : center;
width : 100%;
`

export const HeaderAction = styled.View`
align-items: flex-end ;
margin: 15px 0 0 auto;
`

export const DropdownWrapper = styled.View`
    border-width: 2px;
    border-radius: 10px;
    border-color:${Colors.primary};
    color: ${Colors.primary};
    background-color:${Colors.brand};
    font-weight : 400;
    letter-spacing : 1.1px;
    height: 45px ;
    display: flex ;
    justify-content: center ;
`

export const ScreenWrapper = styled.View`
padding: 10px 10px 0 10px ;
background-color: ${light} ;
`

export const InputLabelNR = styled.Text`
align-self: center ;
color : ${dark};
font-size: 18px ;
text-align : center;
letter-spacing: 1.1px ;
font-weight : bold;
margin-right : 5px;
`

export const NumericInputWrapper = styled.View`
display : flex;
flex-direction: row ;
align-items: baseline ;
width :100%;
;
`

export const StyledNumericInput = styled.TextInput`

height: 40px ;
font-size : 28px;
font-weight  :600;
padding: 0 8px ;
color : ${textBlue};
text-align : center;


`

export const RequestFormWrapper = styled.View`
width: 100%;
display: flex;
flex-direction: row ;
flex-wrap : wrap;
justify-content: space-between;
`

export const StyledHeadingText = styled.Text`
color: ${tertiary} ;
font-size: 12px ;
letter-spacing: 1px ;
`

export const StyledText = styled.Text`
font-size: 12px ;
letter-spacing: 1px ;
flex : 1;
`