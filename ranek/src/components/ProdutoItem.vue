<template>
<!-- 
  refactor(compoments): ProdutoItem
  add(compoments): ProdutoItem
  rm(compoments): ProdutoItem
-->
  <div class="produto" v-if="produto">
    <router-link class="produto-img" :to="{name: 'produto', params: {id: produto.id}}">
      <!-- se produto.fotos existir traz mostra a foto passando posilçao [0] porque é o primeira chave no array -->
      <img v-if="produto.fotos" :src="produto.fotos[0].src" :alt="produto.fotos[0].titulo">
    </router-link>
    <div class="info">
      <!-- passa o preco atraves do filtro numeroPreco que está declarado gobalmente -->
      <p class="preco">{{produto.preco | numeroPreco}}</p>
      <h2 class="titulo">{{produto.nome}}</h2>

      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  // nome do componente
  name: "ProdutoItem",
  // declara a propriedade que está recebendo
  props: ["produto"]
};
</script>

<style scoped>
.produto {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
  position: relative;
}

@media screen and (max-width: 500px) {
  .produto {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
}

.info {
  align-self: end;
}

.produto-img {
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}
</style>
