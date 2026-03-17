import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import { useAppSelector } from 'src/redux/hooks'
import { useGetPrivacyQuery } from 'src/redux/features/profile/privacy/privacyApi'

const Privacy = () => {
    const navigation = useNavigation<any>()
    const token = useAppSelector((state) => state.auth.token)
    const { data: getPrivacy } = useGetPrivacyQuery({ token, type: "privacy_policy" })

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Privacy and Policy",
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0, // for Android
                shadowOpacity: 0, // for iOS
                borderBottomWidth: 0, // for iOS
            },
            headerTintColor: "white",
            headerTitleAlign: "start",
            headerTitleStyle: { fontFamily: "instrumentSans-Bold" },
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    const privacyContent = `Last updated: March 5, 2026

Introduction
Welcome to Arkive. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and share your information when you use our mobile application.

Information We Collect
We collect the following types of information:

Personal Information
- Name
- Email address
- Phone number
- Shipping address
- User ID

Financial Information
- Purchase history
- Payment information (processed securely by Stripe)

Photos and Media
- Photos you upload for your profile or product listings

App Activity
- App interactions
- In-app search history

How We Use Your Information
We use the information we collect to:
- Create and manage your account
- Process your orders and payments
- Send you order updates and notifications
- Improve our app and services
- Prevent fraud and ensure security
- Comply with legal obligations

Payment Processing
All payments are processed securely through Stripe. We do not store your full payment card details on our servers.

Push Notifications
We use Firebase Cloud Messaging to send you push notifications about your orders and updates. You can disable notifications at any time through your device settings.

Data Sharing
We do not sell your personal information. We may share your data with:
- Stripe for payment processing
- Firebase for push notifications
- Law enforcement if required by law

Data Security
All data transmitted between our app and servers is encrypted using HTTPS.

Account Deletion
You can request deletion of your account by submitting a request through our account deletion form. We will process your request within 30 days.

Children's Privacy
Arkive is intended for users 18 years and older. We do not knowingly collect information from minors.

Contact Us
If you have any questions about this Privacy Policy, please contact us at:
Email: support@arkive.com`

    return (
        <View className='flex-1 bg-[#121212]'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        <Text className='font-instrumentSansBold text-2xl text-white mb-4'>
          Privacy Policy
        </Text>
        <Text className='text-[#FDFDFD] font-instrumentRegular leading-6'>
          {privacyContent}
        </Text>
      </ScrollView>
    </View>
    )
}

export default Privacy