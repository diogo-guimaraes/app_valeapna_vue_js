<template>
<!-- 
  refactor(compoments): FinalizarCompra
  add(compoments): FinalizarCompra
  rm(compoments): FinalizarCompra
-->
  <section>
    <h2>Endereço de Envio</h2>
    <ErroNotificacao :erros="erros"/>
    <UsuarioForm>
      <button class="btn" @click.prevent="finalizarCompra">Finalizar Compra</button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
  name: "FinalizarCompra",
  components: {
    UsuarioForm
  },
  props: ["produto"],
   data() {
    return {
      erros: []
    };
  },
  computed: {
    ...mapState(["usuario"]),
    compra() {
      return {
        // dados da compra
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          bairro: this.usuario.bairro,
          cidade: this.usuario.cidade,
          estado: this.usuario.estado
        }
      };
    }
  },
  methods: {
    // método para postar a compra
    criarTransacao() {
      return api.post("/transacao", this.compra).then(() => {
        // manda para página compras
        this.$router.push({ name: "compras" });
      });
    },
    async criarUsuario() {
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("logarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("getUsuario");
        await this.criarTransacao();
      } catch (error) {
        this.erros.push(error.response.data.message);
      }
    },
    // chama criarTransacao para finalizar a compra
    finalizarCompra() {
      this.erros = [];
      // vetifica se o usuário está logado
      if (this.$store.state.login) {
        this.criarTransacao();
      } else {
        this.criarUsuario();
      }
    }
  }
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>
