import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import { db } from '../Db';
import Swal from "sweetalert2";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    usuario: null
    
  },
  mutations: {
    setToken(state,token){
      state.token=token;
    },
    setUsuario(state,usuario){
      state.usuario=usuario;
    }
  },
  actions: {
    
  },
  actions: {
    guardarInicio({commit}, data){
      commit("setUsuario", data)
    },
    autoLogin({commit}){
      let token = localStorage.getItem("token");
      if(token) {
        commit("setToken", token);
        //commit("setUsuario", decode(token));
      }
      router.push("/");
    },
    salir({commit}){
      commit("setToken", null);
      commit("setUsuario", null);
      localStorage.removeItem("token");
      router.push("/login");
    },
    addUsuario(context, payload){
      //context.commit('addPersona', payload)
      console.log(context)
    //  return new promise((resolve,reject)=>{
      db.collection("usuarios")
      .add(
        payload
      )
          .then((res)=>{
              console.log(res);
          }).catch((error)=>console.log(error));
 //     })
      
  },

  getUsuario(context, payload){
    //context.commit('addPersona', payload)
    console.log(context)
  //  return new promise((resolve,reject)=>{
    db.collection("usuarios")
    .add(
      payload
    )
        .then((res)=>{
            console.log(res);
            /* nombre.value="";
            email.value="";
            aporte.value="";   */  


        }).catch((error)=>console.log(error));
//     })
    
},

    addArea(context, payload){
      //context.commit('addPersona', payload)
      console.log(context)
    //  return new promise((resolve,reject)=>{
      db.collection("areas")
      .add(
        payload
      )
          .then((res)=>{
              console.log(res);
              /* nombre.value="";
              email.value="";
              aporte.value="";   */  


          }).catch((error)=>console.log(error));
 //     })    
  },
    addLote(context, payload){
      //context.commit('addPersona', payload)
      console.log(context)
    //  return new promise((resolve,reject)=>{
      db.collection("lotes")
      .add(
        payload
      )
          .then((res)=>{
              console.log(res);
              /* nombre.value="";
              email.value="";
              aporte.value="";   */  


          }).catch((error)=>console.log(error));
 //     })    
  },
    addProyecto(context, payload){
      //context.commit('addPersona', payload)
      console.log(context)
    //  return new promise((resolve,reject)=>{
      db.collection("proyectos")
      .add(
        payload
      )
          .then((res)=>{
              console.log(res);
              /* nombre.value="";
              email.value="";
              aporte.value="";   */  


          }).catch((error)=>console.log(error));
 //     })    
  },
    updateArea(context, payload){
      //context.commit('addPersona', payload)
      console.log(context)
    //  return new promise((resolve,reject)=>{
      db.collection("areas")
      .add(
        payload
      )
          .then((res)=>{
              console.log(res);
              /* nombre.value="";
              email.value="";
              aporte.value="";   */  
          }).catch((error)=>console.log(error));
 //     })    
  },
    updateLote(context, payload){
      //context.commit('addPersona', payload)
      console.log(context)
    //  return new promise((resolve,reject)=>{
      db.collection("lotes")
      .add(
        payload
      )
          .then((res)=>{
              console.log(res);
              /* nombre.value="";
              email.value="";
              aporte.value="";   */  
          }).catch((error)=>console.log(error));
 //     })    
  },
    updateProyecto(context, payload){
      //context.commit('addPersona', payload)
      console.log(context)
    //  return new promise((resolve,reject)=>{
      db.collection("proyectos")
      .add(
        payload
      )
          .then((res)=>{
              console.log(res);
              /* nombre.value="";
              email.value="";
              aporte.value="";   */  
          }).catch((error)=>console.log(error));
 //     })    
  },

  getLogin(context, payload){
    //context.commit('addPersona', payload)
    console.log(context)

    db.collection("usuarios")
    .where('email', "==",payload.email)
    .where('password', "==", payload.password).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data.length}`)
          console.log("datos"+doc.data().rol);
          if(doc.data.length>=1){
            router.push("/usuario");
          }
         
      });
     
  });
        
//     })
    
}

  },
  modules: {
  }
})
