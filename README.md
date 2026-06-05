# Landing Page — Palestra OAB Itatiba

Landing page pronta para publicação no GitHub Pages.

## Arquivos

- `index.html` — página principal.
- `assets/oab-itatiba-logo.png` — logo utilizada no topo e nos cards.
- `assets/dr-juliano-cacoilo.jpg` — foto do palestrante.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub, por exemplo: `palestra-oab-itatiba`.
2. Envie o conteúdo desta pasta para a raiz do repositório: `index.html`, `README.md` e a pasta `assets`.
3. No GitHub, acesse **Settings > Pages**.
4. Em **Build and deployment**, selecione:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Salve. O GitHub informará um link parecido com:
   `https://SEU-USUARIO.github.io/palestra-oab-itatiba/`
6. Abra o `index.html` e substitua os trechos abaixo pelo link real:
   - `<link rel="canonical" href="...">`
   - `<meta property="og:image" content="...">`
   - `<meta property="og:url" content="...">`
   - `githubPagesUrl` no bloco `CONFIG` do JavaScript.

## Como receber inscrições reais

O formulário já está pronto visualmente, mas uma página estática do GitHub Pages precisa de um serviço externo para receber dados.

Opções simples:

1. **Google Forms:** crie um formulário, use o link oficial no botão ou integre via Apps Script.
2. **Formspree:** crie um endpoint e cole o link em `registrationEndpoint`.
3. **Google Apps Script:** publique um Web App que grave os dados em uma planilha e cole a URL em `registrationEndpoint`.

No `index.html`, localize:

```js
const CONFIG = {
  registrationEndpoint: "",
  githubPagesUrl: "https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/"
};
```

Cole o endpoint entre as aspas de `registrationEndpoint`.

Enquanto o endpoint estiver vazio, o formulário funciona em modo demonstração e salva os envios apenas no navegador do visitante.
