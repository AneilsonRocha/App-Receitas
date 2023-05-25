import {useState,useEffect} from 'react';
import { View,Text,StyleSheet,FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import api from '../services/api'
import { Foodlist } from '../componentes/foodlist';


export  function Search() {
  const route = useRoute();
  const [receipes,setReceipes]= useState([])


  useEffect(() => {
    async function fetchReceipes(){
      const response = await api.get(`http://localhost:3000/foods?name_like=${route.params?.name}`)
      setReceipes(response.data);
    }

    fetchReceipes();

  },[route.params?.name])

 return (
   <View style={styles.container}> 

    <FlatList 
      showsVerticalScrollIndicator={false}
      data={receipes}
      keyExtractor={(item) => String(item.id)}
      renderItem={({item}) => <Foodlist data={item} />}
      ListEmptyComponent={() => <Text style={styles.text}>Não encontramos o que esta buscando..</Text>}
    />
   
   </View>


  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingStart:14,
    paddingEnd:15,
    paddingTop:14,
    backgroundColor: '#f3f9ff',
  },
  text:{
    fontSize:14,
    fontWeight:'500'
  }
})