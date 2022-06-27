import React from 'react'
import { HeaderWrapper, StyledContainer } from '../components/style'
import HomeNavigator from '../navigation/HomeNavigator'

import ScreenHeader from '../components/ScreenHeader'

const HomeScreen = () => {

  return (
    <StyledContainer>
     <HomeNavigator/>    
   </StyledContainer>
  )
}

export default HomeScreen