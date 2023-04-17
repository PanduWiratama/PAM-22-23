import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Home";
import Detail from "./src/Detail";
import Profile from "./src/Profile";
import { Provider } from "react-redux";
import store from "./src/redux-thunk/store";

import {
  JadwalContext,
  MaskapaiContext,
  BandaraContext,
} from "./Context/GlobalContext";

const Stack = createNativeStackNavigator();

const App = () => {
  const jadwal = require("./data/jadwal.json");
  const maskapai = require("./data/maskapai.json");
  const bandara = require("./data/bandara.json");

  return (
    <Provider store={store}>
    <JadwalContext.Provider value={[jadwal]}>
      <MaskapaiContext.Provider value={[maskapai]}>
        <BandaraContext.Provider value={[bandara]}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Detail" component={Detail} />
              <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
          </NavigationContainer>
        </BandaraContext.Provider>
      </MaskapaiContext.Provider>
    </JadwalContext.Provider>
    </Provider>
  );
};

export default App;