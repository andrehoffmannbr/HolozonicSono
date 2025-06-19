const express = require('express');
const mercadopago = require('mercadopago');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Mercado Pago
mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Rota principal - serve a landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Endpoint para criar pagamento do plano básico (R$ 290)
app.post('/criar-pagamento-basico', async (req, res) => {
    try {
        console.log('🔄 Criando pagamento do plano básico...');
        
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
                success: `${process.env.BASE_URL}/sucesso.html`,
                failure: `${process.env.BASE_URL}/erro.html`,
                pending: `${process.env.BASE_URL}/pendente.html`
            },
            external_reference: 'plano-basico-holozonic'
        };

        const response = await mercadopago.preferences.create(preference);
        console.log('✅ Preferência criada:', response.body.id);
        
        res.json({
            id: response.body.id,
            init_point: response.body.init_point
        });
    } catch (error) {
        console.error('❌ Erro ao criar preferência:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Endpoint para criar pagamento do plano completo (R$ 490)
app.post('/criar-pagamento-completo', async (req, res) => {
    try {
        console.log('🔄 Criando pagamento do plano completo...');
        
        const preference = {
            items: [
                {
                    title: 'Holozonic - Completo + Bônus',
                    description: 'Exame + Laudo + Óleo ozonizado + Acompanhamento + Consulta',
                    unit_price: 490.00,
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
                success: `${process.env.BASE_URL}/sucesso.html`,
                failure: `${process.env.BASE_URL}/erro.html`,
                pending: `${process.env.BASE_URL}/pendente.html`
            },
            external_reference: 'plano-completo-holozonic'
        };

        const response = await mercadopago.preferences.create(preference);
        console.log('✅ Preferência criada:', response.body.id);
        
        res.json({
            id: response.body.id,
            init_point: response.body.init_point
        });
    } catch (error) {
        console.error('❌ Erro ao criar preferência:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Endpoint para criar pagamento do plano premium (R$ 590)
app.post('/criar-pagamento-premium', async (req, res) => {
    try {
        console.log('🔄 Criando pagamento do plano premium...');
        
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
                success: `${process.env.BASE_URL}/sucesso.html`,
                failure: `${process.env.BASE_URL}/erro.html`,
                pending: `${process.env.BASE_URL}/pendente.html`
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
        console.error('❌ Erro ao criar preferência:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Webhook para receber notificações do Mercado Pago
app.post('/webhook', (req, res) => {
    console.log('📧 Webhook recebido:', req.body);
    res.status(200).send('OK');
});

// Inicializar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`🌐 Acesse: http://localhost:${PORT}`);
    console.log(`💳 Mercado Pago configurado`);
}); 