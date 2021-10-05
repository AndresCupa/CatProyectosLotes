<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Usuarios</v-toolbar-title>
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
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="nombre" label="Nombre">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-select v-model="rol" :items="roles" label="Rol">
                    </v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-select
                      v-model="tipodocumento"
                      :items="documentos"
                      label="Tipo Documento"
                    >
                    </v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="numdocumento"
                      label="Número Documento"
                    >
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="direccion" label="Dirección">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="telefono" label="Teléfono">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="email" label="Email"> </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      type="password"
                      v-model="password"
                      label="Password"
                    >
                    </v-text-field>
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
      <v-data-table
        :headers="headers"
        :items="usuarios"
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
  name: "usuario",
  data() {
    return {
      dialog: false,
      search: "",
      usuarios: [],
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "Rol", value: "rol", sortable: true },
        { text: "Tipo Documento", value: "tipodocumento", sortable: true },
        { text: "Número Documento", value: "numdocumento", sortable: false },
        { text: "Dirección", value: "direccion", sortable: false },
        { text: "Teléfono", value: "telefono", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Estado", value: "estado", sortable: false },
      ],
      editedIndex: -1,
      _id: "",
      nombre: "",
      rol: "",
      roles: ["ADMIN_ROL", "EDITOR_ROL", "VISITANTE_ROL"],
      tipodocumento: "",
      documentos: ["CC", "TI", "RUP", "PASAPORTE", "CE"],
      numdocumento: "",
      direccion: "",
      telefono: "",
      email: "",
      estado: true,
      password: "",
      valida: 0,
      validaMensaje: [],
      adModal: 0,
      adAccion: 0,
      adNombre: "",
      adId: "",
      tipoAccion: 1,
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
      let me = this;
       if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig)
    }
    firebase.firestore().collection('usuarios').onSnapshot((snapshotChange) => {
        me.usuarios = []
        snapshotChange.forEach(doc => {
          me.usuarios.push({
                        key: doc.id,
                        rol: doc.data().rol,
                        nombre: doc.data().nombre,
                        tipodocumento: doc.data(). tipodocumento,
                        numdocumento: doc.data(). numdocumento,
                        direccion: doc.data(). direccion,
                        telefono: doc.data(). telefono,
                        email: doc.data().  email,
                        estado: doc.data().  estado,
                        password: doc.data().password,
                       
                    })
                });
            })
            
    },
    limpiar() {
      this._id = "";
      this.nombre = "";
      this.numdocumento = "";
      this.direccion = "";
      this.telefono = "";
      this.email = "";
      this.password = "";
      this.valida = 0;
      this.validaMensaje = [];
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (!this.rol) {
        this.validaMensaje.push("Seleccione un rol.");
      }
      if (this.nombre.length < 1 || this.nombre.length > 50) {
        this.validaMensaje.push(
          "El nombre del usuario debe tener entre 1-50 caracteres."
        );
      }
      if (this.numdocumento.length > 20) {
        this.validaMensaje.push(
          "El documento no debe tener más de 20 caracteres."
        );
      }
      if (this.direccion.length > 70) {
        this.validaMensaje.push(
          "La dirección no debe tener más de 70 caracteres."
        );
      }
      if (this.telefono.length > 20) {
        this.validaMensaje.push(
          "El teléfono no debe tener más de 20 caracteres."
        );
      }
      if (this.email.length < 1 || this.email.length > 50) {
        this.validaMensaje.push(
          "El email del usuario debe tener entre 1-50 caracteres."
        );
      }

      if (this.editedIndex <= -1) {
        if (this.password.length < 1 || this.password.length > 64) {
          this.validaMensaje.push(
            "El password del usuario debe tener entre 1-64 caracteres."
          );
        }
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
      if (this.editedIndex > -1) {
           db.collection('usuarios').doc(me.key)
                .update({nombre: me.nombre,rol: me.rol, tipodocumento : me.tipodocumento, numdocumento :me.numdocumento, direccion : me.direccion, telefono : me.telefono, email :me.email, password : me.password,})
          .then(function (response) {
            me.limpiar();
            me.close();
            me.listar();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
     
            
    if(this.nombre.value != '' && this.email.value != ""){
 
        const persona = {
              rol: this.rol,
              nombre: this.nombre,
              tipodocumento: this.tipodocumento,
              numdocumento: this.numdocumento,
              direccion: this.direccion,
              telefono: this.telefono,
              email: this.email,
              password: this.password,
              estado: this.estado,
        }
         this.$store.dispatch("addUsuario", persona); 
            me.limpiar();
            me.close();
            me.listar();
      }
      }
    },
    editItem(item) {
      this.key = item.key;
      this.rol = item.rol;
      this.nombre = item.nombre;
      this.tipodocumento = item.tipodocumento;
      this.numdocumento = item.numdocumento;
      this.direccion = item.direccion;
      this.telefono = item.telefono;
      this.email = item.email;
      this.password = item.password;
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
      if (me.estado == true) {
           db.collection('usuarios').doc(me.key)
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
        if (me.estado == false) {
           db.collection('usuarios').doc(me.key)
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
