<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-toolbar dark color="#EFA94A">
                    <v-toolbar-title>
                        Acceso al Sistema
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field v-model="email" autofocus color="accent" label="Email" required>
                    </v-text-field>
                    <v-text-field v-model="password" type="password" color="accent" label="Password" required>
                    </v-text-field>
                    <v-flex class="red--text" v-if="errorM">
                        {{errorM}}
                    </v-flex>
                </v-card-text>
                 <v-card-actions  class="px-3 pb-3">
                    <v-flex text-xs-right >
                    
                        <v-btn  @click="inicioSesion()" color="primary"   >Ingresar</v-btn>
                        </v-flex>
                         <v-flex text-xs-right >
                         <v-dialog v-model="dialog" max-width="500px">
                   
          <template v-slot:activator="{ on }">
         <v-btn color="primary" v-on="on" >Crear Usuario</v-btn>
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
                    <v-text-field v-model="emailAdd" label="Email"> </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      type="password"
                      v-model="passwordAdd"
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
              <v-btn color="primary" flat @click="guardar">Guardar</v-btn>
            
            </v-card-actions>
          </v-card>
        </v-dialog>
                    </v-flex>
                  
                </v-card-actions>
                
               
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import Swal from "sweetalert2";
import "firebase/app";
import "firebase/auth";
import firebase from "firebase/app";
import Area from './area'
import { db } from '../Db';

export default {
  data: () => ({
    step: 1,
    show1: false,
    show2: false,
    userLogin: {},
      validaMensaje: [],
    email: "",
    password: "",
    estadologin: 0,
    confirmPassword: "",
     roles: ["VISITANTE_ROL"],
    documentos: ["CC", "TI", "RUP", "PASAPORTE", "CE"],
     _id: "",
      nombre: "",
      rol: "",
    numdocumento: "",
      direccion: "",
      telefono: "",
      emailAdd: "",
    passwordAdd: "",
      estado: true,
      
      
    rules: {
      required: (value) => !!value || "Requerido.",
      email: [
        (v) => (v || "").match(/@/) || "Por favor ingrese el e-mail de cuenta",
      ],
    },
  }),

  methods: {
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
      if (this.emailAdd.length < 1 || this.emailAdd.length > 50) {
        this.validaMensaje.push(
          "El email del usuario debe tener entre 1-50 caracteres."
        );
      }
       var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if (!EMAIL_REGEXP.test(this.emailAdd)) {
        this.validaMensaje.push(
          "La dirección de email " + this.emailAdd + " está incompleta",
        )}

      if (this.editedIndex <= -1) {
        if (this.passwordAdd.length < 1 || this.passwordAdd.length > 64) {
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
      if (this.validar()) {
        return;
      }
       
    if(this.nombre.value != '' && this.emailAdd.value != ""){
        const persona = {
              rol: this.rol,
              nombre: this.nombre,
              tipodocumento: this.tipodocumento,
              numdocumento: this.numdocumento,
              direccion: this.direccion,
              telefono: this.telefono,
              email: this.emailAdd,
              password: this.passwordAdd,
              estado: this.estado,
        }
         this.$store.dispatch("addUsuario", persona); 
            me.close();
             Swal.fire(
              "¡Felicitaciones!",
              "Usuario creado correctamente",
              "success");
           
      }
      
    },
    close() {
      this.dialog = false;
      this.limpiar();
    },
     limpiar() {
      this._id = "";
      this.nombre = "";
      this.numdocumento = "";
      this.direccion = "";
      this.telefono = "";
      this.emailAdd = "";
      this.passwordAdd = "";
      this.valida = 0;
      this.validaMensaje = [];
      this.editedIndex = -1;
    },
  async inicioSesion() {
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if (!EMAIL_REGEXP.test(this.email)) {
        Swal.fire(
          "¡Atención!",
          "La dirección de email " + this.email + " está incompleta",
          "info"
        );
      } else if (this.email == null) {
        Swal.fire("¡Atención!", "Digite el correo por favor", "info");
      } else if (this.password == null) {
        Swal.fire("¡Atención!", "Digite la contraseña por favor", "info");
      } else {
    await  db.collection("usuarios")
    .where('email', "==",this.email)
    .where('password', "==", this.password)
    .where('estado', "==", true).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data.length+" cadena");
        this.estadologin = doc.data.length;
          if(doc.data.length>=1){
             this.$store.dispatch("guardarInicio",doc.data());
             this.$router.push("/");
          }else{
            Swal.fire("¡Atención!", "El usuario esta inactivo consulte con el Administrador del sistema", "info");
          }   
      }
      );  
  }
   
  );
    if(this.estadologin==0){
            Swal.fire("¡Atención!", "El usuario esta inactivo consulte con el Administrador del sistema", "info")
      }
         }                                  

    ;},
    resetForm() {
      this.$refs.form.reset();
    },
  },

  props: {
    source: String,
  },
  components: {
    Area
  }
};
</script>

