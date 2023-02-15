import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ChatRoomScreen } from '../chat-room/chat-room.screen';

import ChatRoomIcon from '../../../common/assets/chat-room.svg';

import type { RoutesList } from '../../../common/types/routes-list.type';

const Tab = createBottomTabNavigator<RoutesList>();

export const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="chatRoom"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          height: 54,
          paddingBottom: 5,
          borderTopWidth: 0,
          backgroundColor: '#27272a',
        },
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 11,
        },
        tabBarActiveTintColor: '#5b21b6',
        tabBarInactiveTintColor: '#52525b',
      }}>
      <Tab.Screen
        name="chatRoom"
        component={ChatRoomScreen}
        options={{
          tabBarLabel: 'Sala de conversa',
          tabBarIcon: ({ color }) => <ChatRoomIcon stroke={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
