/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MapScreen from "./src/tabs/map-screen";
import SearchScreen from "./src/tabs/search-screen";

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the reccomendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#097969',
            height: 70,
            position: 'absolute',
            bottom: 30,
            marginHorizontal: 20,
            borderRadius: 10,
            borderTopColor: 'transparent',
          },
          headerShown: false,
          tabBarActiveTintColor: '#FFF',
          tabBarInactiveTintColor: '#40B5ADBF',
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', marginTop: -7 }, 
        }}
      >
        <Tab.Screen 
          name='Map'
          component={MapScreen}
          options={{
            tabBarIcon: () => (null)
          }}
        />
        <Tab.Screen 
          name='Search'
          component={SearchScreen}
          options={{
            tabBarIcon: () => (null)
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
