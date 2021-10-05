<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Fichas</v-toolbar-title>
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
        <v-dialog v-model="dialog" max-width="900px">
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
                  <v-flex>
                    <v-row>
                      <v-col
                      cols="12"
                      sm="6"
                      >
                        <v-text-field 
                          v-model="codigo" 
                          label="Código" 
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="6"
                      >
                        <v-select
                         :items="lotes"
                          label="Lote"
                          v-model="lote"
                        ></v-select>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="12"
                      >
                        <v-text-field 
                          v-model="nombre" 
                          label="Nombre del producto" 
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="12"
                      >
                        <v-text-field
                          v-model="descripcionPro"
                          label="Descripción del producto"
                          clearable
                        >
                        </v-text-field>
                        
                      </v-col>
                      <v-col
                      cols="12"
                      sm="3"
                      >  
                        <v-text-field
                          v-model="unidad"
                          label="Unidad de medida"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="9"
                      >  
                        <v-text-field
                          v-model="presentacion"
                          label="Presentación "
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="12"
                      >  
                         <h3 style="margin-left: 360px">Proyecto</h3>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="3"
                      >  
                        <v-text-field
                          v-model="regular"
                          label="Regular"
                          prefix="$"
                          clearable
                        >
                        </v-text-field>
                      </v-col>   
                      <v-col
                      cols="12"
                      sm="3"
                      >  
                        <v-text-field
                          v-model="ser"
                          label="Ser"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="3"
                      >  
                        <v-text-field
                          v-model="articulacion"
                          label="Articulación"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="3"
                      >  
                        <v-text-field
                          v-model="fic"
                          label="Fic"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="4"
                      >  
                        <v-text-field
                          v-model="desplazados"
                          label="Desplazados"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="4"
                      >  
                        <v-text-field
                          v-model="tecnoparque"
                          label="Tecnoparque"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="4"
                      >  
                        <v-text-field
                          v-model="produccion"
                          label="Producción de centro"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="4"
                      >  
                        <v-text-field
                          v-model="cantSol"
                          label="Cantidad total solicitada"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="4"
                      >  
                        <v-text-field
                          v-model="systec"
                          label="Systec computadores"
                          prefix="$"
                          clearable
                        >
                        </v-text-field>
                      </v-col>    
                      <v-col
                      cols="12"
                      sm="4"
                      >  
                        <v-text-field
                          v-model="comred"
                          label="Comred LTDA"
                          clearable
                          prefix="$"
                        >
                        </v-text-field>
                      </v-col>    
                      <v-col
                      cols="12"
                      sm="4"
                      >  
                        <v-text-field
                          v-model="internet"
                          label="Internet"
                          clearable
                          prefix="$"
                        >
                        </v-text-field>
                      </v-col>    
                      <v-col
                      cols="12"
                      sm="4"
                      >  
                        <v-text-field
                          v-model="gcComp"
                          label="Gcgbussiness y computers"
                          prefix="$"
                          clearable
                        >
                        </v-text-field>
                      </v-col>    
                      <v-col
                      cols="12"
                      sm="4"
                      >  
                        <v-text-field
                          v-model="numCot"
                          label="Numero de cotizaciones por item"
                          clearable
                        >
                        </v-text-field>
                      </v-col>    
                      <v-col
                      cols="12"
                      sm="5"
                      >  
                        <v-text-field
                          v-model="valorCot"
                          label="Valor cotizado promedio por item"
                          prefix="$"
                          clearable
                        >
                        </v-text-field>
                      </v-col>    
                      <v-col
                      cols="12"
                      sm="4"
                      >  
                        <v-text-field
                          v-model="dispercion"
                          label="Dispersión de datos"
                          clearable
                        >
                        </v-text-field>
                      </v-col> 
                      <v-col
                      cols="12"
                      sm="3"
                      >  
                        <v-text-field
                          v-model="regular1"
                          label="Regular"
                          prefix="$"
                          clearable
                        >
                        </v-text-field>
                      </v-col>   
                      <v-col
                      cols="12"
                      sm="3"
                      >  
                        <v-text-field
                          v-model="ser1"
                          label="Ser"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="3"
                      >  
                        <v-text-field
                          v-model="articulacion1"
                          label="Articulación"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="3"
                      >  
                        <v-text-field
                          v-model="fic1"
                          label="Fic"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="4"
                      >  
                        <v-text-field
                          v-model="desplazados1"
                          label="Desplazados"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="4"
                      >  
                        <v-text-field
                          v-model="tecnoparque1"
                          label="Tecnoparque"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="4"
                      >  
                        <v-text-field
                          v-model="produccion1"
                          label="Producción de centro"
                          clearable
                        >
                        </v-text-field>
                      </v-col> 
                      <v-col
                      cols="12"
                      sm="4"
                      >  
                        <v-text-field
                          v-model="total"
                          label="Total"
                          prefix="$"
                          clearable
                        >
                        </v-text-field>
                      </v-col>   
                      <v-col
                      cols="12"
                      sm="4"
                      >  
                        <v-text-field
                          v-model="iva"
                          label="IVA"
                          clearable
                        >
                        </v-text-field>
                      </v-col>   
                  </v-row>
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
              <v-btn
                color="primary"
                v-if="tipoAccion == 1"
                flat
                @click="guardar"
                >Guardar</v-btn
              >
              <v-btn
                color="primary"
                v-if="tipoAccion == 2"
                flat
                @click="guardar"
                >Actualizar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- nueva modal fotos -->
        <v-dialog v-model="modalImg" max-width="800px">
          <template>
            <v-carousel>
              <v-app-bar
                flat
                color="white"
              >
                <v-toolbar-title class="title black--text pl-0">
                          Imágenes del proyecto
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  color="black"
                  icon
                  @click="close()"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
              <v-carousel-item
                v-for="img in imagenes"
                :key="img"
                :src="img" 
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
          </template>
        </v-dialog>
        <!-- fin modal fotos  -->
        <v-dialog v-model="adModal" max-width="290">
          <v-card>
            <v-card-title class="headline" v-if="estado == false">
              Eliminar Item
            </v-card-title>
            <v-card-text>
              Estás a punto de <span>eliminar </span> el item
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
                @click="deleteItem()"
                color="primary"
                flat="flat"
              >
                Eliminar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <!-- <datatable :infoTabla="categorias" :headers="headers"/> -->

      <v-data-table
        :headers="headers"
        :items="fichas"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:[`item.opciones`]="{ item }" v-if="esAdministrador|| esEditor">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small class="mr-2" @click="activarDesactivarMostrar(false, item)">
            mdi-delete
          </v-icon>     
        </template>
        <template v-slot:[`item.botones`]="{ item }">
          <v-icon small class="mr-3" @click="mostrarImg(item)">
            mdi-tooltip-image
          </v-icon>
          <v-icon small class="mr-3" @click="downloadPDF(item)">
            mdi-file-pdf
          </v-icon>
          <v-icon small class="mr-3" @click="downloadExcel(item)">
            mdi-file-excel
          </v-icon>  
          <v-icon small class="mr-3" @click="createPDF(item)">
             mdi-arrow-down-bold-circle
          </v-icon>

        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>

