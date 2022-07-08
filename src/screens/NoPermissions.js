import { View } from 'react-native'
import React, { useEffect } from 'react'
import SafeAreaView from '../components/atoms/SafeAreaView'
import { useDispatch, useSelector } from 'react-redux';
import {
    ExtraText, PageLogo, StyledContainer, StyledButton,
    ButtonText,
    TextLinkContent,
    Line,
} from '../components/style'
import { logoutUser } from '../actions/users';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../Config/Colors';
import { TouchableOpacity } from 'react-native';
import { fetchUserPremissions } from '../actions/getUserPermissions';


const NoPermissions = (props) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user).userData;
    const handleLogout = () => {
        dispatch(logoutUser());
    }
    const handlePermissionRefresh = () => {
        dispatch(fetchUserPremissions(userData.userId))
    }

   
    return (
        <SafeAreaView>
            <StyledContainer>
                <PageLogo source={require('../../assets/img/logo.png')} style={{ width: 350 }} />
               

                <View style={{flex:1,alignItems:'center'}}>
                    <ExtraText>
                            Contact admin for access
                    </ExtraText>
                    <TouchableOpacity style={{marginTop:'10%'}} onPress={handlePermissionRefresh}>
                        <TextLinkContent >
                            <Ionicons name="reload-circle" size={24} color={Colors.brand} />
                            Refresh Permissions
                        </TextLinkContent>
                    </TouchableOpacity>
                </View>

                <Line/>
                   
                <StyledButton onPress={handleLogout}>
                    <ButtonText>
                        Logout
                    </ButtonText>
                </StyledButton>

            </StyledContainer>
        </SafeAreaView>
    )
}

export default NoPermissions