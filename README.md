# WaProject
### Ao projeto inicial foram adicionadas a página de Produtos e Pedidos, ondem consta uma lista de produtos aos quais podemos adicionar ao carinho pra reavlizar um pedido.
Na tela de produtos temos duas abas: Produtos e Carrinho de compras.
* Nessa tela os itens são adicionados na variavel de state da lista de compras e passar como props para semrem exibidas no carrinho de compras. Não usei requisição de api, pois o foquei na execução da tela, seria necessários criar os endpoints da api e consumir usando um service de produtos.

![image](https://user-images.githubusercontent.com/20269170/122593667-62d9fb00-d03c-11eb-8231-fea526995915.png)

* Na lista de compras podemos adicionar itens ao carrinho de compras.
![image](https://user-images.githubusercontent.com/20269170/122643259-362dee00-d0e5-11eb-9289-f161c7db92ef.png)

* Na aba carrinho de compras podemos fnalizar o pedido.
![image](https://user-images.githubusercontent.com/20269170/122643287-607fab80-d0e5-11eb-85f0-63bcdb955234.png)


### Ta tela de pedidos, temos a listagem dos pedidos realizados, em cada pedid é apresentado um sublista com o detalhamento de produtos com descrição, quantidade, preço e total de cada produtos comprado em cada pedido.
* Nessa tela usei um mock de pedidos pra pode exemplificar como ficaria a tela. Numa aplicação real esse dados seriam buscados da api utilizando um service de pedidos realizados por cada usuário do sistema.

![image](https://user-images.githubusercontent.com/20269170/122594077-ec89c880-d03c-11eb-9da5-ccc5d8f87d14.png)
