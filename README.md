<img src="https://skycms.s3.amazonaws.com/images/43136174/Banner_large.png">

<br>
<img src="./src/assets/icons/logo_Screen.png" width=230 align="center">


<img align="right" alt="livro" width="290" src="https://sessaopipoca.com/wp-content/uploads/2024/12/Snapinsta.app_470943462_1261458005134199_2398939210101117189_n_1080-819x1024.jpg">

<br>

**Screem** é um projeto desenvolvido como trabalho acadêmico, com o objetivo de explorar o consumo de APIs públicas utilizando o framework **React**. A aplicação se conecta ao serviço do `The Movie Database (TMDb)` para exibir informações sobre filmes.

Embora o foco principal não tenha sido o design da interface, a ênfase foi colocada na **estruturação limpa do código**, seguindo **boas práticas de organização de pastas e padrões de projeto**.
<div align="center"> 

<h3>Utilizado no Projeto</h3>

<img src="https://skillicons.dev/icons?i=react,vercel,js,css" />
</div></h4>

<br>

## <img src="./src/assets/icons/film-solid.svg" width="20px"> Topicos


- [Api Utilizada](#tecnologias)
    - [Endpoints](#endpoints)
- [Contato](#Contato)


<h2 id="tecnologias">
  <img src="./src/assets/icons/film-solid.svg" width="25px"> Api Utilizada
</h2>

<img src="https://scontent-for2-1.xx.fbcdn.net/v/t39.30808-6/300370141_445684364259165_8893097931255509122_n.png?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=t6vGZfalnREQ7kNvwFnMtev&_nc_oc=Adn5nGAsy0rZaqvjjpMdsVFGhMDJ_p55LH8q09Z6nYzTPqtaojgqniSQPTWHvFceG9aOZJzrL5_TKwwcpwP4cq8j&_nc_zt=23&_nc_ht=scontent-for2-1.xx&_nc_gid=0C8LkfBzhviOYClXpRGi2g&oh=00_AfN28cEMQ1qk6TQQza6kP40tneh6XnSCFv_jIq2kb1njSg&oe=6849618F" align="left" width="280px">

<div align="center"> 

`The Movie Data Base`
</div>

A aplicação Screem utiliza a **API pública do TMDb**, uma das bases de dados mais completas sobre filmes, séries, atores e tudo relacionado à indústria cinematográfica.<br>
Essa API permite fazer diversas requisições, como:
<br>
<br>

    - Buscar filmes por categoria
    - Buscar detalhes de um filme específico
    - Obter imagens, títulos, notas, datas de lançamento e mais
<br>

<div align="center" id="endpoints"> 

<h2>EndPoints</h2>
</div>

<div align="center"> 

`Buscar filmes populares`
</div>

```https
GET https://api.themoviedb.org/3/movie/popular?api_key=SUA_API_KEY&language=pt-BR&page=1
```

<div align="center"> 

Retorna uma lista com os filmes mais populares do momento, ordenados por relevância e acessos.
</div>

```json
"page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
            "genre_ids": [
                10751,
                35,
                878
            ],
            "id": 552524,
            "original_language": "en",
            "original_title": "Lilo & Stitch",
            "overview": "Stitch, um alienígena, chega ao planeta Terra após fugir de sua prisão e tenta se passar por um cachorro para se camuflar. As coisas mudam quando Lilo, uma travessa menina, o adota de um abrigo de animais. Juntos, eles aprendem os valores da amizade e família.",
            "popularity": 574.8674,
            "poster_path": "/toLU4HzWf2iKqPbElKPDypKNGTr.jpg",
            "release_date": "2025-05-17",
            "title": "Lilo & Stitch",
            "video": false,
            "vote_average": 7.073,
            "vote_count": 494
        },
    ]...
```

<div align="center"> 

`Detalhes de um filme específico`
</div>

```https
GET https://api.themoviedb.org/3/movie/12345?api_key=SUA_API_KEY&language=pt-BR
```

<div align="center"> 

Retorna todos os detalhes de um filme, como sinopse, duração, gêneros, nota média, imagem de fundo e mais.
</div>

```json
{
  "id": 12345,
  "title": "Nome do Filme",
  "overview": "Sinopse do filme...",
  "genres": [
    { "id": 18, "name": "Drama" }
  ],
  "runtime": 125,
  "backdrop_path": "/caminho/para/imagem.jpg"
}...
```


<div align="center"> 

`Listar filmes por categoria (ex: ação, comédia, etc.)`
</div>

```https
GET https://api.themoviedb.org/3/movie/12345?api_key=SUA_API_KEY&language=pt-BR
```

<div align="center"> 

Retorna uma lista de filmes filtrados por um gênero específico (ação, comédia, terror, etc).
</div>

```json
{
  "results": [
    {
      "id": 67890,
      "title": "Filme de Ação",
      "vote_average": 8.0
    },
    ...
  ]
}
```




<h2 id="Contato" align="center">
  <img src="./src/assets/icons/film-solid.svg" width="25px"> Contato
</h2>

<!-- minhas redes  --> 
  <div align="center"> 

  <a href="https://mail.google.com/mail/?view=cm&to=glauedson18s@gmail.com" target="_blank">
    <img src="https://skillicons.dev/icons?i=gmail" />
  </a>ﾠ
  <a href="https://www.linkedin.com/in/glauedson-carlos-89875b258/" target="_blank">
    <img src="https://skillicons.dev/icons?i=linkedin" />
  </a>ﾠ
  <a href="https://github.com/Glauedson" target="_blank">
    <img src="https://skillicons.dev/icons?i=github" />
  </a>

  </div>
  <br>

<img src="https://muellerjoinville.com.br/wp-content/uploads/2022/02/banner-cinema.jpg.webp">