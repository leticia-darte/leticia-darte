# Portfólio pessoal

Site estático responsivo, sem dependências ou etapa de compilação. O conteúdo editável fica em `src/data.js`.

## Personalização

- Troque `name` pelo nome que deve aparecer no destaque inicial.
- Adicione o caminho para o PDF do currículo em `resume` (por exemplo, `./assets/curriculo.pdf`) e coloque o arquivo na pasta `assets`.
- Preencha e-mail, LinkedIn e GitHub em `contact`.
- Cadastre projetos reais em `projects`. Cada projeto aceita `title`, `description`, `technologies`, `demoUrl`, `repoUrl` e `image`.
- Atualize as habilidades e a formação nos arrays correspondentes.

Informações não fornecidas estão identificadas na página como pendentes ou temporárias. Não há projetos ou links inventados.

## Executar localmente

Com Python instalado, na pasta do projeto:

```powershell
python -m http.server 4173
```

Abra `http://localhost:4173`. O site também pode ser publicado em qualquer hospedagem de arquivos estáticos.
