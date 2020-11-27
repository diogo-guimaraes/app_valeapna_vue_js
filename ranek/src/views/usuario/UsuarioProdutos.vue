<template>
  <!-- 
    refactor(view): UsuarioProdutos
    add(view): UsuarioProdutos
    rm(view): UsuarioProdutos
  -->
  <section>
    <h2>Cadastrar Aplicação</h2>
    <ProdutoAdicionar/>
    <h2>Lista de aplicações</h2>
     <transition-group v-if="usuario_produtos" name="list" tag="ul">
       <!-- passa um v-for em produtos  -->
       <li v-for="(produto, index) in usuario_produtos" :key="index">
         <!-- declara a propriedade para ser estilizada -->
        <ProdutoItem :produto="produto">
          <p>{{produto.descricao}}</p>
            <button class="deletar" @click="deletarProduto(produto.id)">Deletar</button>
        </ProdutoItem>
      </li>
     </transition-group>
  </section>
</template>

<script>
import ProdutoAdicionar from "@/components/ProdutoAdicionar.vue";
import ProdutoItem from "@/components/ProdutoItem.vue";
import { mapState, mapActions } from "vuex";
import { api } from "@/services.js";
export default {
   name: "UsuarioProdutos",
   components: {
    ProdutoAdicionar,
    ProdutoItem
  },
  //  Passando login para verificar se o usuário está logado , usuario para puxas as informações do usuário e  produtos também
  computed: {
    // mapeia os estados das priedades 
    ...mapState(["login", "usuario", "usuario_produtos"])
  },
  // mapeia e puxa ação de getUsuarioProdutos
  methods: {
    ...mapActions(["getUsuarioProdutos"]),
    deletarProduto(id) {
      const confirmar = window.confirm("Deseja remover este produto?");
      if (confirmar) {
        api
          .delete(`/produto/${id}`)
          .then(() => {
            this.getUsuarioProdutos();
          })
          .catch(error => {
            // console.log(error.reponse);
          });
      }
    }    
  },
  // quando mudar também vai dar um getUsuarioProdutos
  watch: {
    login() {
      this.getUsuarioProdutos();
    }
  },
  created() {
    if (this.login) {
      // se logir for true faz um getUsuarioProdutos
      this.getUsuarioProdutos();
    }
  }  
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.deletar {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url("../../assets/remove.svg") no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>
