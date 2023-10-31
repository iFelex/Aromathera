import axios from 'axios';
import base64 from 'base-64'

export const paymentLink = async (req, res) => {
    try{
        const token = await authenticate();
        const url = 'https://apify.epayco.co/collection/link/create';
        const amount = req.params.amount;
        
        const data = {
            "quantity": 1,
            "onePayment":true,
            "amount": amount,
            "currency": "COP",
            "id": 0,
            "description": "Pago de productos Aromathera",
            "title": "Pago Aromathera",
            "typeSell": "2",
            "tax": "0",
            "email": "email@yopmail.com"
        };
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        };
      
        const response = await axios.post(url, data, { headers });
        const routeLink = response.data.data.routeLink;
        
        res.json({ routeLink });

    }catch (error) {
        res.json({ message: error.message });
    }
}

async function authenticate() {
  try {
    const url = 'https://apify.epayco.co/login';

    const credentials = base64.encode('c3376eb91b4344d23da868d7cfa888c1:bfdbed89fa70049b2d340acd4a629726');

    const data = {
        public_key: 'c3376eb91b4344d23da868d7cfa888c1',
    };

    const headers = {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
    }

    const response = await axios.post(url, data, {headers});

    const token = response.data.token;
    return token;
  } catch (error) {
    console.error('Error al realizar la solicitud POST:', error);
  }
}