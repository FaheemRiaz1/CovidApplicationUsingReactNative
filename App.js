import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';

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

function HomeScreen({ navigation }) {
  const [getdataSource, setdataSource] = useState(null);
  const [getTotalPop,setTotalPop]=useState(null);
  var date = new Date().getDate();
  useEffect(() => {
     getTotalData();
     
  }, []);
  useEffect(() => {
    getDataofWorld(); 
  }, []);

  const getDataofWorld = () => {
    return fetch(
      // ENTER YOUR API KEY HERE//
      
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
         setTotalPop(responseJson.body.world_population); 
      })
      .catch((err) => {
        console.error(err);  
      });
  };

  const getTotalData = () => {
    return fetch(// ENTER YOUR API KEY HERE//
      },
    })
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
      {getdataSource && <Text style={styles.text}>Confirmed: {parseFloat((getdataSource[0].confirmed/getTotalPop)*100).toFixed(3)}%</Text>}
    </TouchableOpacity>
    <TouchableOpacity style={styles.main}>
       {getdataSource && <Text style={styles.text}>Recovered: {parseFloat((getdataSource[0].recovered/getTotalPop)*100).toFixed(3)}%</Text>}    
    </TouchableOpacity>
    <TouchableOpacity style={styles.main}>
       {getdataSource && <Text style={styles.text}>Critical: {parseFloat((getdataSource[0].critical/getTotalPop)*100).toFixed(7)}%</Text>}
    </TouchableOpacity>
    <TouchableOpacity style={styles.main}>
        {getdataSource && <Text style={styles.text}>Deaths: {parseFloat((getdataSource[0].deaths/getTotalPop)*100).toFixed(3)}%</Text>}
    </TouchableOpacity>
    <TouchableOpacity style={styles.main}>
        {getdataSource && <Text style={styles.text}>Last Updated: {date-(JSON.stringify(getdataSource[0].lastUpdate).substring(9,11))} days ago</Text>}
    </TouchableOpacity>
    </View>
  );

}
//////////////////////////////////////COUNTRIES SCREEN//////////////////////////////////////////
function Searching({ navigation,route }) {
  const [getData,setData]=useState('')
  const [getCountry,setCountry]=useState('Search Result')
  const [getlist,setlist]=useState([]);
  const [getdataSource, setdataSource] = useState(null);
  const [gl,sl]=useState([]);  
   
     useEffect(() => {
    // When returning from History Screen Update state
    if (route.params?.getListofFav) {
      setlist(route.params.getListofFav);
      // Reste Parameters
      navigation.setParams({ getListofFav: undefined });
    }
  });

 useEffect(() => {
    getTotalData();  
  }, []);
 
const getTotalData = () => {
    return fetch(// ENTER YOUR API KEY HERE//
        }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setdataSource(responseJson.body.countries);
        setlist(responseJson.body.countries)
      })
      .catch((err) => {
        console.error(err);    
      });
  };
  const search=()=>{
    getlist.filter(item => item === getData ? setCountry(getData) : console.log('Not found') )
  }
  const onPressAdd=()=>{
        sl([
          ...gl,
          {key: Math.random().toString(),data:getData}
          ])             
   setData('')  
 
   }
  
  return (
    <View style={styles.maindiv}>
     <Button
          title="Back"
          onPress={() => navigation.navigate('Home')}
        />      
        <TouchableOpacity style={styles.h1o}>
            <Text style={styles.h1}>Search Countries</Text>
        </TouchableOpacity>
       
    <View style={{justifyContent:"space-between",flexDirection:"row",paddingTop:20}}>   
      <TextInput 
      style={styles.textinput}
      placeholder="Enter Country"
      onChangeText={text => setData(text)}
      value={getData}
      onPress={() => navigation.navigate('Statistics',{countryname:gl})}
      />
      
      <TouchableOpacity onPress={search}>
            <Text style={styles.texstyles}> Search </Text>
      </TouchableOpacity>
    </View>
    
    <View style={{justifyContent:"space-between",flexDirection:"row",paddingTop:10,}}>
    
        <TouchableOpacity onPress={() => navigation.navigate('Statistics',{countryname:getData})}>
              <Text style={styles.dataText}>{getCountry}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{textAlign:'center'}} onPress={onPressAdd}>
              <Text style={styles.texstyles}>Favorite</Text>
        </TouchableOpacity> 
     </View>
     <Button
          title="Favorites"
          onPress={() => navigation.navigate('Favorites',{countryname:gl})}
        />         
  </View>
  );
}

