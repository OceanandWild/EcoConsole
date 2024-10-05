// index.js
const express = require('express');  // Importar express usando require
const axios = import('axios');
import dotenv from 'dotenv';
dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
console.log(`La API Key es: ${openaiApiKey}`);

// El resto de tu código

const ngrok = import('ngrok');
const fs = import('fs');
const path = import('path');


const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta para generar el blog
app.post('/generate-blog', async (req, res) => {
  const topic = req.body.topic;

  try {
    // Llamada a la API de OpenAI para generar el blog
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Write a blog post about ${topic}`,
        max_tokens: 500,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const blogContent = response.data.choices[0].text.trim();

    // Guardar el blog generado en un archivo HTML
    const blogFilePath = path.join(__dirname, 'public', `blog-${Date.now()}.html`);
    const blogHtml = `
      <html>
      <head>
        <title>${topic}</title>
      </head>
      <body>
        <h1>${topic}</h1>
        <p>${blogContent}</p>
      </body>
      </html>
    `;

    fs.writeFileSync(blogFilePath, blogHtml);

    res.json({ message: 'Blog generated successfully', filePath: blogFilePath });
  } catch (error) {
    console.error('Error generating blog:', error);
    res.status(500).json({ error: 'Error generating blog' });
  }
});

// Servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Iniciar el servidor y exponerlo a través de ngrok
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);

  const url = await ngrok.connect(port);
  console.log(`ngrok URL: ${url}`);
});
