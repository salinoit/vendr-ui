export class Product {
    IdProdutoServico: number;
    Tipo: string;
    Descricao: string;
    PrecoVenda: number;
    Html: string;
    ImagemProduto: string;
    preco_venda_fmt: string;
    state: string;
}


export class RetProduct
{
    produto: Product;
    relacionados: Product[];
    total_vendido: number;
}