/////////////////////////////////Favorite////////////////////////////////////////////////
function Favorites({navigation,route}){
  const [getList,setList]=useState(route.params.countryname);

  const deleteitem=(itemkey)=>{
    setList(list => getList.filter(item=>item.key!=itemkey));
  }

  return (
  <View style={styles.container}>
  <Button title="Back to searching" onPress={() => navigation.navigate('Searching',{getListofFav:getList})}/>            
    <DataTable>
      <DataTable.Header style={styles.header}>
        <DataTable.Title style={{flex:1}}>SR</DataTable.Title>
        <DataTable.Title style={{flex:4}}>Orginal Price</DataTable.Title>
        <DataTable.Title style={{flex:3}}>Delete</DataTable.Title>
        <DataTable.Title style={{flex:3}}>Navigate</DataTable.Title>
      </DataTable.Header>
  {getList.map((item,index)=>  
      <DataTable.Row  style={styles.table}>
        <DataTable.Cell style={{fkex:1}}>{index+1}</DataTable.Cell>
        <DataTable.Cell style={{flex: 4}}>{item.data}</DataTable.Cell>
        <DataTable.Cell style={{flex: 3}}>
        <TouchableOpacity onPress={()=>deleteitem(item.key)}>
          <View style={styles.smallview}> 
              <Text style={styles.smalltext}>X</Text>                   
          </View>
        </TouchableOpacity>
      
        </DataTable.Cell>
        <DataTable.Cell style={{flex:3}}><Button title='See stats' onPress={() => navigation.navigate('Statistics',{countryname:item.data})}/></DataTable.Cell>

      </DataTable.Row>
      )}
    </DataTable>

  <TouchableOpacity>
  <Button title="Back to Home" onPress={() => navigation.navigate('Home')}/>
  </TouchableOpacity>
</View>     
  );
}
///////////////////////////////////Statistics///////////////////////////////////////////////////////////
function Statistics({navigation,route}){
  const [getcd,setcd]=useState(null)
  const [getcp,setcp]=useState(null)
  const name=route.params.countryname
  
   useEffect(() => {
    getTotalData();
     
  }, []);
   useEffect(() => {
    getPopofCountry();
     
  }, []);

  const getTotalData = () => {
    return fetch(// ENTER YOUR API KEY HERE//
          }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        setcd(responseJson);
        console.log(responseJson)
      })
      .catch((err) => {
        console.error(err);
        
      });
  };
   const getPopofCountry = () => {
    return fetch(// ENTER YOUR API KEY HERE//
          }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setcp(responseJson.body.population);
      })
      .catch((err) => {
        console.error(err);      
      });
  };

  return(
    <View>
    
     <TouchableOpacity style={styles.h1o}>
     {getcd && <Text style={styles.h1}>{getcd[0].country}</Text>}
    </TouchableOpacity>
        <TouchableOpacity style={styles.main}>
     {getcd && <Text style={styles.text}>Total Population: {getcp}</Text>}
   </TouchableOpacity> 
       <TouchableOpacity style={styles.main}>
     {getcd && <Text style={styles.text}>Confiremd: {parseFloat((getcd[0].confirmed*100/getcp)).toFixed(3)}%</Text>}
   </TouchableOpacity>
    <TouchableOpacity style={styles.main}>
      {getcd && <Text style={styles.text}>Recovered: {parseFloat((getcd[0].recovered/getcp)*100).toFixed(3)}%</Text>}
    </TouchableOpacity>
    <TouchableOpacity style={styles.main}>
     {getcd && <Text style={styles.text}>Critical: {parseFloat((getcd[0].critical/getcp)*100).toFixed(7)}%</Text>}
    </TouchableOpacity>
    <TouchableOpacity style={styles.main}>
     {getcd && <Text style={styles.text}>Deaths: {parseFloat((getcd[0].deaths/getcp)*100).toFixed(3)}%</Text>}
    </TouchableOpacity>
    <Button onPress={()=>navigation.navigate('Searching')} title="Back"/>
   </View>
  )
}

const Drawer = createDrawerNavigator();
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Searching" component={Searching} />
        <Drawer.Screen name="Favorites" component={Favorites} />
          <Drawer.Screen name="Statistics" component={Statistics} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const styles=StyleSheet.create({
  text:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize:20,
    paddingRight:55,
    padding:17,
    borderRadius:10,
  },
  dataText:{
    borderColor: 'black',
    borderWidth: 2,
    borderRadius:10,
    fontSize:20,
    width: '170%',
    paddingBottom:10,
  },
  maindiv:{
    backgroundColor:"#D4DCA9",
    textAlign:'center',
    borderWidth:2,
    borderRadius:10,
    paddingTop:80,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    flex:1,
  },
   main:{
    backgroundColor:"#D4DCA9",
    borderRadius:10,
  },
  h1:{
    fontSize: 35,
    textAlign:'center',
    borderWidth: 6,
    borderColor:'#D4DCA9',
    color:'white',
    fontWeight:'bold',
    borderRadius:10,
  },
  h1o:{
    backgroundColor:'#336699',
    padding:17,
    borderRadius:10,
  
  },
  textinput:{
    borderWidth:2,
    borderRadius:15,
    width:'75%',
  },
  texstyles:{
    backgroundColor:"#2F2FA2",
    borderRadius:15,
    padding:10,
    justifyContent:"center",
    alignItems:"center",
    color:"white",
    fontWeight:"bold",
  },
   table:{
    backgroundColor:"orange",
    paddingBottom:5,
  },
  header:{
    backgroundColor: "lightgreen",
    fontWeight:"bold",
    color:"white",
  },
})
export default App;
