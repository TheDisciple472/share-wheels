import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
        headerTitleAlign : "center"
      }}
      // initialRouteName="onBoardingTwo"
    >
      <Stack.Screen 
        name="index"
        options={{
          headerShown : false,
        }}
      />
      <Stack.Screen 
        name="onBoardingTwo"
        options={{
          headerShown : false
        }}
      />
      <Stack.Screen 
        name="signIn"
        options={{
          headerShown : false
        }}
      />
      <Stack.Screen 
        name="signUp"
        options={{
          headerShown : false
        }}
      />
      <Stack.Screen 
        name="resetPassword"
        options={{
          headerShown : false
        }}
      />
      <Stack.Screen 
        name="otpScreen"
        options={{
          headerShown : false
        }}
      />
      <Stack.Screen 
        name="(tabs)"
        options={{
          headerShown : false
        }}
      />
      <Stack.Screen 
        name="carScreen"
        options={{
          headerShown : false
        }}
      />
    </Stack>
  );
}
