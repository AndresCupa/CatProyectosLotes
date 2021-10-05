<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Areas</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      
                      v-model="nombre"
                      label="Nombre"
                    
                      clearable
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="descripcion"
                      label="Descripción"
                      clearable
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 v-show="valida">
                    <div
                      class="red--text"
                      v-for="v in validaMensaje"
                      :key="v"
                      v-text="v"
                    ></div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="close">Cancelar</v-btn>
              <v-btn color="primary" v-if="tipoAccion==1" flat @click="guardar">Guardar</v-btn>
              <v-btn color="primary" v-if="tipoAccion==2" flat @click="guardar">Actualizar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="adModal" max-width="290">
          <v-card>
            <v-card-title class="headline" v-if="estado == true">
              Activar Item
            </v-card-title>
            <v-card-title class="headline" v-if="estado == false">
              Desactivar Item
            </v-card-title>
            <v-card-text>
              Estás a punto de <span v-if="estado == true">activar </span>
              <span v-if="estado == false">desactivar </span> el item
              {{ adNombre }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="activarDesactivarCerrar()"
                color="primary"
                flat="flat"
              >
                Cancelar
              </v-btn>
              <v-btn
                v-if="estado == true"
                @click="activar()"
                color="primary"
                flat="flat"
              >
                Activar
              </v-btn>
              <v-btn
                v-if="estado == false"
                @click="desactivar()"
                color="primary"
                flat="flat"
              >
                Desactivar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <!-- <datatable :infoTabla="categorias" :headers="headers"/> -->

      <v-data-table
        :headers="headers"
        :items="areas"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:[`item.opciones`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <template v-if="item.estado">
            <v-icon small @click="activarDesactivarMostrar(false, item)">
              block
            </v-icon>
          </template>
          <template v-else>
            <v-icon small @click="activarDesactivarMostrar(true, item)">
              check
            </v-icon>
          </template>
        </template>
        <template v-slot:[`item.estado`]="{ item }">
          <div v-if="item.estado">
            <span class="blue--text">Activo</span>
          </div>
          <div v-else>
            <span class="red--text">Inactivo</span>
          </div>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>


<script>
import axios from "axios";
import firebase from 'firebase/app'
import 'firebase/firestore'
import { db } from '../Db';
export default {
  data() {
    return {
      dialog: false,
      search: "",
      areas: [],
      categorys: "holaa",
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Estado", value: "estado", sortable: true },
      ],
      editedIndex: -1,
      key: "",
      nombre: "",
      descripcion: "",
      estado: true,
      tipoAccion: 1,
      valida: 0,
      validaMensaje: [],
      adModal: 0,
      adNombre: "",
      adId: "",
      // tipoAccion: 0,
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
    created() {
    this.listar();
    
  },
   
  methods: {
    listar() {
      if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig)
    }
    firebase.firestore().collection('areas').onSnapshot((snapshotChange) => {
        this.areas = []
        snapshotChange.forEach(doc => {
          this.areas.push({
                        key: doc.id,
                        nombre: doc.data().nombre,
                        descripcion: doc.data().descripcion,
                        estado: doc.data().estado,
          })          
          console.log(doc.data())
        })
      })
    },
    limpiar() {
      this.key = "";
      this.nombre = "";
      this.descripcion = "";
      // this.estado = "";
      this.valida = 0;
      this.validaMensaje = [];
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (this.nombre.length < 1 || this.nombre.length > 50) {
        this.validaMensaje.push(
          "El nombre del área debe tener entre 1-50 caracteres."
        );
      }else{
        console.log("array");
        this.areas.forEach(value => {
        console.log(value["nombre"])
        if (value["nombre"] === this.nombre || value["nombre"] === this.nombre.toUpperCase()) {
            this.validaMensaje.push(
            "El nombre del área ya existe."
            )
        }
        })
      }
      if(this.descripcion.length < 1){
        this.validaMensaje.push(
        "La descripción del área debe tener entre 1-255 caracteres."
        );
      }
      else if (this.descripcion.length > 255) {
        this.validaMensaje.push(
          "La descripción del área no debe tener más de 255 caracteres."
        );
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    guardar() {
      let me = this;
      let header = { headers: { "x-token": this.$store.state.token } };
      if (this.validar()) {
        return;
      }
      console.log("areas key "+ me.key);
      console.log("control1");
      if (this.editedIndex > -1) {
           db.collection('areas').doc(me.key)
                .update({
                  nombre: me.nombre.toUpperCase(),
                  descripcion : me.descripcion, 
                  estado: me.estado})
      
       .then(function (response) {
            me.limpiar();
            me.close();
            me.listar();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else
      {
         if(this.nombre.value != '' && this.descripcion.value != ""){
 
        const area = {
              // key: this.key,
              nombre: this.nombre.toUpperCase(),
              descripcion: this.descripcion,
              estado: this.estado,
        }
         this.$store.dispatch("addArea", area); 
            me.limpiar();
            me.close();
            me.listar();
      }
      }
    },
    editItem(item) {
    
      this.key = item.key;
      this.nombre = item.nombre;
      this.descripcion = item.descripcion;
      this.estado = item.estado;
      this.dialog = true;
      this.editedIndex = 1;
      this.tipoAccion = 2;
            
    },
   
    activarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.nombre;
      this.key = item.key;
      if (accion == true) {
        this.estado = true;
      } else if (accion == false) {
        this.estado = false;
      } else {
        this.adModal = 0;
      }
    },
    activarDesactivarCerrar() {
      this.adModal = 0;
    },
    activar() {
      let me = this;
      console.log(me.estado+"activo");
      let header={headers:{"x-token":this.$store.state.token}} 
      if (me.estado == true) {
           db.collection('areas').doc(me.key)
           .update({estado : true})
           .then(function () {
          me.adModal = 0;
          me.estado = true;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
      }      
    },
    desactivar() {
      let me = this;
      console.log(me.estado+"desactivar");
      console.log(me.key+"desactivar");
      let header={headers:{"x-token":this.$store.state.token}} 
      if (me.estado == false) {
           db.collection('areas').doc(me.key)
           .update({estado : false})
           .then(function () {
          me.adModal = 0;
          me.estado = true;
          me.adAccion = 0;
          me.adNombre = "";
          me.adId = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
      }  
    },
    close() {
      this.dialog = false;
      this.tipoAccion = 1;
      this.limpiar();
    },
  },
};
</script>