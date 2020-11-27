<template>
  <!-- 
    refactor(compoments): Home
    add(compoments): Home
    rm(compoments): Home
  -->
  <section>
    <h1>PnA Webservice Aplicações</h1>
    <ProdutosBuscar />
    <ProdutosLista />
  </section>
</template>

<script>
import ProdutosBuscar from "@/components/ProdutosBuscar.vue";
import ProdutosLista from "@/components/ProdutosLista.vue";

export default {
  components: {
    ProdutosBuscar,
    ProdutosLista,
  },
};
</script>
<style scoped>
h1 {
  color: #252525;
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
}
</style>
