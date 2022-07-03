import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, FlatList, RefreshControl, ScrollView } from 'react-native'
import ListingItem from '../components/ListingItem'

import Empty from '../components/atoms/Empty'

import { useDispatch, useSelector } from 'react-redux';
import { getApprovalListCall } from '../actions/fetchApprovalListAction'
import { updateTrxnStatusCall } from '../actions/updateTrxnStatus'
import SafeAreaView from '../components/atoms/SafeAreaView'
import PullToRefresh from '../components/atoms/PullToRefresh';

const ApprovalScreen = () => {

    const dispatch = useDispatch();
    const approvalList = useSelector(state => state.approvalList);
    const selectedProcess = useSelector(state => state.selectedProcess).value;
    const [refreshing, setRefreshing] = useState(false);
    const { loading, success } = useSelector(state => state.approveTrxn);

    const userData = useSelector(state => state.user).userData;

    const fetchApprovalList = () => {
        dispatch(getApprovalListCall(userData.userId, selectedProcess, setRefreshing))
    }

    useEffect(() => {
        fetchApprovalList()
    }, [selectedProcess])


    const handleApproval = (item, status) => {
        dispatch(updateTrxnStatusCall({ trxnId: item.transactionId, status: status, selectedProcess: selectedProcess, reloadApproval: fetchApprovalList }))
    }

    if (approvalList.list.length === 0)
        return (
            <PullToRefresh refreshing={refreshing} onRefresh={fetchApprovalList} style={{paddingTop : '50%'}}>
                <Empty />
            </PullToRefresh>
        )

    return (
        <SafeAreaView>
            {
                approvalList.loading || refreshing ?
                    <ActivityIndicator size={'large'} /> :

                    <FlatList
                        data={approvalList.list}
                        renderItem={({ item }) => (
                            <View style={{ flex: 1, marginBottom: 20, flexDirection: 'column', margin: 1, flexDirection: 'column' }}>
                                <ListingItem listings={item}
                                    handleApproval={handleApproval}
                                    key={item.transactionId}
                                    isApprovalTab={true}
                                    loading={loading}
                                />
                            </View>
                        )}
                        //Setting the number of column
                        numColumns={1}
                        keyExtractor={(item, index) => index}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={fetchApprovalList} />
                          }
                    />}

        </SafeAreaView>
    )
}


export default ApprovalScreen