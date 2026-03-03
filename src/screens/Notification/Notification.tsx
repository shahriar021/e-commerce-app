import { View, Text, TouchableOpacity, StatusBar, FlatList } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useGetNotificationQuery } from 'src/redux/features/notification/notificationApi';
import { useAppSelector } from 'src/redux/hooks';

const Notification = () => {

    const navigaiton = useNavigation<any>()
    const token = useAppSelector((state) => state.auth.token)
    const { data: notiData } = useGetNotificationQuery(token)

    useLayoutEffect(() => {
        navigaiton.setOptions({
            title: "Notification",
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTintColor: "white",
            headerTitleAlign: "start",
            headerTitleStyle: 'instrumentSans-Bold',
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigaiton.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigaiton])
    const notifications = notiData?.data?.notifications || [];
    const unreadCount = notiData?.data?.unreadCount || 0;

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    };

    const getIconForAction = (action: string) => {
        switch (action) {
            case 'login': return { name: 'log-in-outline', color: '#6C63FF' };
            case 'logout': return { name: 'log-out-outline', color: '#FF6584' };
            default: return { name: 'notifications-outline', color: '#6C63FF' };
        }
    };

    const renderItem = ({ item, index }: { item: any; index: number }) => {
        const icon = getIconForAction(item?.data?.action);
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    backgroundColor: item.isRead ? '#1E1E1E' : '#1A1A2E',
                    marginHorizontal: 16,
                    marginVertical: 5,
                    borderRadius: 16,
                    padding: 14,
                    borderLeftWidth: item.isRead ? 0 : 3,
                    borderLeftColor: '#6C63FF',
                }}
            >
                {/* Icon Circle */}
                <View
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        backgroundColor: icon.color + '20',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                    }}
                >
                    <Ionicons name={icon.name as any} size={22} color={icon.color} />
                </View>

                {/* Content */}
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 14, flex: 1 }}>
                            {item.title}
                        </Text>
                        {!item.isRead && (
                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#6C63FF', marginLeft: 8 }} />
                        )}
                    </View>

                    <Text style={{ color: '#A0A0A0', fontSize: 13, marginTop: 3, lineHeight: 18 }}>
                        {item.body}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 }}>
                        <View style={{ backgroundColor: '#2A2A3E', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 }}>
                            <Text style={{ color: '#6C63FF', fontSize: 11, fontWeight: '600', textTransform: 'capitalize' }}>
                                {item?.data?.action}
                            </Text>
                        </View>
                        <Text style={{ color: '#555', fontSize: 11 }}>
                            {formatTime(item.sentAt)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#121212' }}>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />

            {/* Header */}
            <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '800' }}>Notifications</Text>
                    {unreadCount > 0 && (
                        <View style={{ backgroundColor: '#6C63FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }}>
                            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>{unreadCount} unread</Text>
                        </View>
                    )}
                </View>
                <Text style={{ color: '#555', fontSize: 13, marginTop: 4 }}>
                    {notiData?.data?.pagination?.total} total notifications
                </Text>
            </View>

            {/* Divider */}
            <View style={{ height: 1, backgroundColor: '#2A2A2A', marginBottom: 8 }} />

            {/* List */}
            <FlatList
                data={notifications}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30, paddingTop: 4 }}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 80 }}>
                        <Ionicons name="notifications-off-outline" size={60} color="#333" />
                        <Text style={{ color: '#555', marginTop: 12, fontSize: 16 }}>No notifications yet</Text>
                    </View>
                }
            />
        </View>
    );
    
}

export default Notification