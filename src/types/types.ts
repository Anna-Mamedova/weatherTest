import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
};

export type MarkerType = {
  latitude: number;
  longitude: number;
};

export type WeatherType = {
  temp: number;
  description: string;
  name: string;
  country: string;
};

export type Forecast = {
  date: string;
  temp: number;
};

export type MapNavigation = BottomTabNavigationProp<RootTabParamList, 'Map'>;