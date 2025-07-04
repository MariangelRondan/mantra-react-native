import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,

        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,

        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="meditation/meditationHome"
        options={{
          href: null,
          // headerShown: false, // opcional
        }}
      />
      <Tabs.Screen
        name="period/periodHome"
        options={{
          href: null,
          // headerShown: false, // opcional
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="show.chart.fill" color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
