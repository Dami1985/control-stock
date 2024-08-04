import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Box,
  UnorderedList,
  ListItem,
  Divider,
  Text,
  Button,
  Input
} from '@chakra-ui/react';

const DataDisplay = () => {
  const [users, setUsers] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', email: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await axios.get('http://localhost:4000/getusers');
        setUsers(responseUsers.data);

        const responseArticulos = await axios.get('http://localhost:4000/getarticulos');
        setArticulos(responseArticulos.data);
      } catch (error) {
        console.error('Error al obtener datos', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:4000/adduser', newUser);
      setUsers([...users, response.data]);
      setNewUser({ username: '', password: '', email: '' });
    } catch (error) {
      console.error('Error al agregar usuario', error);
    }
  };

  return (
    <Box>
      <Text bg='tomato' w='100%' p={4} color='white' fontSize='2xl'>Usuarios</Text>
      <UnorderedList>
        {users.map(user => (
          <ListItem key={user.id} fontSize='sm'>ID: {user.id}, Nombre: {user.username}, Email: {user.email}</ListItem>
        ))}
      </UnorderedList>
      <Input 
        placeholder="Nombre de usuario" 
        name="username" 
        value={newUser.username} 
        onChange={handleInputChange} 
      />
      <Input 
        placeholder="Contraseña" 
        name="password" 
        value={newUser.password} 
        onChange={handleInputChange} 
        type="password"
      />
      <Input 
        placeholder="Correo electrónico" 
        name="email" 
        value={newUser.email} 
        onChange={handleInputChange} 
      />
      <Button onClick={addUser} colorScheme='blue' size='md'>Agregar Usuario</Button>
      <Divider />
      <Text bg='tomato' w='100%' p={4} color='white' fontSize='2xl'>Artículos</Text>
      <UnorderedList>
        {articulos.map(articulo => (
          <ListItem key={articulo.id} fontSize='sm'>ID: {articulo.id}, Título: {articulo.nombre}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default DataDisplay;