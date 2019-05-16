export class Pedido
{
  id_pedido: string;
  id_consumidor: number;
  id_vendedor: number;
  id_status_pedido: number;
  nome_consumidor: string;
  data_pedido: Date;
  status_pedido: string;
  valor_pedido_fmt: string
}

export class PedidoView
{
  pedido: Pedido;
  items: PedidoItem[];

  constructor()
  {
    this.pedido = new Pedido();
    this.items = [];
  }
}


export class PedidoItem
{
    id_pedido_item: number;
    id_produto_servico: number;
    quantidade: number;
    preco_unitario_fmt: number;
    descricao: string;
    total_item_fmt: string;
}

export class PedidoFiltro
{
  inicio: string;
  fim: string;
  vendedor: number;
  consumidor: number;
  status: number;

}
