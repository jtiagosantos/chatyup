import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ChatRoomScreen } from '../chat-room/chat-room.screen';
import { MyRoomsScreen } from '../my-rooms/my-rooms.screen';
import { MyProfileScreen } from '../my-profile/my-profile.screen';

import ChatRoomTabIcon from '../../../common/assets/chat-room-tab.svg';
import MyRoomsTabIcon from '../../../common/assets/my-rooms-tab.svg';
import MyProfileTabIcon from '../../../common/assets/my-profile-tab.svg';

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
          tabBarIcon: ({ color }) => <ChatRoomTabIcon stroke={color} />,
        }}
      />
      <Tab.Screen
        name="myRooms"
        component={MyRoomsScreen}
        options={{
          tabBarLabel: 'Minhas salas',
          tabBarIcon: ({ color }) => <MyRoomsTabIcon stroke={color} />,
        }}
      />
      <Tab.Screen
        name="myProfile"
        component={MyProfileScreen}
        options={{
          tabBarLabel: 'Meu perfil',
          tabBarIcon: ({ color }) => <MyProfileTabIcon stroke={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
