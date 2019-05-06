export class Pedido
{
  id_pedido: number;
  id_consumidor: number;
  id_vendedor: number;
  id_status_pedido: number;
  nome_consumidor: string;
  data_pedido: Date;
  status_pedido: string;
}

export class PedidoFiltro
{
  inicio: string;
  fim: string;
  vendedor: number;
  status: number;
}
