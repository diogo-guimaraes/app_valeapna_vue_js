
// refactor: helpers
// add: helpers
// rm: helpers


// cria serialização da url escrita em ProdutosBuscar->buscarProdutos e coloca dentro de queryString para ser usado em ProdutosLista
// computed->url
// depois do foreach ele adiciona em queryString &q= url, e temos nossa rota
export function serialize(obj) {
  let queryString = "";
  for (let key in obj) {
    queryString += `&${key}=${obj[key]}`;
  }
  return queryString;
}
// plugion
// Recebe uma opção, nesse CacheStorage, um objeto com options. Nessa opçãoo tem três coisas  
// os fieds são são campos que queremos mapear, a base que é o usuário ou não, e a mutation e no final retorna o objeto. Funciona como get e ser para auxiliar na mutação dos dados.
export function mapFields(options) {
  const object = {};
  for (let x = 0; x < options.fields.length; x++) {
    const field = [options.fields[x]];
    object[field] = {
      get() {
        return this.$store.state[options.base][field];
      },
      set(value) {
        this.$store.commit(options.mutation, { [field]: value });
      }
    };
  }
  return object;
}