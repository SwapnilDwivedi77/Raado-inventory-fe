import React, { useEffect, useState, } from 'react'
import { View, ActivityIndicator, FlatList,RefreshControl } from 'react-native'
import ListingItem from '../components/ListingItem'
import { ScreenWrapper, StyledContainer } from '../components/style'


import { getActivityLogsCall } from '../actions/fetchLogsAction'
import SafeAreaView from '../components/atoms/SafeAreaView'
import { useDispatch, useSelector } from 'react-redux';
import Empty from '../components/atoms/Empty'

const ListingsScreen = (props) => {

    const activityLogs = useSelector(state => state.activityLogs);
    const selectedProcess = useSelector(state => state.selectedProcess).value;
    const userData = useSelector(state => state.user).userData;
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);

    const fetchTransactionLogs = () => {
        dispatch(getActivityLogsCall(selectedProcess,userData.userId,setRefreshing))
    }
    useEffect(() => {
        fetchTransactionLogs()
       

    }, [selectedProcess])

    if(activityLogs.list.length === 0 ) 
    return <Empty/>


    return (
    
        <SafeAreaView>
            {activityLogs.loading || refreshing ?
              <ActivityIndicator size={'large'}/> :

                <FlatList
                    data={activityLogs.list}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, marginBottom: 20, flexDirection: 'column', margin: 1, flexDirection: 'column' }}>
                            <ListingItem listings={item}
                            />
                        </View>
                    )}
                    //Setting the number of column
                    numColumns={1}
                    keyExtractor={(item, index) => index}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={fetchTransactionLogs} />
                      }
                />}
        </SafeAreaView>
    )
}


export default ListingsScreen