import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
        headerTitleAlign : "center"
      }}
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
    </Stack>
  );
}
