<template>
  <v-layout align-start>
    <v-flex>
      <template>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-container>
            <v-toolbar-title>Reportes Proyectos Vigencias</v-toolbar-title>
            <v-divider class="mx-5" inset vertical></v-divider>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="year1"
                      label="Fecha inicial"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="year1"
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="year2"
                      label="Fecha final"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="year2"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col
                cols="12"
                md="3"
              > 
                <v-btn
                  color="primary"
                  class="mr-4"
                  @click="listar()"
                  style="margin-top: 10px"
                >
                  Buscar
                </v-btn>
              </v-col>
              <v-text-field
                style="margin: auto 350px 15px"
                v-model="search"
                append-icon="search"
                label="Búsqueda"
                single-line
                hide-details
              >
              </v-text-field>  
            </v-row>
          </v-container>
     
        </v-form>
      </template>  
      <!-- <datatable :infoTabla="categorias" :headers="headers"/> -->

      <v-data-table
        :headers="headers"
        :items="proyectos"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:[`item.opciones`]="{ item }" v-if="esAdministrador|| esEditor">
        
          <v-icon small class="mr-3" @click="generarPDF(item)">
             mdi-arrow-down-bold-circle
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>   
        </template>
      </v-data-table>
       <template>
          <v-btn color="primary" style="margin: 10px auto" @click="downloadAll()">Descargar todo</v-btn>   
       </template>
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
      imagenes1: [],  
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
      date: null,
      year1: null,
      year2: null,
      menu: null,
      keyS: [],
      menu2: false,
      menu1: false,
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

      if (this.year1 != null && this.year2 == null) {
        Swal.fire({
          icon: 'error',
          title: 'La fecha final es requerida'  
        })
      }  
      if (this.year2 != null && this.year1 == null) {
        Swal.fire({
          icon: 'error',
          title: 'La fecha inicial es requerida'  
        })
      }  
      if (this.year2 < this.year1) {
        Swal.fire({
          icon: 'error',
          title: 'La fecha final no puede ser menor a la fecha inicial'  
        })
      } 
      else 
      {

        var docRef = db.collection("proyectos").where('fechaForm', '>=', this.year1).where('fechaForm', '<=', this.year2)
        docRef.get()
        .then((snapshotChange) => {
          this.proyectos = [];
          this.keyS = [];
          snapshotChange.forEach((doc) => {
              this.keyS.push({
                key:doc.id,
              }
                 
              );
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
          });
        })  
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      }  
      
     
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
      else if (this.img2 == null || this.img3 == null || this.img4 == null) {
          Swal.fire({
          title: 'Solo se ha caragado la imagen 1',
          text: "¿Desea continuar con el proceso?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si'
        }).then((result) => {
          if (result.isConfirmed) { 
            const pre = ref.child("imagenes/" + me.codigo + "/" + me.codigo + "img1" +'.jpg');
            const metadata7 = { contentType: "image/jpg" };
            pre.put(this.img1,metadata7).then((e) => console.log(e));
          }
        })
        
      } 
      else
      {
      
      console.log(this.img1.name +"img else");

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
    async downloadAll(){
      let me = this;
      for (let i = 0; i < me.keyS.length; i++) {
        console.log(me.keyS[i])
        await  me.generarPDF(me.keyS[i]);
            
      }
      console.log("se han descargado los documentos")
    },

    async generarPDF(item) {
        console.log(item + " item")
        let me = this;
        me.key = item.key;
        me.codigo = item.codigo; 
        let codigo2 = null;

        
            var columns = []; var rows = [];
              const result = await  me.mostrarImg1(me.key);
              var docRef = db.collection("proyectos").doc(me.key);
              docRef
                .get()
                .then((doc) => {
                if (doc.exists) {
                      codigo2 = doc.data().codigo;
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

                      pdf.save("Reporte" + codigo2 + ".pdf" );
                      me.limpiarPdfImg()
                    
                })  

        
    },
    mostrarImg1(item)  {
        return new Promise(resolve => {
        let me = this;
        var docRef = db.collection("proyectos").doc(item);
            docRef.get().then((doc) => {
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
    limpiarPdfImg() {
      this.codigo = "";
      this.imagenes1 = [];
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
  },
};
</script>

 