</template>

<script>
// import { jsPDF } from "jspdf";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import axios from "axios";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../Db";
import { storage } from "../Db";
import Swal from 'sweetalert2';
  const ref = storage.ref();
export default {
  data() {
    return {
      dialog: false,
      modalImg: false,
      search: "",
      fichas: [],
      imagenes1: [],
      categorys: "holaa",
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Código", value: "codigo", sortable: true },
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "Lote", value: "lote", sortable: false },
        { text: "Unidad", value: "unidad", sortable: true },
        { text: "Teléfono", value: "telefonoFormulo", sortable: false },
        { text: "Nombre ejecutor", value: "presentacion", sortable: true },
        { text: "Teléfono", value: "telefonoEjecutor", sortable: false },
        { text: "Nombre cuentadante", value: "nombreC", sortable: true },
        { text: "Teléfono", value: "telefonoCuentadante", sortable: false },
        { text: "Objetivo general", value: "objetivosG", sortable: true },
        { text: "Objetivo Específico 1 ",value: "objetivoE1",sortable: false},
        { text: "Objetivo Específico 2 ", value: "objetivoE2", sortable: true },
        { text: "Objetivo Específico 3 ",value: "objetivoE3",sortable: false},
        { text: "Objetivo Específico 4 ", value: "objetivoE4", sortable: true },
        { text: "Producto esperado", value: "productoEs", sortable: true },
        { text: "Fecha formulación ", value: "fechaForm", sortable: false },
        { text: "Fecha de cierre ", value: "fechaCie", sortable: false },
        { text: "Fecha ejecución", value: "fechaEje", sortable: true },
        { text: "Valor solicitado", value: "valorSol", sortable: false },
        { text: "Valor asignado", value: "valorAsig", sortable: true },
        { text: "Valor ejecutado", value: "valorEje", sortable: false },
         { text: "Anexos", value: "botones", sortable: false },
      ],
      editedIndex: -1,
      key: "",
      nombre: "",
      codigo: "",
      codigos: [],
      lote: "",
      lotes: [],
      documentoPDF: null,
      pdf : [],
      excel : [],
      documentoExcel: null,
      img1: null,
      img2: null,
      img3: null,
      img4: null,
      imagenes: [],
      imgPre: null,  
      fotoPDF: [],
      tipoAccion: 1,
      valida: 0,
      validaMensaje: [],
      adModal: 0,
      adNombre: "",
      adId: "",
      estado:null,
      logo: null,
      disabled: 0,
      disabled1: 0,
      disabled2:0,

      descripcionPro: "",
      unidad: "",
      presentacion: "",
      regular: "",
      ser: "",
      articulacion: "",
      fic: "",
      desplazados: "",
      tecnoparque: "",
      produccion: "",
      cantSol: "",
      systec: "",
      comRed: "",
      internet: "",
      numCot: "",
      gcComp: "",
      valorCot: "",
      dispercion: "",
      regular1: "",
      ser1: "",
      articulacion1: "",
      fic1: "",
      desplazados1: "",
      tecnoparque1: "",
      produccion1: "",
      total: "",
      iva: "",
     
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";
    },
     logueado(){
        return this.$store.state.usuario;
    },
   esAdministrador(){
     
      return this.$store.state.usuario && this.$store.state.usuario.rol == 'ADMIN_ROL';
    },
    esEditor(){      
      return this.$store.state.usuario && this.$store.state.usuario.rol == 'EDITOR_ROL';
    },
    esVisitante(){
      return this.$store.state.usuario && this.$store.state.usuario.rol == 'VISITANTE_ROL';
    }
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
        firebase.initializeApp(this.firebaseConfig);
      }
      firebase
        .firestore()
        .collection("fichas")
        .onSnapshot((snapshotChange) => {
          this.fichas = [];
          snapshotChange.forEach((doc) => {
            this.fichas.push({
              key: doc.id,
              nombre: doc.data().nombre,
              lote: doc.data().lote,
              descripcionPro: doc.data().descripcionPro,
              codigo: doc.data().codigo,
              unidad: doc.data().unidad,
              presentacion: doc.data().presentacion,
              regular:doc.data().regular,
            });
            console.log(doc.data());
          });
        });
        firebase.firestore().collection('lotes').onSnapshot((snapshotChange) => {
          this.lotes = []
          snapshotChange.forEach(doc => {
            this.lotes.push(
                          
                          doc.data().nombre,
            )          
            console.log(doc.data())
          })
        });
    },
    limpiar() {
      this.key = "";
      this.nombre = "";
      this.codigo = "";
      this.lote = "";
      this.descripcionPro = "";
      this.unidad = "";
      this.presentacion = "";
      this.regular = "";
      
    },
    validar() {
      console.log("valido");
      this.valida = 0;
      this.validaMensaje = [];
      if (this.nombre.length < 1 || this.nombre.length > 255) {
        this.validaMensaje.push(
          "El nombre del proyecto debe tener entre 1-255 caracteres."
        );
      }
      if (this.codigo.length < 1 || this.codigo.length > 15) {
        this.validaMensaje.push(
          "El código del proyecto debe tener entre 1-15 caracteres."
        );
      }
      else{
        this.codigos.forEach(value => {
        console.log(value["codigo"])
        console.log(this.codigo + "codigo file")
        if (value === this.codigo && this.tipoAccion != 2) {
            this.validaMensaje.push(
            "El codigo del proyecto ya existe."
            )
        }
        })
      }
      if (this.descripcionPro.length < 1 || this.descripcionPro.length > 180) {
        this.validaMensaje.push(
          "El nombre del autor debe tener entre 1-180 caracteres."
        );
      }
      if (this.presentacion.length < 1 || this.presentacion.length > 150) {
        this.validaMensaje.push(
          "El nombre del ejecutor debe tener entre 1-150 caracteres."
        );
      }
      if (this.nombreC.length < 1 || this.nombreC.length > 180) {
        this.validaMensaje.push(
          "El nombre del cuentadante debe tener entre 1-180 caracteres."
        );
      }
      if (this.unidad.length < 7 || this.unidad.length > 22) {
        this.validaMensaje.push(
          "El teléfono del autor debe tener entre 7-24 caracteres."
        );
      }
      if (this.telefonoEjecutor.length < 7 || this.telefonoEjecutor.length > 10) {
        this.validaMensaje.push(
          "El teléfono del ejecutor debe tener entre 7-10 caracteres."
        );
      }
      if (this.telefonoCuentadante.length < 7 || this.telefonoCuentadante.length > 10) {
        this.validaMensaje.push(
          "El teléfono del cuentadante debe tener entre 7-10 caracteres."
        );
      }
      if (this.objetivosG.length > 400) {
        this.validaMensaje.push(
          "El objetivo general no debe tener más de 400 caracteres."
        );
      }
      if (this.objetivoE1.length > 400) {
        
        this.validaMensaje.push(
          "El objetivo especifico 1, no debe tener más de 400 caracteres."
        );
      }
      if (this.objetivoE2.length > 400) {
        this.validaMensaje.push(
          "El objetivo especifico 2, no debe tener más de 400 caracteres."
        );
      }
      if (this.objetivoE3.length > 400) {
        this.validaMensaje.push(
          "El objetivo especifico 3, no debe tener más de 400 caracteres."
        );
      }
      if (this.objetivoE4.length > 400) {
        this.validaMensaje.push(
          "El objetivo especifico 4, no debe tener más de 400 caracteres."
        );
      }
      if (this.productoEs.length > 1500) {
        this.validaMensaje.push(
          "El producto esperado, no debe tener más de 1500 caracteres."
        );
      }
      if (this.valorAsig.length < 1) {
        this.validaMensaje.push(
          "El valor asignado es requerido."
        );
      }
      if (this.valorEje.length < 1) {
        this.validaMensaje.push(
          "El valor ejecutado es requerido."
        );
      }
      if (this.valorSol.length < 1) {
        this.validaMensaje.push(
          "El valor solicitado es requerido."
        );
      }
      if (this.fechaForm.length < 1) {
        this.validaMensaje.push(
          "La fecha de formulación es requerida."
        );
      }
      if (this.fechaCie.length < 1) {
        this.validaMensaje.push(
          "La fecha de cierre es requerida."
        );
      }
      if (this.fechaEje.length < 1) {
        this.validaMensaje.push(
          "La fecha de ejecución es requerida."
        );
      }
      if (this.fechaCie < this.fechaForm) {
        this.validaMensaje.push(
          "La fecha de Cierre no puede ser mayor a la fecha de inicio."
        );
      }
      if (this.fechaEje < this.fechaForm && this.fechaEje > this.fechaCie) {
        this.validaMensaje.push(
          "La fecha de ejecución no valida."
        );
      }
      if (this.fechaCie < this.fechaEje) {
        this.validaMensaje.push(
          "La fecha de cierre no puede ser menor a la fecha de ejecución."
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
      console.log("control1");
      if (this.editedIndex > -1) {
        db.collection("fichas")
          .doc(me.key)
          .update({
            nombre: me.nombre,
            codigo: me.codigo,
            lote: me.lote,
            descripcionPro: me.descripcionPro,
            unidad: me.unidad,
            presentacion: me.presentacion,
            regular: me.regular,

          })
          .then(function(response) {
            me.limpiar();
            me.close();
            me.listar();
            me.resetImage ();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        if (this.nombre.value != '' && this.lote.value != "") {
          const proyecto = {
            nombre: this.nombre,
            lote: this.lote,
            descripcionPro: this.descripcionPro,
            codigo: this.codigo,
            unidad: this.unidad,
            presentacion: this.presentacion,
            regular: this.regular,

          };
          this.$store.dispatch("addFichas", proyecto);
          me.limpiar();
          me.close();
          me.listar();
          me.resetImage ();
        }
      }
    },
    editItem(item) {
      this.key = item.key;
      this.nombre = item.nombre;
      this.codigo = item.codigo;
      this.lote = item.lote;
      this.descripcionPro = item.descripcionPro;
      this.unidad = item.unidad;
      this.presentacion = item.presentacion;
      this.regular = item.regular;
      
    },
    deleteItem() {
      let me = this;
        db.collection("fichas")
          .doc(this.key)
          .delete()

          .then(function(response) {

            me.limpiar();
            me.close();

          })
          .catch(function(error) {
            console.log(error);
          });      
    },
    clickDocumentoPDF(e) {
      this.documentoPDF = e.target.files[0];
      console.log(this.documentoPDF);
    },
    clickDocumentoExcel(e) {
      this.documentoExcel = e.target.files[0];
      console.log(this.documentoExcel);
    },
    clickImg1(e) {
        this.img1 = e.target.files[0];
        console.log(this.img1);
        this.disabled = 1;
    },
    clickImg2(e) {
        this.img2 = e.target.files[0];
        console.log(this.img2); 
        this.disabled1 = 1;
    },
    clickImg3(e) {
        this.img3 = e.target.files[0];
        console.log(this.img3);
        this.disabled2 = 1;
    },
    clickImg4(e) {
        this.img4 = e.target.files[0];
        console.log(this.img4); 
    },
    subir_documentos(){
      let me = this;
     if (this.documentoPDF == null) {
        Swal.fire("¡Atención!", "No ha guardado los documentos del proyecto", "info");
        console.log(this.documentoPDF);
      } 
      
      else{
      
      console.log(this.documentoPDF.name +"documento else");

      const refDoc3 = ref.child("documentos/" + me.codigo + "/" + me.codigo + "documentoPDF" +'.pdf');
      console.log(this.documentoPDF.name);
      const metadata7 = { contentType: "application/pdf" };
      refDoc3.put(this.documentoPDF, metadata7).then((e) => console.log(e));

       Swal.fire(
              "¡Felicitaciones!",
              "Ha guardado los documentos correctamente",
              "success"
            );
      }
    },
    subir_documentoExcel(){
      let me = this;
     if (this.documentoExcel == null) {
        Swal.fire("¡Atención!", "No ha guardado los documentos del proyecto", "info");
        console.log(this.documentoExcel);
      } 
      
      else{
      
      console.log(this.documentoExcel.name +"documento else");

      const refDoc3 = ref.child("documentosExcel/" + me.codigo + "/" + me.codigo + "documentoExcel" +'.xlsx');
      console.log(this.documentoExcel.name);
      const metadata7 = { contentType: "application/xlsx" };
      refDoc3.put(this.documentoExcel, metadata7).then((e) => console.log(e));

       Swal.fire(
              "¡Felicitaciones!",
              "Ha guardado los documentos correctamente",
              "success"
            );
      }
    },

    subir_img(){
      let me = this;
      console.log(me.codigo+ " img codigo")
      if (this.img1 == null) {
         Swal.fire({
            title: 'Por favor Cargar por lo menos una imagen (imagen 1)',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
      }
      else 
      {
          if (this.img2 == null && this.img3 == null && this.img4 == null)
          {
            const refImg3 = ref.child("imagenes/" + me.codigo + "/" + me.codigo + "img1" +'.jpg');
            const metadata7 = { contentType: "image/jpg" };
            refImg3.put(this.img1,metadata7).then((e) => console.log(e));

              Swal.fire(
                  "¡Felicitaciones!",
                  "Ha guardado las imagenes correctamente",
                  "success"
                );
          }
          else
          {
            if (this.img3 == null && this.img4 == null) 
            {
                const refImg3 = ref.child("imagenes/" + me.codigo + "/" + me.codigo + "img1" +'.jpg');
                const refImg4 = ref.child("imagenes/" + me.codigo + "/" + me.codigo + "img2" +'.jpg');
                const metadata7 = { contentType: "image/jpg" };
                refImg3.put(this.img1,metadata7).then((e) => console.log(e));
                refImg4.put(this.img2,metadata7).then((e) => console.log(e));

                  Swal.fire(
                      "¡Felicitaciones!",
                      "Ha guardado las imagenes correctamente",
                      "success"
                    );
            }
            else
            {
              if (this.img4 == null) 
              {
                const refImg3 = ref.child("imagenes/" + me.codigo + "/" + me.codigo + "img1" +'.jpg');
                const refImg4 = ref.child("imagenes/" + me.codigo + "/" + me.codigo + "img2" +'.jpg');
                const refImg5 = ref.child("imagenes/" + me.codigo + "/" + me.codigo + "img3" +'.jpg');
                const metadata7 = { contentType: "image/jpg" };
                refImg3.put(this.img1,metadata7).then((e) => console.log(e));
                refImg4.put(this.img2,metadata7).then((e) => console.log(e));
                refImg5.put(this.img3,metadata7).then((e) => console.log(e));

                  Swal.fire(
                      "¡Felicitaciones!",
                      "Ha guardado las imagenes correctamente",
                      "success"
                    );
              }
              else
              {
                  const refImg3 = ref.child("imagenes/" + me.codigo + "/" + me.codigo + "img1" +'.jpg');
                  const refImg4 = ref.child("imagenes/" + me.codigo + "/" + me.codigo + "img2" +'.jpg');
                  const refImg5 = ref.child("imagenes/" + me.codigo + "/" + me.codigo + "img3" +'.jpg');
                  const refImg6 = ref.child("imagenes/" + me.codigo + "/" + me.codigo + "img4" +'.jpg');
                  console.log(this.img1.name);

                  const metadata7 = { contentType: "image/jpg" };
                
                  refImg3.put(this.img1,metadata7).then((e) => console.log(e));
                  refImg4.put(this.img2,metadata7).then((e) => console.log(e));
                  refImg5.put(this.img3,metadata7).then((e) => console.log(e));
                  refImg6.put(this.img4,metadata7).then((e) => console.log(e));

                   Swal.fire(
                          "¡Felicitaciones!",
                          "Ha guardado las imagenes correctamente",
                          "success"
                        );
              }
            }
          }
      }    
      
    },
     mostrarImg(item) {

     this.limpiarModalImg();
     let me = this;
     me.codigo = item.codigo;
     console.log(me.codigo + " codigo")
     ref.child('/imagenes'+ "/" + me.codigo)
      .listAll()
      .then( (res) =>{
        console.log(res)
        res.items.map( (item) =>{
          ref.child(item.fullPath)
          .getDownloadURL()
          .then((url) =>{
            this.imagenes.push(url)
          })
        })
      })
      this.modalImg = true;
    },
    activarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.nombre;
      this.key = item.key;
      if (accion == false) {
        this.estado = false;
      } 
    },

 
    downloadPDF(item){
      let me = this;
     me.codigo = item.codigo;
     ref.child('/documentos'+ "/" + me.codigo)
      .listAll()
      .then( (res) =>{
        console.log(res)
        res.items.map( (item) =>{
          ref.child(item.fullPath)
          .getDownloadURL()
          .then((url) =>{
            // var fileLink = document.createElement('a');
            //   fileLink.href = url;
            //   fileLink.setAttribute('download','file.pdf');
              // document.body.appendChild(fileLink);
              window.open(url, '_blank');
              fileLink.click();
          })
        })
      })
     
    },
    downloadExcel(item){
      let me = this;
     me.codigo = item.codigo;
     ref.child('/documentosExcel'+ "/" + me.codigo)
      .listAll()
      .then( (res) =>{
        console.log(res)
        res.items.map( (item) =>{
          ref.child(item.fullPath)
          .getDownloadURL()
          .then((url) =>{
            var fileLink = document.createElement('a');
              fileLink.href = url;
              fileLink.setAttribute('download','file.xlsx');
              document.body.appendChild(fileLink);
              fileLink.click();
          })
        })
      })
    },

   async createPDF(item) {
      let me = this;
      me.key = item.key;
      me.codigo = item.codigo;
     var columns = []; var rows = [];
     const result = await  me.mostrarImg1(me.key);
     
      var docRef = db.collection("fichas").doc(me.key);
       docRef
        .get()
        .then((doc) => {
        if (doc.exists) {
               columns = [
            
              { title: "Nombre", dataKey: "nombre" },
              { title: "Descripción", dataKey: "descripcion" },
                
            ];

               rows = [
              {"nombre": "Codigo", "descripcion": doc.data().codigo},
              {"nombre": "Nombre del proyecto", "descripcion": doc.data().nombre},
              {"nombre": "Área", "descripcion": doc.data().area},  
              {"nombre": "Nombre autores", "descripcion": doc.data().nombreF},  
              {"nombre": "Teléfono autores", "descripcion": doc.data().telefonoFormulo},  
              {"nombre": "Nombre ejecutor", "descripcion": doc.data().nombreE},  
              {"nombre": "Teléfono ejecutor", "descripcion": doc.data().telefonoEjecutor},  
              {"nombre": "Nombre cuentadante", "descripcion": doc.data().nombreC},  
              {"nombre": "Teléfono cuentadante", "descripcion": doc.data().telefonoCuentadante},  
              {"nombre": "Objetivo general", "descripcion": doc.data().objetivosG},  
              {"nombre": "Objetivo Específico 1", "descripcion": doc.data().objetivoE1},  
              {"nombre": "Objetivo Específico 2", "descripcion": doc.data().objetivoE2},  
              {"nombre": "Objetivo Específico 3", "descripcion": doc.data().objetivoE3},  
              {"nombre": "Objetivo Específico 4", "descripcion": doc.data().objetivoE4},  
              {"nombre": "Producto esperado", "descripcion": doc.data().productoEs},  
              {"nombre": "Fecha inicio", "descripcion": doc.data().fechaForm},  
              {"nombre": "Fecha de cierre", "descripcion": doc.data().fechaCie},  
              {"nombre": "Fecha ejecución", "descripcion": doc.data().fechaEje},  
              {"nombre": "Valor solicitado", "descripcion": doc.data().valorSol},  
              {"nombre": "Valor asignado", "descripcion": doc.data().valorAsig},  
              {"nombre": "Valor ejecutado", "descripcion": doc.data().valorEje},  
             

            ];
              
          } 
           var pdf = new jsPDF("p","pt");
              pdf.autoTable(columns, rows, {
                margin: { top: 100 },
                didDrawPage: function () {
                  // doc.text("PROYECTO", 265, 30);
                  pdf.text("INFORMACIÓN DEL PROYECTO", 200, 60);
                  const logo = require("../assets/sena.png");
                  var imgLogo = new Image();
                  imgLogo.src = logo;
                  pdf.addImage(logo, "PNG", 500, 30, 50, 50);
                },
              });
                pdf.addPage(); 
                pdf.text("IMÁGENES DEL PROYECTO", 200, 60);
                 
                const img1 =  me.imagenes1[0];
                 var imgPDF1 = new Image();
                 imgPDF1.src = img1;
                 pdf.addImage(imgPDF1, "JPEG", 110, 70, 370, 170);
                 pdf.setFontSize(14);
      
                const img2 =  me.imagenes1[1];
                 var imgPDF2 = new Image();
                 imgPDF2.src = img2;
                 pdf.addImage(imgPDF2, "JPEG", 110, 243, 370, 170);
                 pdf.setFontSize(14);
     
                const img3 =  me.imagenes1[2];
                 var imgPDF3 = new Image();
                 imgPDF3.src = img3;
                 pdf.addImage(imgPDF3, "JPEG", 110, 416, 370, 170);
                 pdf.setFontSize(14);
   
                const img4 =  me.imagenes1[3];
                 var imgPDF4 = new Image();
                 imgPDF4.src = img4;
                 pdf.addImage(imgPDF4, "JPEG", 110, 589, 370, 170);
                 pdf.setFontSize(14);

              pdf.save(me.codigo + "-Reporte.pdf");
              me.limpiarPdfImg()
            
        })
       
    },
  mostrarImg1(item)  {
    return new Promise(resolve => {
      let me = this;
      var docRef = db.collection("fichas").doc(item);
        docRef.get().then((doc) => {
         console.log("existe"+doc.exists);
        if (doc.exists) {
          console.log("item"+item +"codigo fire "+doc.data().codigo);
         ref
            .child('/imagenes'+ "/"+ doc.data().codigo)
            .listAll()
            .then((res) => {
               res.items.map((item) => {
                ref
                  .child(item.fullPath)
                  .getDownloadURL()
                  .then((url) => {
                    console.log(url+"Resultado url");
                     me.imagenes1.push(url);
                     resolve('resolved');
                  })
                   .catch(() => {
                    resolve('rejected');
                   });
              });
            });
        }
        });
    });
  },
    limpiarModalImg() {
      this.codigo = "";
      this.img1 = null;
      this.img2 = null;
      this.img3 = null;
      this.img4 = null;
      this.imagenes = [];
    },
      limpiarPdfImg() {
      this.codigo = "";
      this.imagenes1 = [];
    },
    activarDesactivarCerrar() {
      this.adModal = 0;
    },

    close() {
      this.dialog = false;
      this.modalImg = false;
      this.tipoAccion = 1;
      this.adModal = 0;
      this.limpiar();
      this.limpiarModalImg();
      this.codigo = "";
      this.resetImage ();
      this.disabled= 0;
      this.disabled1= 0;
      this.disabled2= 0;

    },
    resetImage () {
      this.$refs.fileupload1.value=null;
      this.$refs.fileupload2.value=null;
      this.$refs.fileupload3.value=null;
      this.$refs.fileupload4.value=null;
      this.$refs.fileuploadPDF.value=null;
      this.$refs.fileuploadExcel.value=null;
    }, 
  },
};
</script>

 
