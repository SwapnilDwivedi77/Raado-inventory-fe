import { ScrollView,RefreshControl} from 'react-native'
import React from 'react'

const PullToRefresh = ({ refreshing, onRefresh, style, children }) => {
    return (
        <ScrollView style={{ flex: 1, flexDirection: 'column', ...style }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {children}
        </ScrollView>
    )
}

export default PullToRefresh