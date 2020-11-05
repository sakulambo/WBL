import React, {useState, useEffect} from 'react';
import { View, Text, Button, Platform, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

import { styles } from './styles/style';

const Warscrolls = () => {

  const baseUrl="https://databases-auth.000webhost.com/sql.php?db=id15274089_warhammerblacklist&table=unit";
  const [data, setData] = useState([]);
  // const [modalInsertar, setModalInsertar] = useState(false);
  // const [modalEditar, setModalEditar] = useState(false);
  // const [modalEliminar, setModalEliminar] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState({
    id: '',
    name: '',
    description: '',
    keywords: '',
    stadistics: '',
  });

  const peticionGet=async()=>{
    await axios.get(baseUrl,
      {
        headers: {
          "Access-Control-Allow-Origin": 'http://localhost:19006'
        }
      },
      {
          auth: {
              username: "id15274089_warhammerblacklistdb",
              passsword: "W{5oXhO*TfQ|CuQ!"
          }
      })
    .then(response=>{
      setData(response.data);
      console.log(response.data)
      console.log(response.status)
      console.log(response.statusText)
      console.log(response.headers)
      console.log(response.config)
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    peticionGet();
  },[])


  const navigation = useNavigation();
  const route = useRoute();



  // console.log(route);

  let detailResult = route.params;
  return (
    <View style={styles.center}>
      <Text style={styles.title}>
        {detailResult ? detailResult.title : 'Navigation Drawer'}
      </Text>
      <Image style={{ width: 150, height: 150 }} source={require('./assets/main_logo.jpeg')} />
      {/* {
        Platform.select({
          ios:
            <Button
              title='Go to Warscrolls Item'
              onPress={() => navigation.navigate('Detail', { foodName: "Detail Screen" })}
            />,
          android:
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', { foodName: "Detail Screen" })}>
              <Text style={styles.androidButtonText}>Go to Warscrolls</Text>
            </TouchableOpacity>,
          web:
          <TouchableOpacity
              onPress={() => navigation.navigate('Detail', { foodName: "Detail Screen" })}>
              <Text style={styles.androidButtonText}>Go to Warscrolls</Text>
            </TouchableOpacity>,
          
        })
      } */}

    </View>
  );
}

export default Warscrolls;