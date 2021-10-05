<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-if="logueado"
    >
      <v-list dense>
        <template v-if="logueado || esAdministrador ">
          <v-list-item to="/">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              Menu
            </v-list-item-title>
          </v-list-item>
        </template>
        <template v-if="esAdministrador|| esEditor" >
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Mantenimiento
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item  >
              <v-list-item v-if="esAdministrador" to="/usuario">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Usuarios
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
            <!-- <v-list-item to="/area">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Areas
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
            <v-list-item to="/lote">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Lotes
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/ficha">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Fichas
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item to="/proyecto">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Proyectos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
          
          </v-list-group>
        </template>
        <template v-if="esVisitante">
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  General
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/proyecto">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Proyectos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
        <template v-if="esAdministrador || esEditor ">
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Reportes
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/proyectoRpt1">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Reportes Areas
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/proyectoRpt2">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Reportes Vigencias
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
             <v-list-item to="/proyectoGraf">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Proyectos Graficos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>   
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="#EFA94A"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-3"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Aplicativo Proyectos 2021</span>
      </v-toolbar-title>      
      <v-spacer></v-spacer>
      <v-btn @click="salir()" icon v-if="logueado">
        <v-icon>logout</v-icon>Salir
      </v-btn>
      <v-btn to="/login" icon v-else>
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer height="auto">
      <v-layout justify-center>
        <v-flex text-xs-center>
          <v-card flat tile color="primary" class="white--text">
            <v-card-text class="white--text pt-0">
             Proyectos Tecnoparque-Sennova 2021
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: true
    }
  },
  computed:{
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
  created(){
    this.$store.dispatch("autoLogin");
  },
  methods:{
    salir(){
      this.$store.dispatch("salir");
    }
  }

};
</script>
