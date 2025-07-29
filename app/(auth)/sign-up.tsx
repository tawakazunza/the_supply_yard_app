import { View, Text } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const SignUp = () => {
  return (
    <View>
      <Button title="Sign Up" onPress{() => router.push(href:"/sign-up")} />
      <Text>Sign In</Text>
    </View>
  )
}

export default SignUp