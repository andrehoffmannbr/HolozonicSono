const mercadopago = require('mercadopago');

module.exports = async function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    try {
        console.log('🔄 Criando pagamento do plano básico...');
        
        // Configuração do Mercado Pago
        mercadopago.configure({
            access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
        });

        const baseUrl = `https://${req.headers.host}`;
        
        const preference = {
            items: [
                {
                    title: 'Holozonic - Exame + Laudo do Sono',
                    description: 'Polissonografia domiciliar com laudo médico completo',
                    unit_price: 290.00,
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
                success: `${baseUrl}/sucesso.html`,
                failure: `${baseUrl}/erro.html`,
                pending: `${baseUrl}/pendente.html`
            },
            external_reference: 'plano-basico-holozonic'
        };

        const response = await mercadopago.preferences.create(preference);
        console.log('✅ Preferência criada:', response.body.id);
        
        res.status(200).json({
            id: response.body.id,
            init_point: response.body.init_point
        });
    } catch (error) {
        console.error('❌ Erro ao criar preferência:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
} 