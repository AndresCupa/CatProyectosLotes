<template>
  <v-layout align-start>
    <v-flex>
      <template>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-container>
            <v-toolbar-title>Proyectos Gráficos</v-toolbar-title>
            <v-divider class="mx-5" inset vertical></v-divider>
            <v-row>
              <template id="reportPage">
                <v-col
                  cols="12"
                  sm="6"
                >
                <h3 style="margin-left: 110px">Cantidad de proyectos por vigencia</h3>
                <br/>
                  <!-- <app-grafica :chartdata="chartdata" :options="options"></app-grafica> -->
                  <canvas id="myChart1" width="400px" height= "200px"></canvas>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                <h3 style="margin-left: 140px">Cantidad de proyectos por área</h3>
                <br/>
                  <!-- <app-grafica :chartdata="chartdata" :options="options"></app-grafica> -->
                  <canvas id="myChart" width="400px" height= "200px"></canvas>
                </v-col>
              </template>
               <v-btn
                  color="primary"
                  class="mr-4"
                  @click="downloadGrafica()"
                  style="margin-top: 10px"
                >
                  Descargar
                </v-btn>
            </v-row>
          </v-container>    
        </v-form>
      </template>  
    </v-flex>
  </v-layout>

</template>

<script>

import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../Db";
import Chart from 'chart.js';
import jsPDF from 'jspdf';
 
