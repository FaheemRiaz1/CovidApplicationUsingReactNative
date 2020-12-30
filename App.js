import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import Constants from 'expo-constants';
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Keyboard,
  Button,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerType={'slide'} drawerStyle={{ width: 200 }}>
      <Drawer.Screen
        name="Home"
        component={StackNavigator}
        options={{
          drawerLabel: 'Home',
          drawerIcon: () => <Ionicons name="md-home" size={25} />,
        }}
      />
      <Drawer.Screen
        name="Search"
        component={CountryNavigator}
        options={{
          drawerLabel: 'Search',
          drawerIcon: () => (
            <FontAwesome5 name="search-location" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavrtNavigator}
        options={{
          drawerLabel: 'Favorite',
          drawerIcon: () => (
            <MaterialIcons name="favorite" size={24} color="black" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Ionicons
            name="md-menu"
            size={40}
            onPress={() => navigation.openDrawer()}
          />
        ),
      })}>
      <Stack.Screen
        name="History"
        component={HomeScreen}
        options={{
          title: 'Home page',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '',
          },
        }}
      />

      <Stack.Screen
        name="Countires"
        component={Countries}
        options={{
          title: 'Search',
          headerTitleAlign: 'Center',
          headerStyle: {
            backgroundColor: '',
          },
        }}
      />

      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: 'Favorites',
          headerTitleAlign: 'Center',
          headerStyle: {
            backgroundColor: '',
          },
        }}
      />

      <Stack.Screen
        name="Statistics"
        component={Statistics}
        options={{
          title: 'Search',
          headerTitleAlign: 'Center',
          headerStyle: {
            backgroundColor: '',
          },
        }}
      />
    </Stack.Navigator>
  );
};
const CountryNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Country'}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Ionicons
            name="md-menu"
            size={40}
            onPress={() => navigation.openDrawer()}
          />
        ),
      })}>
      <Stack.Screen
        name="Countires"
        component={Countries}
        options={{
          title: 'Search',
          headerTitleAlign: 'Center',
          headerStyle: {
            backgroundColor: '',
          },
        }}
      />
    </Stack.Navigator>
  );
};
const StatNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Ionicons
            name="md-menu"
            size={40}
            onPress={() => navigation.openDrawer()}
          />
        ),
      })}>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: 'Favorites',
          headerTitleAlign: 'Center',
          headerStyle: {
            backgroundColor: '',
          },
        }}
      />
    </Stack.Navigator>
  );
};
const FavrtNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Ionicons
            name="md-menu"
            size={40}
            onPress={() => navigation.openDrawer()}
          />
        ),
      })}>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: 'Favorites',
          headerTitleAlign: 'Center',
          headerStyle: {
            backgroundColor: '',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const HomeScreen = ({ navigation }) => {
  const [getdataSource, setdataSource] = useState(null);
  const [getTotalPop, setTotalPop] = useState(null);
  var date = new Date().getDate();
  useEffect(() => {
    getTotalData();
  }, []);
  useEffect(() => {
    getDataofWorld();
  }, []);
  const getDataofWorld = () => {
    return fetch(//ENTER YOU API KEY HERE
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setTotalPop(responseJson.body.world_population);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getTotalData = () => {
    return fetch(//ENTER YOU API KEY HERE
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setdataSource(responseJson);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <View style={styles.maindiv}>
      <TouchableOpacity style={styles.h1o}>
        <Text style={styles.h1}>World Stats</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.main}>
        {getdataSource && (
          <Text style={styles.text}>
            Confirmed:{' '}
            {parseFloat(
              (getdataSource[0].confirmed / getTotalPop) * 100
            ).toFixed(3)}
            %
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.main}>
        {getdataSource && (
          <Text style={styles.text}>
            Recovered:{' '}
            {parseFloat(
              (getdataSource[0].recovered / getTotalPop) * 100
            ).toFixed(3)}
            %
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.main}>
        {getdataSource && (
          <Text style={styles.text}>
            Critical:{' '}
            {parseFloat(
              (getdataSource[0].critical / getTotalPop) * 100
            ).toFixed(7)}
            %
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.main}>
        {getdataSource && (
          <Text style={styles.text}>
            Deaths:{' '}
            {parseFloat((getdataSource[0].deaths / getTotalPop) * 100).toFixed(
              3
            )}
            %
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.main}>
        {getdataSource && (
          <Text style={styles.text}>
            Last Updated:{' '}
            {date -
              JSON.stringify(getdataSource[0].lastUpdate).substring(9, 11)}{' '}
            days ago
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

/////////////////////////////////////////////////SEARCHING////////////////////////////////////////////
const Countries = ({ navigation, route }) => {
  const [getData, setData] = useState('');
  const [getCountry, setCountry] = useState('Search Result');
  const [getlist, setlist] = useState([]);
  const [getdataSource, setdataSource] = useState(null);

  useEffect(() => {
    getTotalData();
  }, []);

  const getTotalData = () => {
    return fetch(//ENTER YOU API KEY HERE
      )
      .catch((err) => {
        console.error(err);
      });
  };
  const search = () => {
    getlist.filter((item) =>
      item === getData ? setCountry(getData) : console.log('Not found')
    );
  };

  navigation.setOptions({
    headerRight: () => (
      <Button
        title="Favorites"
        onPress={() => navigation.navigate('Favorites')}
      />
    ),
  });
  const savedata = async () => {
    console.log('Saving');
    await AsyncStorage.setItem(
      '@storage_key' + getCountry,
      JSON.stringify({ value: getCountry })
    );
    console.log('Save done');
    setData('');
  };
  return (
    <View style={styles.maindiv}>
      <TouchableOpacity style={styles.h1o}>
        <Text style={styles.h1}>Search Countries</Text>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 20,
        }}>
        <TextInput
          style={styles.textinput}
          placeholder="Enter Country"
          onChangeText={(text) => setData(text)}
          value={getData}
        />
        <TouchableOpacity onPress={search}>
          <FontAwesome5 name="search-location" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 10,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Statistics', { countryname: getData })
          }>
          <Text style={styles.dataText}>{getCountry}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ textAlign: 'center' }} onPress={savedata}>
          <MaterialIcons name="favorite" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

//////////////////////////////////////FAVORITES///////////////////////////////////////////////
function Favorites({ navigation, route }) {
  const [getList, setList] = useState([]);
  const [getData, setData] = useState();
  const list=[];


 navigation.setOptions({
    headerRight: () => (
      <Button
        title="Back"
        onPress={() => navigation.navigate('Countries')}
      />
    ),
  });
 
    const loadData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      for (var i = 0; i < keys.length; i++) {
        var key = await AsyncStorage.getItem(keys[i]);
        const data = JSON.parse(key).value;
        if (value !== null) {
          list.push(data+'\n');
        }
      }
      setList(list);
    } catch (e) {
      console.error(e);
    }
  };

 const loaddata = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      for (var i = 0; i < keys.length; i++) {
        var key = await AsyncStorage.getItem(keys[i]);
        const data = JSON.parse(key).value;
        if (key !== null) {
          array.push(data+'\n');
          //SORTING AS SIR HAS SAID
          array.sort()
        }
      }
      setList(array);
    } catch (e) {
      console.error(e);
    }
  };
    
  return (
    <View style={styles.container}>
      {getList.map((item, index) => (
     
     <TouchableOpacity onPress={()=>navigation.navigate('Statistics', { countryname: item })}>
      <Text style={styles.text}>{item}</Text>
       <TouchableOpacity  onPress={()=>deleteToken(item.key)}>
                <View style={styles.smallview}> 
                     <Button title="Delete" onPress={()=>deleteToken(item.key)}/>
                </View>
    </TouchableOpacity>
             
    </TouchableOpacity>
      ))}
      <Button title="Load" onPress={loaddata}/>
    </View>

  );
}
///////////////////////////////////Statistics///////////////////////////////////////////////////////////
function Statistics({ navigation, route }) {
  const [getcd, setcd] = useState(null);
  const [getcp, setcp] = useState(null);
  const name = route.params.countryname;
  console.log(name);
  useEffect(() => {
    getTotalData();
  }, []);
  useEffect(() => {
    getPopofCountry();
  }, []);

  const getTotalData = () => {
    return fetch(//ENTER YOUR API KEY HERE
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setcd(responseJson);
        console.log(responseJson);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getPopofCountry = () => {
    return fetch(//ENTER YOUR API KEY HERE
      )
      .then((response) => response.json())
      .then((responseJson) => {
        setcp(responseJson.body.population);
      })
      .catch((err) => {
        console.error(err);
      });
  };
 navigation.setOptions({
    headerRight: () => (
      <Button
        title="Back"
        onPress={() => navigation.navigate('Countries')}
      />
    ),
  });
  

  return (
    <View>
      <TouchableOpacity style={styles.h1o}>
        {getcd && <Text style={styles.h1}>{getcd[0].country}</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.main}>
        {getcd && <Text style={styles.text}>Total Population: {getcp}</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.main}>
        {getcd && (
          <Text style={styles.text}>
            Confiremd:{' '}
            {parseFloat((getcd[0].confirmed * 100) / getcp).toFixed(3)}%
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.main}>
        {getcd && (
          <Text style={styles.text}>
            Recovered:{' '}
            {parseFloat((getcd[0].recovered / getcp) * 100).toFixed(3)}%
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.main}>
        {getcd && (
          <Text style={styles.text}>
            Critical: {parseFloat((getcd[0].critical / getcp) * 100).toFixed(7)}
            %
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.main}>
        {getcd && (
          <Text style={styles.text}>
            Deaths: {parseFloat((getcd[0].deaths / getcp) * 100).toFixed(3)}%
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 20,
    paddingRight: 55,
    padding: 17,
    borderRadius: 10,
  },
  dataText: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 20,
    width: '170%',
    paddingBottom: 10,
  },
  maindiv: {
    backgroundColor: '#D4DCA9',
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    flex: 1,
  },
  main: {
    backgroundColor: '#D4DCA9',
    borderRadius: 10,
  },
  h1: {
    fontSize: 35,
    textAlign: 'center',
    borderWidth: 6,
    borderColor: '#D4DCA9',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 10,
  },
  h1o: {
    backgroundColor: '#336699',
    padding: 17,
    borderRadius: 10,
  },
  textinput: {
    borderWidth: 2,
    borderRadius: 15,
    width: '75%',
  },
  texstyles: {
    backgroundColor: '#2F2FA2',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  table: {
    backgroundColor: 'orange',
    paddingBottom: 5,
  },
  header: {
    backgroundColor: 'lightgreen',
    fontWeight: 'bold',
    color: 'white',
  },
});
