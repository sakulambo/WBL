import React, {useState, useEffect} from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';


import colors from "../config/colors";

function WarscrollScreen(props) {
    const baseUrl="https://databases-auth.000webhost.com/sql.php?db=id15274089_warhammerblacklist&table=unit";
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [frameworkSeleccionado, setFrameworkSeleccionado] = useState({
      id: '',
      nombre: '',
      lanzamiento: '',
      desarrollador: ''
    });

    const handleChange=e=>{
        const {name, value}=e.target;
        setFrameworkSeleccionado((prevState)=>({
          ...prevState,
          [name]: value
        }))
        console.log(frameworkSeleccionado);
      }
    
      const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
      }
    
      const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
      }
    
      const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
      }
    
      const peticionGet=async()=>{
        await axios.get(baseUrl, {},
        {
            auth: {
                username: "id15274089_warhammerblacklistdb",
                passsword: "W{5oXhO*TfQ|CuQ!"
            }
        })
        .then(response=>{
          setData(response.data);
          console.log(response.data)
        }).catch(error=>{
          console.log(error);
        })
      }

      const seleccionarFramework=(framework, caso)=>{
        setFrameworkSeleccionado(framework);
    
        (caso==="Editar")?
        abrirCerrarModalEditar():
        abrirCerrarModalEliminar()
      }

      useEffect(()=>{
        peticionGet();
      },[])


      return (
        <div style={{textAlign: 'center'}}>
        <br />
          <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
          <br /><br />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Lanzamiento</th>
              <th>Desarrollador</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(framework=>(
              <tr key={framework.id}>
                <td>{framework.id}</td>
                <td>{framework.nombre}</td>
                <td>{framework.lanzamiento}</td>
                <td>{framework.desarrollador}</td>
              <td>
              <button className="btn btn-primary" onClick={()=>seleccionarFramework(framework, "Editar")}>Editar</button> {"  "}
              <button className="btn btn-danger" onClick={()=>seleccionarFramework(framework, "Eliminar")}>Eliminar</button>
              </td>
              </tr>
            ))}
    
    
          </tbody> 
    
        </table>
    
    
        <Modal isOpen={modalInsertar}>
          <ModalHeader>Insertar Framework</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombre: </label>
              <br />
              <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
              <br />
              <label>Lanzamiento: </label>
              <br />
              <input type="text" className="form-control" name="lanzamiento" onChange={handleChange}/>
              <br />
              <label>Desarrollador: </label>
              <br />
              <input type="text" className="form-control" name="desarrollador" onChange={handleChange}/>
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>
    
    
        
        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar Framework</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombre: </label>
              <br />
              <input type="text" className="form-control" name="nombre" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.nombre}/>
              <br />
              <label>Lanzamiento: </label>
              <br />
              <input type="text" className="form-control" name="lanzamiento" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.lanzamiento}/>
              <br />
              <label>Desarrollador: </label>
              <br />
              <input type="text" className="form-control" name="desarrollador" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.desarrollador}/>
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
          </ModalFooter>
        </Modal>
    
        <Modal isOpen={modalEliminar}>
            <ModalBody>
            ¿Estás seguro que deseas eliminar el Framework {frameworkSeleccionado && frameworkSeleccionado.nombre}?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>peticionDelete()}>
                Sí
              </button>
              <button
                className="btn btn-secondary"
                onClick={()=>abrirCerrarModalEliminar()}
              >
                No
              </button>
            </ModalFooter>
          </Modal>
    
        </div>
      );

    /**return (
      <ImageBackground
      style={styles.background}
      >  
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{uri:"https://www.belloflostsouls.net/wp-content/uploads/2019/04/Warhammer-Logo.jpg"}}></Image>
        <Text style={styles.headerText}>Warhammer Black List</Text>
      </View>  
      <TouchableWithoutFeedback>
        <View style={styles.loginButton}></View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <View style={styles.registerButton}></View>
      </TouchableWithoutFeedback>
      </ImageBackground>
    );*/
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        backgroundColor: colors.black
    },
    loginButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#F5F5F5',
    },
    logo: {
        width: 100,
        height: 100
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems:'center'
    },
    registerButton: {
        width: '100%',
        height: 70,
        backgroundColor: colors.secondary,
        borderWidth: 1,
        borderLeftColor: colors.secondary,
        borderRightColor: colors.secondary,
        borderBottomColor: colors.secondary,
        borderColor: colors.border_primary
    },
    
}

)

export default WarscrollScreen;