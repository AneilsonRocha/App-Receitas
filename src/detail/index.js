import {useLayoutEffect,useState} from 'react';
import { View,Text,Pressable,StyleSheet,ScrollView,Image,Modal,Share} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Entypo,AntDesign,Feather} from '@expo/vector-icons'

import { Ingredients } from '../componentes/ingredients';
import { Intructions } from '../componentes/intructions';
import { VideoView } from '../video';

import { isFavorite,saveFavorite, removeItem} from '../util/storage';


export  function Detail() {
  const route = useRoute();
  const navigation = useNavigation();
  const [showvideo, setShowVideo] =  useState(false)
  const [favorite, setFavorite] =  useState(false)

  useLayoutEffect(() => {

    async function getStatusFavorites(){
      const receipeFavorite = await isFavorite(route.params?.data)
      setFavorite(receipeFavorite)
    }

    getStatusFavorites();

    navigation.setOptions({
      title: route.params?.data ? route.params?.data.name : "Detalhes da Receita",
      headerRight: () =>(
        <Pressable onPress={()=> handleFavoriteReceipe(route.params.data)}>
         { favorite ? (
          <Entypo 
             name='heart'
             size={28}
             color={"#FF4141"}
             />
         ) : (
          <Entypo 
          name='heart-outlined'
          size={28}
          color={"#FF4141"}
          />
         )}
        </Pressable>
      )

    })
 
  },[navigation,route.params?.data,favorite])

  async function handleFavoriteReceipe(receipe){
    if(favorite){
      await removeItem(receipe.id)
      setFavorite(false)
    }else{
      await saveFavorite("@appreceitas",  receipe)
      setFavorite(true)
    }
  }

  function handleOpenVideo(){
    setShowVideo(true);
    
  }

  async function shareReceip(){
    try {
      await Share.share({
        url: "https://sujeitoprogramador.com",
        message: `Receita  ${route.params?.data.name}\nIngredientes: ${route.params?.data.total_ingredients}\nVi la no app receitas facil`

      })
    } catch (error) {
      alert("error");
    }
  }

 return (
   <ScrollView styles={styles.container} showsVerticalScrollIndicator={false}>
      <Pressable onPress={handleOpenVideo}>
        <View style={styles.playIcon}>
          <AntDesign name='playcircleo' size={48} color={"#FAFAFA"} />
        </View>
        <Image 
          source={{uri: route.params?.data.cover}}
          style={styles.cover}
        />
      </Pressable>

      <View style={styles.headerDetail}>
        <View>
          <Text style={styles.title}>{route.params?.data.name}</Text>
          <Text style={styles.ingredientsText}>Total de Ingredientes ({route.params?.data.total_ingredients})</Text>
        </View>
        <Pressable onPress={shareReceip}>
          <Feather name='share-2' size={24} color='#121212' />

        </Pressable>

      </View>
     
     {route.params?.data.ingredients.map((item) => (
        <Ingredients data={item}  key={item.id}/>
     ))}

     <View style={styles.instructionArea}>
      <Text style={styles.instructionText}>Modo de preparo</Text>
      <Feather 
        name='arrow-down'
        size={24}
        color={'#fff'}
      
      />
     </View>

     {route.params?.data.instructions.map((item,index) => (
        <Intructions data={item}  key={item.id} index={index}/>
     ))}

     <Modal visible={showvideo} animationType="slide">
      <VideoView 
        handleClose={() => setShowVideo(false)}
        videoUrl={route.params?.data.video}
      
      />

     </Modal> 

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#F3F9ff',
    paddingTop:14,
    paddingEnd:14,
    paddingStart:14
  },
  cover:{
    height:200,
    borderRadius:14,
    width:'100%',
  },
  playIcon:{
    position:'absolute',
    zIndex:9,
    top:0, left:0 , right:0 , bottom:0,
    alignItems:'center',
    justifyContent: 'center'

  },
  title:{
    fontSize:18,
    marginTop:14,
    fontWeight:'bold',
    color:'#121212',
    marginBottom:4
  },
  ingredientsText:{
    marginBottom:14,
    fontSize:16
  },
  headerDetail:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:14
  },
  instructionArea:{
    backgroundColor:'#4cbe6c',
    flexDirection:'row',
    padding:8,
    borderRadius:4,
    marginBottom:14
  },
  instructionText:{
    fontSize:18,
    fontWeight:'500',
    color:'#fff',

  }
  

})