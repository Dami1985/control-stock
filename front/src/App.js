import React from 'react';
import DataDisplay from './DataDisplay';
import { 
Heading,
} from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
        <Heading className="App-header">
          <Heading>Datos desde la Base de Datos</Heading>
          <DataDisplay />
          <DataDisplay />
        </Heading>
    </div>
);

}

export default App;