export default {
  data() {
     return {

      datos:[],
      areas:[],
      cantAreas:[],
      cantidad: [],
      fechas: [],
      fechasYear: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
      cantPro: [],
      areasProyectos: [],
      year2015: 0,
      year2016: 0,
      year2017: 0,
      year2018: 0,
      year2019: 0,
      year2020: 0,
      year2021: 0,
      year2022: 0,
      year2023: 0,
      year2024: 0,
      year2025: 0,
      indices: [],
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
  mounted() {
    this.consultaFechas();
    this.consulAreas();
  },
  
  methods: {
  grafico() {
    let me = this;
    me.contarAreas();
      let ctx = document.getElementById('myChart');
     /* eslint-disable no-unused-vars */
      const myChart = new Chart(ctx, {
          type: 'polarArea',
          data: {
              labels: me.areas,
              datasets: [{
                  title: 'areas',
                  label: 'Proyectos',
                  data: me.cantidad,
                  backgroundColor: [
                      'rgba(255, 0, 0, 0.4)',
                      'rgba(26, 26, 255, 0.4)',
                      'rgba(255, 117, 26, 0.4)',
                      'rgba(0, 179, 0, 0.4)',
                      'rgba(230, 0, 230, 0.4)',
                      'rgba(179, 60, 0, 0.4)',
                      'rgba(230, 0, 92, 0.4)',
                      'rgba(230, 230, 0, 0.4)',
                      'rgba(102, 102, 0, 0.4)',
                      'rgba(0, 204, 204, 0.4)',

                      'rgba(128, 0, 128, 0.4)',
                      'rgba(0, 0, 128, 0.4)',
                      'rgba(0, 128, 128, 0.4)',
                      'rgba(0, 255, 255, 0.4)',
                      'rgba(0, 128, 0, 0.4)',
                      'rgba(128, 0, 0, 0.4)',
                      'rgba(250, 128, 114, 0.4)',
                      'rgba(255, 195, 0, 0.4)',
                      'rgba(0, 255, 0, 0.4)',
                      'rgba(255, 87, 51, 0.4)',

                     
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(25, 80, 130, 0.2)',
                      'rgba(179, 60, 0, 0.2)',
                      'rgba(230, 0, 92, 0.2)',
                      'rgba(230, 230, 0, 0.2)',
                      'rgba(102, 102, 0, 0.2)',
                      'rgba(0, 204, 204, 0.2)',
                      

                      'rgba(128, 0, 128, 0.2)',
                      'rgba(0, 0, 128, 0.2)',
                      'rgba(0, 128, 128, 0.2)',
                      'rgba(0, 255, 255, 0.2)',
                      'rgba(0, 128, 0, 0.2)',
                      'rgba(128, 0, 0, 0.2)',
                      'rgba(250, 128, 114, 0.2)',
                      'rgba(255, 195, 0, 0.2)',
                      'rgba(0, 255, 0, 0.2)',
                      'rgba(255, 87, 51, 0.2)',
                  ],
                  // borderWidth: 2
              }]
          },
          options: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 3,
                boxWidth: 20,
                fontFamily: 'system-ui',
                fontColor: 'black',
              }
            },
            scale: {
              ticks: {
                precision: 0
              }
            }
      
          }
      });
  },

  grafico1() {
    let me = this;
    me.contarFechas();
    // me.grafico();

      let ctx = document.getElementById('myChart1');
     /* eslint-disable no-unused-vars */
      const myChart1 = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: me.fechasYear,
              datasets: [{
                  label: 'Cantidad de proyectos por vigencia',
                  data: me.cantPro,
                  backgroundColor: [
                      'rgba(255, 0, 0, 0.4)',
                      'rgba(26, 26, 255, 0.4)',
                      'rgba(255, 117, 26, 0.4)',
                      'rgba(0, 179, 0, 0.4)',
                      'rgba(230, 0, 230, 0.4)',
                      'rgba(179, 60, 0, 0.4)',
                     
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(25, 80, 130, 0.2)',
                      'rgba(179, 60, 0, 0.2)',
                  ],
                  borderWidth: 2
              }]
          },
          options: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                boxWidth: 15,
                fontFamily: 'system-ui',
                fontColor: 'black',
              }
            },
            animation: {
              onComplete: function () {
                var chartInstance = this.chart;
                var ctx = chartInstance.ctx;
                console.log(chartInstance);
                var height = chartInstance.controller.boxes[0].bottom;
                ctx.textAlign = "center";
                Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
                  var meta = chartInstance.controller.getDatasetMeta(i);
                  Chart.helpers.each(meta.data.forEach(function (bar, index) {
                    ctx.fillText(dataset.data[index], bar._model.x, height - ((height - bar._model.y) / 1));
                  }),this)
                }),this);
              }
            },
              scales: {
                  yAxes: [{
                      ticks: {
                          precision:0,
                          beginAtZero: true
                      }
                  }]
              },
          }
      });
  },
  listar() {
    let me = this;
    if (!firebase.apps.length) {
          firebase.initializeApp(this.firebaseConfig);
        }
      firebase
          .firestore()
          .collection("artículos")
          .onSnapshot((snapshotChange) => {
            me.datos = [];
            me.stock = [];
            snapshotChange.forEach((doc) => {
              me.datos.push(doc.data().nombre);
              me.stock.push(doc.data().stock);
            })
          })
  },  
  async consultaFechas() {
    if (!firebase.apps.length) {
          firebase.initializeApp(this.firebaseConfig);
    }
    let me = this;
    await db.collection("proyectos")
    .get().then((querySnapshot) => {
      this.fechas = [];
      querySnapshot.forEach((doc) => {
        
        me.fechas.push(doc.data().fechaForm);
            
      }) 
    });

    me.grafico1();  
  },
  contarFechas() {
    let me = this;
    let year = null;
      for (let i = 0; i < me.fechas.length; i++) {
        year = me.fechas[i].substring(0, 4)
        console.log(year + " años");
        if (year == 2015) {
          me.year2015 = me.year2015 + 1;
        }
        if (year == 2016) {
          me.year2016 = me.year2016 + 1;
        }
        if (year == 2017) {
          me.year2017 = me.year2017 + 1;
        }
        if (year == 2018) {
          me.year2018 = me.year2018 + 1;
        }
        if (year == 2019) {
          me.year2019 = me.year2019 + 1;
        }
        if (year == 2020) {
          me.year2020 = me.year2020 + 1;
        }
        if (year == 2021) {
          me.year2021 = me.year2021 + 1;
        }
        if (year == 2022) {
          me.year2022 = me.year2022 + 1;
        }
        if (year == 2023) {
          me.year2023 = me.year2023 + 1;
        }
        if (year == 2024) {
          me.year2024 = me.year2024 + 1;
        }
        if (year == 2025) {
          me.year2025 = me.year2025 + 1;
        }       
      }
      me.cantPro =  [ me.year2015, 
                      me.year2016,
                      me.year2017, 
                      me.year2018, 
                      me.year2019, 
                      me.year2020, 
                      me.year2022,
                      me.year2023,
                      me.year2024,
                      me.year2025,
                    ];
      console.log(me.cantPro + "cantPro");  
  },
  async consulAreas() {
    let me = this; 
    if (!firebase.apps.length) {
          firebase.initializeApp(this.firebaseConfig);
    }
    await db.collection("areas")
    .get().then((querySnapshot) => {
      this.areas = [];
      querySnapshot.forEach((doc) => {   
        me.areas.push(doc.data().nombre);         
      }) 
    });
    await db.collection("proyectos")
    .get().then((querySnapshot) => {
      this.areasProyectos = [];
      querySnapshot.forEach((doc) => {   
        me.areasProyectos.push(doc.data().area);         
      }) 
    }); 
    me.grafico();      
  },
  contarAreas(){
    let me = this;
    let cantArray = 0;
    
    cantArray = me.areas.length;
    me.indices = [cantArray]
    var contar = new Array(cantArray);
    contar.fill(0);
    for (let i = 0; i < contar.length; i++) {
      for (let j = 0; j < me.areasProyectos.length; j++) {
        if (me.areas[i] == me.areasProyectos[j]) {
          contar[i] = contar[i] + 1;
        } 
      }  
    }
    me.cantidad = contar;
          console.log(me.cantidad + " cantidad")
    console.log(contar);

  },
  downloadGrafica(){
    let newCanvas = document.querySelector('#myChart1');
    let newCanvas1 = document.querySelector('#myChart');
    let newCanvasImg = newCanvas.toDataURL("image/png", 1.0);
    let newCanvasImg1 = newCanvas1.toDataURL("image1/png", 1.0);
    let pdf = new jsPDF();
    pdf.setFontSize(20);
    pdf.text(80, 15, "Proyectos Graficos");
    pdf.addImage(newCanvasImg, 'PNG', 25, 30, 160, 80 );
    pdf.setFontSize(15);
    pdf.text(70, 28, "Cantidad de proyectos por vigencia");
    pdf.addImage(newCanvasImg1, 'PNG', 25, 140, 160, 80 );
    pdf.setFontSize(15);
    pdf.text(70, 130, "Cantidad de proyectos por área");
    pdf.save('Graficos.pdf');
  }
},
};
</script>
<style>
.ex2 {
  margin:200px;
  width: 800px; 
  height: 800px ;
}
</style>

 
