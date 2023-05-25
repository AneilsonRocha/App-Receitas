import {useState,useEffect} from 'react';
import { View,Text,StyleSheet,SafeAreaView,FlatList} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import{getFavorites} from '../util/storage'
import { Foodlist } from './../componentes/foodlist/index';

export  function Favorites() {
  const [receipes,setReceipes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    let isActive = true;

    async function getReceipes(){
      const result = await getFavorites("@appreceitas");
      if(isActive){
        setReceipes(result)
      }
    }

    if(isActive){
      getReceipes();
    }

    return () => {
      isActive = false;
    }
    
    

  }, [isFocused])

 return (
   <SafeAreaView style={styles.container}>

    <Text style={styles.title}>Receitas favoritas</Text>

    {receipes.length ===0 &&(
      <Text>Voçê ainda nao tem nenhuma receita salva</Text>
    )}

    <FlatList 
      showsVerticalScrollIndicator={false}
      data={receipes}
      keyExtractor={(item) => String(item.id)}
      renderItem={({item}) => <Foodlist data={item} />}
    
    />

   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F3F9FF",
    paddingStart:14,
    paddingEnd:14,
    paddingTop:36,
  },
  title:{
    color:'#000',
    fontWeight:'bold',
    fontSize:24
  }
})