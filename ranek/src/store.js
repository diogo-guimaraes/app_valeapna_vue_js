// refactor(src): Store
// add(src): Store
// rm(src): Store 

import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/services.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: ""
    },
    usuario_produtos: null
  },
  // muda o valor de usuário
  // passando dois arguementos, state para ter acesso aos 
  // atributos e payload que vai mandar as informações que for feito um commit na mutação
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload;
    },
    ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshit(payload);
    }
  },
  // add ação para pegar um usuario
  actions: {
    getUsuarioProdutos(context) {
        // o id é passado pelo context
        // a ação puxa pelo id registrado no login
        return api
        .get(`/produto?usuario_id=${context.state.usuario.id}`)
        .then(response => {
          context.commit("UPDATE_USUARIO_PRODUTOS", response.data);
        });
    },
    getUsuario(context) {
      return api.get(`/usuario`).then(response => {
        context.commit("UPDATE_USUARIO", response.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },

   // ação para criar usuário
    criarUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", { id: payload.email });
      return api.post("/usuario", payload);
    },  
    logarUsuario(context, payload) {
      return api
        .login({
          username: payload.email,
          password: payload.senha
        })
        .then(response => {
          window.localStorage.token = `Bearer ${response.data.token}`;
        });
    },
    deslogarUsuario(context) {
      context.commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: ""
      });
      window.localStorage.removeItem("token");
      context.commit("UPDATE_LOGIN", false);
    }
  }
});
