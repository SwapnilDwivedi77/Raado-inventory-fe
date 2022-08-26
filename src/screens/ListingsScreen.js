import React, { useEffect, useState, } from 'react'
import { View, ActivityIndicator, FlatList,RefreshControl } from 'react-native'
import ListingItem from '../components/ListingItem'
import { getActivityLogsCall } from '../actions/fetchLogsAction'
import SafeAreaView from '../components/atoms/SafeAreaView'
import { useDispatch, useSelector } from 'react-redux';
import Empty from '../components/atoms/Empty'
import PullToRefresh from '../components/atoms/PullToRefresh';
import FilterComponent from '../components/FilterComponent'
import { filterConfig } from '../constants/filterConfig'
import ScreenLoader from '../components/atoms/ScreenLoader'

const ListingsScreen = (props) => {

    const activityLogs = useSelector(state => state.activityLogs);
    const selectedProcess = useSelector(state => state.selectedProcess).value;
    const userData = useSelector(state => state.user).userData;
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);

    const fetchTransactionLogs = () => {
        dispatch(getActivityLogsCall({selectedProcess}))
    }


    useEffect(() => {
        fetchTransactionLogs()
    }, [selectedProcess])

    const filterTransactionLogs = (filter) => {
        let filterParams = {}

        if(filter[filterConfig.MY_DATA]) filterParams['userId'] = userData.userId
        if(filter[filterConfig.STATUS_FILTER]?.length > 0) filterParams['status'] = filter[filterConfig.STATUS_FILTER]      
        dispatch(getActivityLogsCall({selectedProcess,filterOptions : filterParams}))
    }

    if(activityLogs.list.length === 0 ) 
    return (
        <PullToRefresh refreshing={refreshing} onRefresh={fetchTransactionLogs} style={{paddingTop : '50%'}}>
            <Empty />
        </PullToRefresh>
    )

    return (
      <>
        {(activityLogs.loading || refreshing) && <ScreenLoader />}
        <FilterComponent callOnFilter={filterTransactionLogs} />
        <SafeAreaView>
          
            <FlatList
              data={activityLogs.list}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    marginBottom: 20,
                    flexDirection: 'column',
                    margin: 1,
                    flexDirection: 'column',
                  }}
                >
                  <ListingItem listings={item} />
                </View>
              )}
              //Setting the number of column
              numColumns={1}
              keyExtractor={(item, index) => index}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={fetchTransactionLogs}
                />
              }
            />
          
        </SafeAreaView>
      </>
    );
}


export default ListingsScreen