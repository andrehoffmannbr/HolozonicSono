const mercadopago = require('mercadopago');

module.exports = async (req, res) => {
    // Configuração do Mercado Pago
    mercadopago.configure({
        access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
    });

    try {
        console.log('🔄 Criando pagamento do plano premium (Vercel)...');
        
        const preference = {
            items: [
                {
                    title: 'Holozonic - Completo + Comparativo de Duas Noites',
                    description: 'Exame completo + Comparativo + Consulta + Laudo + Duas noites de exame',
                    unit_price: 590.00,
                    quantity: 1,
                    currency_id: 'BRL'
                }
            ],
            payment_methods: {
                excluded_payment_methods: [],
                excluded_payment_types: [],
                installments: 3
            },
            back_urls: {
                success: 'https://andrehoffmannbr.github.io/HolozonicSono/sucesso.html',
                failure: 'https://andrehoffmannbr.github.io/HolozonicSono/erro.html',
                pending: 'https://andrehoffmannbr.github.io/HolozonicSono/pendente.html'
            },
            external_reference: 'plano-premium-holozonic'
        };

        const response = await mercadopago.preferences.create(preference);
        console.log('✅ Preferência criada:', response.body.id);
        
        res.json({
            id: response.body.id,
            init_point: response.body.init_point
        });
    } catch (error) {
        console.error('❌ Erro ao criar preferência premium:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}; 