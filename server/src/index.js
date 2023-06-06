const express = require('express');

const bodyParser = require('body-parser');
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',  // ваш хост, если вы используете docker-compose и база данных запущена в том же сервисе, вы можете использовать имя сервиса (например, 'db')
        user : 'user',       // имя пользователя для подключения к базе данных
        password : 'password', // пароль для подключения к базе данных
        database : 'test'   // имя вашей базы данных
    }
});

const app = express();
var cors = require('cors');
app.use(cors());


app.use(bodyParser.json());

app.get('/links', async (req, res) => {
    const links = await knex('link');
    res.json(links);
});

app.post('/links', async (req, res) => {
    const newLink = req.body;
    const link = await knex('link').insert(newLink);
    res.json(link);
});

app.get('/links/:id', async (req, res) => {
    const { id } = req.params;
    const link = await knex('link').where({id}).first();
    res.json(link);
});

app.put('/links/:id', async (req, res) => {
    const { id } = req.params;
    const updatedLink = req.body;
    await knex('link').where({id}).update(updatedLink);
    res.json({message: `Link id ${id} updated`});
});

app.delete('/links/:id', async (req, res) => {
    const { id } = req.params;
    await knex('link').where({id}).del();
    res.json({message: `Link id ${id} deleted`});
});

const crypto = require('crypto');

const key = Buffer.from('cRfUjXn2r4u7x!A%D*G-KaPdSgVkYp3s', 'utf8'); // ваш ключ
const iv = Buffer.alloc(16); // ваш IV

function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

// Decrypt URL
app.get('/v2/links', async (req, res) => {
    links = await knex('link');

    // Encrypt URLs
    linksmapping = links.map(link => {
        const encryptedUrl = encrypt(link.url);
        return { ...link, url: encryptedUrl };
    });

    res.json(linksmapping);
});

app.listen(8080, () => console.log('Server is listening on port 8080'));
