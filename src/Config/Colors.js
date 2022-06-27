import {processList} from '../constants/ProcessList'

export const Colors = {
    primary : '#ffffff',
    secondary:'#E5E7EB',
    tertiary: '#1F2937',
    darkLight : '#9CA3AF',
    brand : '#E87060',
    green : '#10B981',
    red : '#EF4444',   
    textBlue: '#009FC5',
    textDark : '#6A0D01'
}


export const processColor = {
    [processList.UNLOAD_BAMBOO] : {backgroundColor : '#C9EF91',textColor:'#86B83D'},
    [processList.CROSS_CUTTING] : {backgroundColor : '#FFA384',textColor:'#BB512D'},
    [processList.SLIVER_MAKING] : {backgroundColor : '#f1f751',textColor:'#B0B611'},
    [processList.ROUND_STICK_MAKING] : {backgroundColor : '#C4A6E3',textColor:'#7D51A9'},
    [processList.SIZING_AND_POLISHING] : {backgroundColor : '#EFE7BC',textColor:'#AB9E58'},
    [processList.PRODUCT] : {backgroundColor :  '#7FB6F1',textColor:'#3883D1'},
    [processList.SORTING] : {backgroundColor : '#D6EADD',textColor:'#7BB78F'}
    }

export const statusColor= {
 'CREATED' : '#FFFF00',
 'APPROVED' : '#C9EF91',
 'REJECTED' : '#EF4444'
}

export const cardColor = {
    'SENDER' :  {backgroundColor : '#fff',textColor:'#239279'},
    'RECEIVER' :  {backgroundColor : '#fff',textColor:'#488843'}
}
