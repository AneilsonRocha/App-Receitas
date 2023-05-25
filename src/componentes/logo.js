import { View,Text,StyleSheet,TextInput,SafeAreaView } from 'react-native';
 
export  function  Logo() {
 return (
   <View style={Styles.logoArea}>

    <Text style={Styles.logo}>Receita Facil</Text>
    
   </View>

  );
}


const Styles = StyleSheet.create({
  logoArea:{
    backgroundColor: '#4cbe6c',
    alignSelf:'flex-start',
    padding:8,
    paddingLef:20,
    paddingRight:16,
    borderTopRightRadius:8,
    borderBottomLeftRadius:8,
    borderTopLeftRadius:8,
    borderBottomRightRadius:32,
    marginBottom:8
    
  },
  logo:{
    fontSize:18,
    fontWeight:'bold',
    color:'#FFF',
    marginBottom:8
  }
})