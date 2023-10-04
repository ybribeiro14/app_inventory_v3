import { createStackNavigator } from '@react-navigation/stack';

import { Register } from '../screens/Register';
import theme from '../styles/theme';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: theme.colors.header },
    }}
  >
    <App.Screen name="Register" component={Register} />
  </App.Navigator>
);

export default AppRoutes;
