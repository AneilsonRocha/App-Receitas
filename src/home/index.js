
import {useState,useEffect} from 'react'
import { View,Text,StyleSheet,TextInput,SafeAreaView,TouchableOpacity,
        FlatList,OnClick
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { Logo } from '../componentes/logo';

import { Foodlist } from '../componentes/foodlist/'

import {useNavigation} from '@react-navigation/native'
import api from '../services/api';

import {Text as MotiText} from 'moti'

export function Home() {
  const [inputValue,setInputValue] = useState("")
  const [foods,setFoods] = useState([])

  const navigation = useNavigation();


  useEffect(() => {

    async function fetchApi(){
      const response = await api.get("http://localhost:3000/foods")
      setFoods(response.data)
    }
    fetchApi();

    

  }, [])

  function handleSearch(name){
  
    if(!inputValue) return;
  

    let input = inputValue;
    setInputValue("");
    navigation.navigate("Search", {name : input})
    
  }

 return (
   <SafeAreaView style={Styles.container}>
     <Logo />

     <Text style={Styles.title}>
      Encontre a receita
     </Text>

     <Text style={Styles.title}>
      que combina com voçê
      </Text>

      <View style={Styles.form}>
        <TextInput
          placeholder="Digite o nome da comida..."
          style={Styles.input}
          value={inputValue}
          onChangeText={setInputValue}
        />

        <TouchableOpacity OnClick={handleSearch(inputValue)}>
           <Ionicons name="search" size={28} color="#4CBE6C"/>
        </TouchableOpacity>
      
        </View>

        <FlatList
          data={foods}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => <Foodlist data={item} />}
          showsHorizontalScrollIndicator={false}
        />

   </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#f3f9ff',
    paddingTop:36,
    paddingStart:14,
    paddingEnd:14
  },
  title:{
    fontSize:26,
    fontWeight:'bold',
    color:'#0e0e0e'
  },
  form:{
    backgroundColor: '#FFF',
    width:'100%',
    borderRadius:8,
    marginTop:16,
    marginBottom:16,
    borderWidth:1,
    borderColor:'#ECECEC',
    paddingLeft:8,
    paddingRight:8,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  input:{
    width:'90%',
    maxWidth:'90%',
    height:54

  },

})