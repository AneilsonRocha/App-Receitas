import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import  { Home } from '../home/'
import  { Detail } from '../detail/'
import {Search} from '../search/'

const Stack = createNativeStackNavigator();

export  function StackRoutes() {
 return (
    <Stack.Navigator>

        <Stack.Screen 
        name='Home' 
        component={Home} 
        options={{
            headerShown:false,
        }
   
        }
        />
        <Stack.Screen 
        name='Detail'
        component={Detail} 
        options={{
            // headerShown:false,
            title:'Detalhe da Receita'

        }
        }
         />
        <Stack.Screen 
        name='Search'
        component={Search} 
        options={{
            
            title:'Veja o que encontramos'

        }
     }
         />
        
    </Stack.Navigator>
   
  );
}