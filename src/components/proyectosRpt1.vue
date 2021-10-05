<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Reportes Proyectos Areas</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
         <v-select
                            :items="areas"
                              label="Seleccione Area"
                              v-model="area"
                              class="text-xs-center"
                              hide-details
                              @change="filtrar(item)"
        ></v-select>
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
        <v-dialog v-model="dialog" max-width="1000px">
      
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
                          label="Código del proyecto" 
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="6"
                      >
                        <v-select
                         :items="areas"
                          label="Área"
                          v-model="area"
                        ></v-select>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="12"
                      >
                        <v-text-field 
                          v-model="nombre" 
                          label="Nombre del proyecto" 
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="7"
                      >
                        <v-text-field
                          v-model="nombreF"
                          label="Nombre de autores "
                          clearable
                        >
                        </v-text-field>
                        
                      </v-col>
                      <v-col
                      cols="12"
                      sm="5"
                      >  
                        <v-text-field
                          v-model="telefonoFormulo"
                          prepend-icon="mdi-phone"
                          label="Teléfono de autores"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="7"
                      >  
                        <v-text-field
                          v-model="nombreE"
                          label="Nombre ejecutor "
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="5"
                      >  
                        <v-text-field
                          v-model="telefonoEjecutor"
                          prepend-icon="mdi-phone"
                          label="Teléfono del ejecutor"
                          clearable
                        >
                        </v-text-field>
                      </v-col>   
                      <v-col
                      cols="12"
                      sm="7"
                      >  
                        <v-text-field
                          v-model="nombreC"
                          label="Nombre de Cuentadante"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="5"
                      >  
                        <v-text-field
                          v-model="telefonoCuentadante"
                          prepend-icon="mdi-phone"
                          label="Teléfono del cuentadante"
                          clearable
                        >
                        </v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="12"
                      >  
                        <v-textarea
                          outlined
                          v-model="objetivosG"
                          label="Objetivo General"
                          counter="255"
                          clearable
                        ></v-textarea>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="6"
                      >  
                        <v-textarea
                          outlined
                          v-model="objetivoE1"
                          label="Objetivo Específico 1"
                          counter="400"
                          clearable
                        ></v-textarea>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="6"
                      >  
                        <v-textarea
                          outlined
                          v-model="objetivoE2"
                          label="Objetivo Específico 2"
                          counter="400"
                          clearable
                        ></v-textarea>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="6"
                      >  
                        <v-textarea
                          outlined
                          v-model="objetivoE3"
                          label="Objetivo Específico 3"
                          counter="400"
                          clearable
                        ></v-textarea>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="6"
                      >  
                        <v-textarea
                          outlined
                          v-model="objetivoE4"
                          label="Objetivo Específico 4"
                          counter="400"
                          clearable
                        ></v-textarea>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="12"
                      >  
                        <v-textarea
                          outlined
                          v-model="productoEs"
                          label="Producto esperado"
                          counter="1000"
                          clearable
                        ></v-textarea>
                      </v-col>    
                    <v-col
                     cols="12"
                     sm="4"
                    >
                      <div class="form-group">
                        <label class="negrita">Areas</label>
                        <v-flex xs12 sm6>
                          <input
                            type="date"
                            class="form-control"
                            v-model="fechaForm"
                            pattern="\d{4}-\d{2}-\d{2}"
                          />
                        </v-flex>
                      </div> 
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                    >
                      <div class="form-group">
                        <label class="negrita">Fecha de cierre</label>
                        <v-flex xs12 sm6>
                          <input
                            type="date"
                            class="form-control"
                            v-model="fechaCie"
                            pattern="\d{4}-\d{2}-\d{2}"
                          />
                        </v-flex>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                    >
                      <div class="form-group">
                        <label class="negrita">Fecha de ejecución</label>
                        <v-flex xs12 sm6>
                          <input
                            type="date"
                            class="form-control"
                            v-model="fechaEje"
                            pattern="\d{4}-\d{2}-\d{2}"
                          />
                        </v-flex>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                    >  
                      <v-text-field
                          v-model="valorSol"
                          label="Valor solicitado"
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
                        v-model="valorAsig"
                        label="Valor Asignado"
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
                        v-model="valorEje"
                        label="Valor ejecutado"
                        prefix="$"
                        clearable
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >   
                    <strong><label>Documentos de proyecto (Verifique que esten todos los archivos en un PDF)</label></strong><br />
                    <input
                      type="file"
                      accept="application/pdf"
                      :src="documentoPDF"
                      @change="clickDocumentoPDF($event)"
                    />
                  
                      <v-btn   
                        @click="subir_documentos()"
                        color="primary"
                        flat
                        >Cargar PDF</v-btn
                      > 
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >   
                      <strong><label>Documentos de proyecto (Verifique que esten todos los archivos en un excel)</label></strong><br />
                      <input
                        type="file"
                        accept="application/vnd.ms-excel.csv,.xlsx,.xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        :src="documentoExcel"
                        @change="clickDocumentoExcel($event)"
                      />
                        <v-btn
                          @click="subir_documentoExcel()"
                          color="primary"
                          flat
                          >Cargar excel
                        </v-btn> 
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    > 
                    <strong><label>Imagenes de proyecto (Verifique que esten todos los archivos de imagen)</label></strong><br />
                    <input
                      type="file"
                      accept="image/*"
                      :src="img1"
                      @change="clickImg1($event)"
                    />
                   
                    <input
                      type="file"
                      accept="image/*"
                      :src="img2"
                      @change="clickImg2($event)"
                    />
                   
                    <input
                      type="file"
                      accept="image/*"
                      :src="img3"
                      @change="clickImg3($event)"
                    />
                   
                    <input
                      type="file"
                      accept="image/*"
                      :src="img4"
                      @change="clickImg4($event)"
                    />
                    
                      <v-btn
                      @click="subir_img()"
                        color="primary"
                        flat
                        >Cargar imagen</v-btn
                    > 
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
        <v-dialog v-model="modalImg" max-width="700px">
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  
                  <v-flex xs12 sm12 md12>
                      
                      <v-carousel hide-delimiters >
                        <v-app-bar
                        flat
                        color="rgba(0, 0, 0, 0)"
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
                        ></v-carousel-item>
                      </v-carousel> 
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
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
        :items="proyectos"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:[`item.opciones`]="{ item }" v-if="esAdministrador|| esEditor">
        
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
      proyectos: [],
      categorys: "holaa",
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Código", value: "codigo", sortable: true },
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "Área", value: "area", sortable: false },
        { text: "Nombre formulo", value: "nombreF", sortable: true },
        // { text: "Teléfono", value: "telefonoFormulo", sortable: false },
        { text: "Nombre ejecutor", value: "nombreE", sortable: true },
        // { text: "Teléfono", value: "telefonoEjecutor", sortable: false },
        { text: "Nombre cuentadante", value: "nombreC", sortable: true },
        // { text: "Teléfono", value: "telefonoCuentadante", sortable: false },
        // { text: "Objetivo general", value: "objetivosG", sortable: true },
        // { text: "Objetivo Específico 1 ",value: "objetivoE1",sortable: false},
        // { text: "Objetivo Específico 2 ", value: "objetivoE2", sortable: true },
        // { text: "Objetivo Específico 3 ",value: "objetivoE3",sortable: false},
        // { text: "Objetivo Específico 4 ", value: "objetivoE4", sortable: true },
        // { text: "Producto esperado", value: "productoEs", sortable: true },
        { text: "Fecha formulación ", value: "fechaForm", sortable: false },
        // { text: "Fecha de cierre ", value: "fechaCie", sortable: false },
        { text: "Fecha ejecución", value: "fechaEje", sortable: true },
        // { text: "Valor solicitado", value: "valorSol", sortable: false },
        { text: "Valor asignado", value: "valorAsig", sortable: true },
        // { text: "Valor ejecutado", value: "valorEje", sortable: false },
      ],
      editedIndex: -1,
      key: "",
      nombre: "",
      codigo: "",
      codigos: [],
      area: "",
      areas: [],
      nombreF: "",
      nombreE: "",
      nombreC: "",
      telefonoFormulo: "",
      telefonoEjecutor: "",
      telefonoCuentadante: "",
      objetivosG: "",
      objetivoE1: "",
      objetivoE2: "",
      objetivoE3: "",
      objetivoE4: "",
      productoEs: "",
      fechaForm: "",
      fechaEje: "",
      fechaCie: "",
      valorAsig: "",
      valorEje: "",
      valorSol: "",
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
        .collection("proyectos")
        .onSnapshot((snapshotChange) => {
          this.proyectos = [];
          snapshotChange.forEach((doc) => {
            this.proyectos.push({
              key: doc.id,
              nombre: doc.data().nombre,
              area: doc.data().area,
              nombreF: doc.data().nombreF,
              codigo: doc.data().codigo,
              telefonoFormulo: doc.data().telefonoFormulo,
              nombreE: doc.data().nombreE,
              telefonoEjecutor: doc.data().telefonoEjecutor,
              nombreC: doc.data().nombreC,
              telefonoCuentadante: doc.data().telefonoCuentadante,
              objetivosG: doc.data().objetivosG,
              objetivoE1: doc.data().objetivoE1,
              objetivoE2: doc.data().objetivoE2,
              objetivoE3: doc.data().objetivoE3,
              objetivoE4: doc.data().objetivoE4,
              productoEs: doc.data().productoEs,
              fechaForm: doc.data().fechaForm,
              fechaEje: doc.data().fechaEje,
              fechaCie: doc.data().fechaCie,
              valorSol: doc.data().valorSol,
              valorAsig: doc.data().valorAsig,
              valorEje: doc.data().valorEje,
            });
            console.log(doc.data());
          });
        });
        firebase.firestore().collection('areas').onSnapshot((snapshotChange) => {
        this.areas = []
        snapshotChange.forEach(doc => {
          this.areas.push(
                        
                        doc.data().nombre,
          )          
          console.log(doc.data())
        })
      });
      firebase.firestore().collection('proyectos').onSnapshot((snapshotChange) => {
        this.codigos = []
        snapshotChange.forEach(doc => {
          this.codigos.push(

                        doc.data().codigo,

          )          
          console.log(doc.data())
        })
      })

    },
    limpiar() {
      this.key = "";
      this.nombre = "";
      this.codigo = "";
      this.area = "",
      this.nombreF = "",
      this.telefonoFormulo = "",
      this.nombreE = "",
      this.telefonoEjecutor = "",
      this.nombreC = "",
      this.telefonoCuentadante = "",
      this.objetivosG = "",
      this.objetivosG = "",
      this.objetivoE1 = "",
      this.objetivoE2 = "",
      this.objetivoE3 = "",
      this.objetivoE4 = "",
      this.productoEs = "",
      this.productoEs = "",
      this.fechaForm = "",
      this.fechaEje = "",
      this.fechaCie = "",
      this.valorSol = "",
      this.valorAsig = "",
      this.valorEje = "",
      this.valida = 0;
      this.validaMensaje = [];
      this.imagenes = [];
      this.editedIndex = -1;
      this.img1 = null;
      this.img2 = null;
      this.img3 = null;
      this.img4 = null;

      this.documentoPDF = null;
      this.documentoExcel = null;
      
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
      if (this.nombreF.length < 1 || this.nombreF.length > 150) {
        this.validaMensaje.push(
          "El nombre del autor debe tener entre 1-150 caracteres."
        );
      }
      if (this.nombreE.length < 1 || this.nombreE.length > 50) {
        this.validaMensaje.push(
          "El nombre del ejecutor debe tener entre 1-50 caracteres."
        );
      }
      if (this.nombreC.length < 1 || this.nombreC.length > 50) {
        this.validaMensaje.push(
          "El nombre del cuentadante debe tener entre 1-50 caracteres."
        );
      }
      if (this.telefonoFormulo.length < 7 || this.telefonoFormulo.length > 22) {
        this.validaMensaje.push(
          "El teléfono del autor debe tener entre 7-22 caracteres."
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
      if (this.objetivosG.length > 255) {
        this.validaMensaje.push(
          "El objetivo general no debe tener más de 255 caracteres."
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
      if (this.productoEs.length > 1000) {
        this.validaMensaje.push(
          "El producto esperado, no debe tener más de 1000 caracteres."
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
      if (this.fechaEje < this.fechaForm) {
        this.validaMensaje.push(
          "La fecha de ejecución no puede ser mayor a la fecha de inicio."
        );
      }
      // if (this.img1 == null || this.img2 == null || this.img3 == null || this.img4 == null ) {
      //   this.validaMensaje.push(
      //     "Las imagenes del proyecto no se han cargado"
      //   );
      // }
      // if (this.documentoPDF == null && this.tipoAccion != 2 ) {
      //   console.log("actualizar TP2");
      // }
      // else if(this.documentoPDF == null){
      //   console.log("PDF null");
      //   this.validaMensaje.push(
      //     "El documento PDF no ha sido cargado"
      //   );
      // }
      
      // if (this.documentoExcel == null ) {
      //   this.validaMensaje.push(
      //     "El documento Excel no ha sido cargado"
      //   );
      // }
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
      console.log("proyectos key " + me.key);
      console.log("control1");
      if (this.editedIndex > -1) {
        console.log("proyectos key " + me.key);
        db.collection("proyectos")
          .doc(me.key)
          .update({
            nombre: me.nombre,
            codigo: me.codigo,
            area: me.area,
            nombreF: me.nombreF,
            telefonoFormulo: me.telefonoFormulo,
            nombreE: me.nombreE,
            telefonoEjecutor: me.telefonoEjecutor,
            nombreC: me.nombreC,
            telefonoCuentadante: me.telefonoCuentadante,
            objetivosG: me.objetivosG,
            objetivoE1: me.objetivoE1,
            objetivoE2: me.objetivoE2,
            objetivoE3: me.objetivoE3,
            objetivoE4: me.objetivoE4,
            productoEs: me.productoEs,
            fechaForm: me.fechaForm,
            fechaEje: me.fechaEje,
            fechaCie: me.fechaCie,
            valorSol: me.valorSol,
            valorAsig: me.valorAsig,
            valorEje: me.valorEje,

          })
          .then(function(response) {
            me.limpiar();
            me.close();
            me.listar();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        if (this.nombre.value != '' && this.area.value != "") {
          const proyecto = {
            nombre: this.nombre,
            area: this.area,
            nombreF: this.nombreF,
            codigo: this.codigo,
            telefonoFormulo: this.telefonoFormulo,
            nombreE: this.nombreE,
            telefonoEjecutor: this.telefonoEjecutor,
            nombreC: this.nombreC,
            telefonoCuentadante: this.telefonoCuentadante,
            objetivosG: this.objetivosG,
            objetivoE1: this.objetivoE1,
            objetivoE2: this.objetivoE2,
            objetivoE3: this.objetivoE3,
            objetivoE4: this.objetivoE4,
            productoEs: this.productoEs,
            fechaForm: this.fechaForm,
            fechaEje: this.fechaEje,
            fechaCie: this.fechaCie,
            valorSol: this.valorSol,
            valorAsig: this.valorAsig,
            valorEje: this.valorEje,

          };
          this.$store.dispatch("addProyecto", proyecto);
          me.limpiar();
          me.close();
          me.listar();
        }
      }
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
    },
    clickImg2(e) {
        this.img2 = e.target.files[0];
        console.log(this.img2); 
    },
    clickImg3(e) {
        this.img3 = e.target.files[0];
        console.log(this.img3);
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

   
    activarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.nombre;
      this.key = item.key;
      if (accion == false) {
        this.estado = false;
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

    createPDF(item) {
      let me = this;
      me.key = item.key;
      me.codigo = item.codigo;

      var docRef = db.collection("proyectos").doc(me.key);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
              var columns = [
            
              { title: "Nombre", dataKey: "nombre" },
              { title: "Descripción", dataKey: "descripcion" },
                
            ];

              var rows = [
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
               //const logo = require("../assets/logo2.jpg");
              var doc = new jsPDF("p","pt");
               ref.child('/imagenes'+ "/" + me.codigo)
              .listAll()
              .then( (res) =>{
                console.log(res)
                res.items.map( (item) =>{
                  ref.child(item.fullPath)
                  .getDownloadURL()
                  .then((url) =>{
                     me.fotoPDF.push(url)
                     me.logo = url;
                  })
                })
              })
              doc.autoTable(columns, rows, {
                margin: { top: 100 },
                didDrawPage: function () {
                  // doc.text("PROYECTO", 265, 30);
                  doc.text("INFORMACIÓN DEL PROYECTO", 200, 60);
                   var imgLogo = new Image();
                   imgLogo.src = me.logo;
                   doc.addImage(imgLogo,'JPEG', 15, 40,148,210);
                },
              });

              doc.save(me.codigo + "-Reporte.pdf");
          }  
        })
    },
    
    limpiarModalImg() {
      this.codigo = "";
      this.img1 = null;
      this.img2 = null;
      this.img3 = null;
      this.img4 = null;
      this.imagenes = [];
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

    },

    filtrar(area) {
    db.collection("proyectos")
    .where('area', "==",this.area).get().then((querySnapshot) => {
       this.proyectos = [];
      querySnapshot.forEach((doc) => {
          this.proyectos.push({
              key: doc.id,
              nombre: doc.data().nombre,
              area: doc.data().area,
              nombreF: doc.data().nombreF,
              codigo: doc.data().codigo,
              telefonoFormulo: doc.data().telefonoFormulo,
              nombreE: doc.data().nombreE,
              telefonoEjecutor: doc.data().telefonoEjecutor,
              nombreC: doc.data().nombreC,
              telefonoCuentadante: doc.data().telefonoCuentadante,
              objetivosG: doc.data().objetivosG,
              objetivoE1: doc.data().objetivoE1,
              objetivoE2: doc.data().objetivoE2,
              objetivoE3: doc.data().objetivoE3,
              objetivoE4: doc.data().objetivoE4,
              productoEs: doc.data().productoEs,
              fechaForm: doc.data().fechaForm,
              fechaEje: doc.data().fechaEje,
              fechaCie: doc.data().fechaCie,
              valorSol: doc.data().valorSol,
              valorAsig: doc.data().valorAsig,
              valorEje: doc.data().valorEje,
            });
      }
      );  
  }
   
  );
   
         } 
     
    
      
     

  
  },
};
</script>

 
