import React, { useEffect, useRef } from "react"
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import { setGuestMode } from "src/redux/features/auth/authSlice"
import { useAppDispatch } from "src/redux/hooks"

const { width } = Dimensions.get("window")

const ShimmerBox = ({ width: w, height: h, style }: any) => {
  const anim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start()
  }, [])

  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] })

  return (
    <Animated.View style={[{ width: w, height: h, backgroundColor: '#3a3a3a', borderRadius: 8, opacity }, style]} />
  )
}

export default function GuestProfileShimmer({ navigation }: any) {
  const dispatch = useAppDispatch()
  return (
    <View style={{ flex: 1, backgroundColor: '#121212', padding: 16 }}>
      {/* Cover */}
      <ShimmerBox width="100%" height={verticalScale(180)} style={{ borderRadius: 16 }} />

      {/* Avatar */}
      <View style={{ alignItems: 'center', marginTop: -scale(40) }}>
        <ShimmerBox width={scale(80)} height={scale(80)} style={{ borderRadius: scale(40), borderWidth: 3, borderColor: '#121212' }} />
      </View>

      {/* Name & theme */}
      <View style={{ alignItems: 'center', gap: 6, marginTop: 10 }}>
        <ShimmerBox width={120} height={14} />
        <ShimmerBox width={80} height={10} />
      </View>

      {/* Stats */}
      <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', marginTop: 16 }}>
        {['Posts', 'Likes', 'Following', 'Followers'].map((label) => (
          <View key={label} style={{ backgroundColor: '#252525', padding: 10, borderRadius: 12, alignItems: 'center', minWidth: 60 }}>
            <ShimmerBox width={24} height={12} style={{ marginBottom: 4 }} />
            <Text style={{ color: '#9CA3AF', fontSize: 11 }}>{label}</Text>
          </View>
        ))}
      </View>

      {/* Tabs */}
      <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'center', marginTop: 16, marginBottom: 12 }}>
        <Text style={{ color: '#fff', fontWeight: '600', borderBottomWidth: 1, borderColor: '#fff', paddingBottom: 4 }}>Posts</Text>
        <Text style={{ color: '#9CA3AF' }}>My Lookbook</Text>
      </View>

      {/* Blurred post grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {[1, 2, 3, 4].map((i) => (
          <ShimmerBox key={i} width={(width - 48) / 2} height={verticalScale(100)} style={{ borderRadius: 12 }} />
        ))}
      </View>

      {/* Lock overlay */}
      <View style={StyleSheet.absoluteFillObject}>
        <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 40, alignItems: 'center', gap: 10, backgroundColor: 'transparent' }}>
          <Text style={{ fontSize: 28 }}>🔒</Text>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Sign in to view profiles</Text>
          <Text style={{ color: '#9CA3AF', fontSize: 13, textAlign: 'center' }}>Create an account to explore ARKIVE</Text>
          <TouchableOpacity
            style={{ backgroundColor: '#fff', paddingHorizontal: 40, paddingVertical: 12, borderRadius: 12, marginTop: 8 }}
            onPress={() => dispatch(setGuestMode(false))}
          >
            <Text style={{ color: '#000', fontWeight: '700', fontSize: 15 }}>Login / Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#9CA3AF', fontSize: 13 }}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}