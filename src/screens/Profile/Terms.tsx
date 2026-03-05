import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import { useGetTermsQuery } from 'src/redux/features/profile/terms/termsApi';
import { useAppSelector } from 'src/redux/hooks';

const Terms = () => {

    const navigation = useNavigation<any>();
    const token=useAppSelector((state)=>state.auth.token)
    const {data:getTerms}=useGetTermsQuery({token,type:"terms_and_conditions"})

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Terms And Conditions",
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0, 
                shadowOpacity: 0, 
                borderBottomWidth: 0,
            },
            headerTintColor: "white",
            headerTitleAlign: "start",
            headerTitleStyle:'instrumentSans-Bold',
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                   <Feather name="arrow-left-circle" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    const termsContent = `Last updated: March 5, 2026

Introduction
By downloading and using Arkive, you agree to be bound by these Terms and Conditions. Please read them carefully before using our app.

1. Acceptance of Terms
By accessing or using Arkive, you confirm that you are at least 18 years old and agree to these Terms and Conditions.

2. User Accounts
- You are responsible for maintaining the confidentiality of your account credentials
- You are responsible for all activities that occur under your account
- You must provide accurate and complete information when creating an account
- You must notify us immediately of any unauthorized use of your account

3. For Shoppers
- You may browse and purchase products listed by brands on Arkive
- All purchases are final unless the seller accepts returns
- Prices are set by individual brands and may change at any time
- Arkive is not responsible for the quality of products sold by brands

4. For Brands
- You may list and sell your products on Arkive
- You are responsible for the accuracy of your product listings
- You must fulfill orders in a timely manner
- Arkive takes no responsibility for disputes between brands and buyers
- Payments are processed through Stripe and transferred to your bank account

5. Payments
- All payments are processed securely through Stripe
- Arkive does not store your payment card details
- All transactions are in USD unless otherwise specified
- Refunds are subject to the individual brand's return policy

6. Prohibited Activities
You agree not to:
- Use the app for any illegal purpose
- Post false or misleading information
- Harass or harm other users
- Attempt to hack or disrupt the app
- Create fake accounts or impersonate others

7. Intellectual Property
All content on Arkive, including logos, designs, and text, is the property of Arkive and may not be used without permission.

8. Termination
We reserve the right to suspend or terminate your account at any time if you violate these Terms and Conditions.

9. Limitation of Liability
Arkive is not liable for any indirect, incidental, or consequential damages arising from your use of the app.

10. Changes to Terms
We may update these Terms and Conditions at any time. Continued use of the app after changes means you accept the new terms.

Contact Us
If you have any questions about these Terms and Conditions, please contact us at:
Email: support@arkive.com`

    return (
       <View className='flex-1 bg-[#121212]'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        <Text className='font-instrumentSansBold text-2xl text-white mb-4'>
          Terms and Conditions
        </Text>
        <Text className='text-[#FDFDFD] font-instrumentRegular leading-6'>
          {termsContent}
        </Text>
      </ScrollView>
    </View>
    )
}

export default Terms