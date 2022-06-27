import { DefaultTheme } from '@react-navigation/native'
import {Colors} from '../components/style'


export default {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.brand,
        background: Colors.primary
    }
}