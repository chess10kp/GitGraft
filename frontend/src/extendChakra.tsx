import {extendTheme} from '@chakra-ui/react';


const theme = extendTheme({ 
  components: { 
    Button: { 
      baseSytle: { 
        fontWeight: 'bold', 
      } 
    }
  }
}) 

export default  theme ; 
