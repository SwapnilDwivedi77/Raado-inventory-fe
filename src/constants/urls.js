export const BASE_URL = 'http://ec2-44-204-192-171.compute-1.amazonaws.com:8888'
export const BASE_URL_ANALYTICS = 'http://ec2-44-204-192-171.compute-1.amazonaws.com:8080'

export const USER_SIGNUP = '/user/addUser'
export const USER_LOGIN = '/user/validateUser'
export const GET_TRANSACTIONS_LIST = '/transaction/getFilteredTransactions'
export const POST_NEW_REQUEST = '/transaction/addTransaction'
export const UPDATE_USER_PERMISSION = '/user/updatePermissions'
export const GET_USER_LIST = '/user/getUsers'
export const UPDATE_TRANSACTION_STATUS = '/transaction/updateTransaction'
export const GET_STATIC_RESOURCES = '/staticResource/getProcessWiseEntries'
export const GET_USER_PERMISSION = '/user/getUserById'
export const UPADATE_USER_RATES = '/user/{processName}/updateUserRate'

export const GET_GLOBAL_RATES = '/staticResource/getGlobalRates'
export const GET_USER_RATES = '/user/getUserRates'

export const GET_USER_ACCOUNTING = '/userAccounting'
export const GET_PROCESS_ACCOUNTING = '/processAccounting'
