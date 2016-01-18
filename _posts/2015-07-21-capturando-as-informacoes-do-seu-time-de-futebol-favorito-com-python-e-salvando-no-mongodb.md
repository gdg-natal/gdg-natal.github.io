---
layout: post
title: Capturando as informações do seu time de futebol favorito com python e salvando no mongodb
categories:
- Python
tags:
- python
- mongodb
status: publish
type: post
published: true
meta: {}
author: Hudson Brendon
---

![brasileirao](http://hudsonbrendon.github.io/blog/images/brasileirao.png)

Há pouco tempo atrás, estava a procura de uma API que me retornasse informações sobre futebol, após uma longa pesquisa, acabei descobrino a [futebits](http://www.futebits.com.br/), com ela você pode saber o próximo jogo de um determinado time em um campeonato específico, o jogo anterior desse time nesse mesmo campeonato, sua situação atual na tabela do brasileirão, etc.

# Acessando a API

Acessaremos a API usando a biblioteca [requests](http://docs.python-requests.org/en/latest/), a instalação via pip resume-se à:

```bash
$ pip install requests
```
Com a biblioteca devidamente instalada, acessaremos as informações das times, os times são identificados por ids, a URL onde devemos busca as informações é essa: [http://www.futebits.com.br/ws/api/getDadosEquipe/id](http://www.futebits.com.br/ws/api/getDadosEquipe/id) onde o id, será um número identificando um determinado time.

Para facilitar o processo, criaremos uma função, que recebe como parâmetro um id, e retorna o json da requisição, dessa forma:

```python
import requests # importando a biblioteca

URL = 'http://www.futebits.com.br/ws/api/' # URL base

def dados_equipe(id):
  response = requests.get(URL + 'getDadosEquipe/%d' % id).json() # Fazendo a requisição e convertendo o resultado para um dicionário do python
  return response # retorna a resposta
```

Com a função pronta executaremos a mesma passando como parâmetro o id 40, que corresponde ao ABC FC do RN, o maior time do meu estado, por qual sinto uma afinidade.

```python
>>> dados_equipe(40)
```
O resultado da requisição será algo parecido com isso:

```javascript
{  
   u'estadio_oficial':u'Est\xe1dio Maria Lamas Farache',
   u'ultimo_jogo':{  
      u'hora':      u'19:30:00      ', u'      gols_mandante':1,
      u'escudo_equipe_mandante':{  
         u'16x16':         u'http://www.futebits.com.br/content/escudos/16x16/atleticogoianiense.png',
         u'150x150':         u'http://www.futebits.com.br/content/escudos
/150x150/atleticogoianiense.png',
         u'35x35':         u'http://www.futebits.com.br/content/escudos/35x35/atleticogoianiense.png',
         u'50x50':         u'http://www.
futebits.com.br/content/escudos/50x50/atleticogoianiense.png',
         u'100x100':         u'http://www.futebits.com.br/content/escudos/100x100/atleticogoianie
nse.png',
         u'25x25':         u'http://www.futebits.com.br/content/escudos/25x25/atleticogoianiense.png',
         u'200x200':         u'http://www.futebits.com.br/conten
t/escudos/200x200/atleticogoianiense.png',
         u'75x75':         u'http://www.futebits.com.br/content/escudos/75x75/atleticogoianiense.png'
      },
      u'escudo_equi
pe_visitante':{  
         u'16x16':         u'http://www.futebits.com.br/content/escudos/16x16/abc.png',
         u'150x150':         u'http://www.futebits.com.br/content/escudos
/150x150/abc.png',
         u'35x35':         u'http://www.futebits.com.br/content/escudos/35x35/abc.png',
         u'50x50':         u'http://www.futebits.com.br/content/escudo
s/50x50/abc.png',
         u'100x100':         u'http://www.futebits.com.br/content/escudos/100x100/abc.png',
         u'25x25':         u'http://www.futebits.com.br/content/esc
udos/25x25/abc.png',
         u'200x200':         u'http://www.futebits.com.br/content/escudos/200x200/abc.png',
         u'75x75':         u'http://www.futebits.com.br/content/
escudos/75x75/abc.png'
      },
      u'rodada':11,
      u'estado':u'Goi\xe1s',
      u'cidade':u'Goi\xe2nia',
      u'gols_visitante':2,
      u'nome_equipe_mandante':u'Atl\
xe9tico-GO',
      u'nome_equipe_visitante':u'ABC',
      u'pais':u'Brasil',
      u'divisao':u'S\xe9rie B',
      u'data':u'07/07/2015',
      u'campeonato':u'Campeona
to Brasileiro',
      u'edicao':2015,
      u'grupo':u'Grupo Unico',
      u'estadio':u'Antonio Accioly',
      u'fase':u'Turno'
   },
   u'twitter':   u'http://www.twitter
.com/abcfc',
   u'site':u'www.abcfc.com.br',
   u'escudo':{  
      u'16x16':      u'http://www.futebits.com.br/content/escudos/16x16/abc.png',
      u'150x150':      u'htt
p://www.futebits.com.br/content/escudos/150x150/abc.png',
      u'35x35':      u'http://www.futebits.com.br/content/escudos/35x35/abc.png',
      u'50x50':      u'ht
tp://www.futebits.com.br/content/escudos/50x50/abc.png',
      u'100x100':      u'http://www.futebits.com.br/content/escudos/100x100/abc.png',
      u'25x25':      u
'http://www.futebits.com.br/content/escudos/25x25/abc.png',
      u'200x200':      u'http://www.futebits.com.br/content/escudos/200x200/abc.png',
      u'75x75':      u'http://www.futebits.com.br/content/escudos/75x75/abc.png'
   },
   u'estadio_oficial_capacidade':18000,
   u'estadio_mandante_alcunha':None,
   u'id':40,
   u'competicoes_andamento':[  
      {  
         u'campeonato':u'Campeonato Brasileiro',
         u'divisao':u'S\xe9rie B',
         u'fase':u'Turno',
         u'grupo':u'Grupo Unico
',
         u'edicao':2015
      }
   ],
   u'nome':u'ABC Futebol Clube',
   u'estado':u'Rio Grande do Norte',
   u'estadio_mandante_pais':None,
   u'estadio_oficial_alcun
ha':u'Frasqueir\xe3o',
   u'estadio_mandante_dimensoes':None,
   u'estadio_oficial_cidade':u'Natal',
   u'estadio_oficial_dimensoes':u'105x68',
   u'es
tadio_mandante_estado':None,
   u'estadio_mandante':None,
   u'pais':u'Brasil',
   u'estadio_oficial_pais':u'Brasil',
   u'estadio_oficial_estado':u'R
io Grande do Norte',
   u'estadio_mandante_capacidade':None,
   u'cidade':u'Natal',
   u'proximo_jogo':{  
      u'hora':      u'19:30:00      ', u'      escudo_equipe_mandant
e':{  
         u'16x16':         u'http://www.futebits.com.br/content/escudos/16x16/abc.png',
         u'150x150':         u'http://www.futebits.com.br/content/escudos/150x150/ab
c.png',
         u'35x35':         u'http://www.futebits.com.br/content/escudos/35x35/abc.png',
         u'50x50':         u'http://www.futebits.com.br/content/escudos/50x50/abc
.png',
         u'100x100':         u'http://www.futebits.com.br/content/escudos/100x100/abc.png',
         u'25x25':         u'http://www.futebits.com.br/content/escudos/25x25/
abc.png',
         u'200x200':         u'http://www.futebits.com.br/content/escudos/200x200/abc.png',
         u'75x75':         u'http://www.futebits.com.br/content/escudos/75x
75/abc.png'
      },
      u'escudo_equipe_visitante':{  
         u'16x16':         u'http://www.futebits.com.br/content/escudos/16x16/santa_cruz.png',
         u'150x150':         u'http://w
ww.futebits.com.br/content/escudos/150x150/santa_cruz.png',
         u'35x35':         u'http://www.futebits.com.br/content/escudos/35x35/santa_cruz.png',
         u'50x
50':         u'http://www.futebits.com.br/content/escudos/50x50/santa_cruz.png',
         u'100x100':         u'http://www.futebits.com.br/content/escudos/100x100/santa
_cruz.png',
         u'25x25':         u'http://www.futebits.com.br/content/escudos/25x25/santa_cruz.png',
         u'200x200':         u'http://www.futebits.com.br/content/escu
dos/200x200/santa_cruz.png',
         u'75x75':         u'http://www.futebits.com.br/content/escudos/75x75/santa_cruz.png'
      },
      u'rodada':7,
      u'estado':u'Rio Gran
de do Norte',
      u'cidade':u'Natal',
      u'nome_equipe_mandante':u'ABC',
      u'nome_equipe_visitante':u'Santa Cruz',
      u'pais':u'Brasil',
      u'divisao':u'
S\xe9rie B',
      u'data':u'09/06/2015',
      u'campeonato':u'Campeonato Brasileiro',
      u'edicao':2015,
      u'grupo':u'Grupo Unico',
      u'estadio':u'Frasquei
r\xe3o',
      u'fase':u'Turno'
   },
   u'estadio_mandante_cidade':None,
   u'nome_popular':u'ABC'
}
```
Note que é retornado várias informações, estado de origem, o escudo do time em vários tamanhos, campeonatos no qual o time está participando no momento, etc, são algumas delas.

Como usamos a função *json()* na requisição, o python nos retorna um dicionário, para verificarmos as chaves desse dicionário, basta:

```python
>>> abc = dados_equipe(40)
>>> abc.keys()
[u'estadio_oficial', u'ultimo_jogo', u'twitter', u'site', u'escudo', u'estadio_oficial_capacidade', u'estadio_mandante_alcunha', u'id', u'competicoes_andamento', u'nome', u'estado', u'estadio_mandante_pais', u'estadio_oficial_alcunha', u'estadio_mandante_dimensoes', u'estadio_oficial_cidade', u'estadio_oficial_dimensoes', u'estadio_mandante_estado', u'estadio_mandante', u'pais', u'estadio_oficial_pais', u'estadio_oficial_estado', u'estadio_mandante_capacidade', u'cidade', u'proximo_jogo', u'estadio_mandante_cidade', u'nome_popular']
```
Agora podemos verificar as informações de forma mais clara:

```python
>>> abc['estado']
u'Rio Grande do Norte'
>>> abc['cidade']
u'Natal'
>>> abc['estadio_oficial']
u'Estádio Maria Lamas Farache'
```
Simples né? E se isso tudo ficar mais simples ainda? Tive a iniciativa de fazer uma biblioteca em python para consumir os dados da API do futebits, uma biblioteca simples, mais que me serve perfeitamente, a [pyfutebits](https://github.com/hudsonbrendon/pyfutebits) conta com um conjunto de métodos que proporciona a requisição de todos os dados disponíveis na futebits, a instalação via pip é bem simples:

```python
>>> pip install pyfutebits
```
Com a biblioteca devidamente instalada, vamos refazer o exemplo acima, se quiséssemos requisitar as informações do ABC, seria dessa forma:

```python
>>> from pyfutebits.futebits import Team

>>> abc = Team()
>>> abc.data_team(40)
```
O resultado será o mesmo json retornado anteriormente.

E se quiséssemos saber o próximo jogo do ABC? Simples.

```python
>>> abc.next_match(40)
```
O resultado será:

```javascript
{  
    u'estadio_oficial':u'Est\xe1dio Maria Lamas Farache',
    u'ultimo_jogo':{  
        u'hora':        u'19:30:00        ', u'        gols_mandante':1,
        u'escudo_equipe_mandante':{  
            u'16x16':            u'http://www.futebits.com.br/content/escudos/16x16/atleticogoianiense.png',
            u'150x150':            u'http://www.futebits.com.br/content/escudos
/150x150/atleticogoianiense.png',
            u'35x35':            u'http://www.futebits.com.br/content/escudos/35x35/atleticogoianiense.png',
            u'50x50':            u'http://www.
futebits.com.br/content/escudos/50x50/atleticogoianiense.png',
            u'100x100':            u'http://www.futebits.com.br/content/escudos/100x100/atleticogoianie
nse.png',
            u'25x25':            u'http://www.futebits.com.br/content/escudos/25x25/atleticogoianiense.png',
            u'200x200':            u'http://www.futebits.com.br/conten
t/escudos/200x200/atleticogoianiense.png',
            u'75x75':            u'http://www.futebits.com.br/content/escudos/75x75/atleticogoianiense.png'
        },
        u'escudo_equi
pe_visitante':{  
            u'16x16':            u'http://www.futebits.com.br/content/escudos/16x16/abc.png',
            u'150x150':            u'http://www.futebits.com.br/content/escudos
/150x150/abc.png',
            u'35x35':            u'http://www.futebits.com.br/content/escudos/35x35/abc.png',
            u'50x50':            u'http://www.futebits.com.br/content/escudo
s/50x50/abc.png',
            u'100x100':            u'http://www.futebits.com.br/content/escudos/100x100/abc.png',
            u'25x25':            u'http://www.futebits.com.br/content/esc
udos/25x25/abc.png',
            u'200x200':            u'http://www.futebits.com.br/content/escudos/200x200/abc.png',
            u'75x75':            u'http://www.futebits.com.br/content/
escudos/75x75/abc.png'
        },
        u'rodada':11,
        u'estado':u'Goi\xe1s',
        u'cidade':u'Goi\xe2nia',
        u'gols_visitante':2,
        u'nome_equipe_mandante':u'Atl\
xe9tico-GO',
        u'nome_equipe_visitante':u'ABC',
        u'pais':u'Brasil',
        u'divisao':u'S\xe9rie B',
        u'data':u'07/07/2015',
        u'campeonato':u'Campeona
to Brasileiro',
        u'edicao':2015,
        u'grupo':u'Grupo Unico',
        u'estadio':u'Antonio Accioly',
        u'fase':u'Turno'
    },
    u'twitter':    u'http://www.twitter
.com/abcfc',
    u'site':u'www.abcfc.com.br',
    u'escudo':{  
        u'16x16':        u'http://www.futebits.com.br/content/escudos/16x16/abc.png',
        u'150x150':        u'htt
p://www.futebits.com.br/content/escudos/150x150/abc.png',
        u'35x35':        u'http://www.futebits.com.br/content/escudos/35x35/abc.png',
        u'50x50':        u'ht
tp://www.futebits.com.br/content/escudos/50x50/abc.png',
        u'100x100':        u'http://www.futebits.com.br/content/escudos/100x100/abc.png',
        u'25x25':        u
'http://www.futebits.com.br/content/escudos/25x25/abc.png',
        u'200x200':        u'http://www.futebits.com.br/content/escudos/200x200/abc.png',
        u'75x75':        u'http://www.futebits.com.br/content/escudos/75x75/abc.png'
    },
    u'estadio_oficial_capacidade':18000,
    u'estadio_mandante_alcunha':None,
    u'id':40,
    u'competicoes_andamento':[  
        {  
            u'campeonato':u'Campeonato Brasileiro',
            u'divisao':u'S\xe9rie B',
            u'fase':u'Turno',
            u'grupo':u'Grupo Unico
',
            u'edicao':2015
        }
    ],
    u'nome':u'ABC Futebol Clube',
    u'estado':u'Rio Grande do Norte',
    u'estadio_mandante_pais':None,
    u'estadio_oficial_alcun
ha':u'Frasqueir\xe3o',
    u'estadio_mandante_dimensoes':None,
    u'estadio_oficial_cidade':u'Natal',
    u'estadio_oficial_dimensoes':u'105x68',
    u'es
tadio_mandante_estado':None,
    u'estadio_mandante':None,
    u'pais':u'Brasil',
    u'estadio_oficial_pais':u'Brasil',
    u'estadio_oficial_estado':u'R
io Grande do Norte',
    u'estadio_mandante_capacidade':None,
    u'cidade':u'Natal',
    u'proximo_jogo':{  
        u'hora':        u'19:30:00        ', u'        escudo_equipe_mandant
e':{  
            u'16x16':            u'http://www.futebits.com.br/content/escudos/16x16/abc.png',
            u'150x150':            u'http://www.futebits.com.br/content/escudos/150x150/ab
c.png',
            u'35x35':            u'http://www.futebits.com.br/content/escudos/35x35/abc.png',
            u'50x50':            u'http://www.futebits.com.br/content/escudos/50x50/abc
.png',
            u'100x100':            u'http://www.futebits.com.br/content/escudos/100x100/abc.png',
            u'25x25':            u'http://www.futebits.com.br/content/escudos/25x25/
abc.png',
            u'200x200':            u'http://www.futebits.com.br/content/escudos/200x200/abc.png',
            u'75x75':            u'http://www.futebits.com.br/content/escudos/75x
75/abc.png'
        },
        u'escudo_equipe_visitante':{  
            u'16x16':            u'http://www.futebits.com.br/content/escudos/16x16/santa_cruz.png',
            u'150x150':            u'http://w
ww.futebits.com.br/content/escudos/150x150/santa_cruz.png',
            u'35x35':            u'http://www.futebits.com.br/content/escudos/35x35/santa_cruz.png',
            u'50x
50':            u'http://www.futebits.com.br/content/escudos/50x50/santa_cruz.png',
            u'100x100':            u'http://www.futebits.com.br/content/escudos/100x100/santa
_cruz.png',
            u'25x25':            u'http://www.futebits.com.br/content/escudos/25x25/santa_cruz.png',
            u'200x200':            u'http://www.futebits.com.br/content/escu
dos/200x200/santa_cruz.png',
            u'75x75':            u'http://www.futebits.com.br/content/escudos/75x75/santa_cruz.png'
        },
        u'rodada':7,
        u'estado':u'Rio Gran
de do Norte',
        u'cidade':u'Natal',
        u'nome_equipe_mandante':u'ABC',
        u'nome_equipe_visitante':u'Santa Cruz',
        u'pais':u'Brasil',
        u'divisao':u'
S\xe9rie B',
        u'data':u'09/06/2015',
        u'campeonato':u'Campeonato Brasileiro',
        u'edicao':2015,
        u'grupo':u'Grupo Unico',
        u'estadio':u'Frasquei
r\xe3o',
        u'fase':u'Turno'
    },
    u'estadio_mandante_cidade':None,
    u'nome_popular':u'ABC'
}
```

# Salvando as requisições no mongodb

Como expliquei no post [anterior](http://hudsonbrendon.com/trabalhando-com-python-e-mongodb.html), o mongodb trabalha com documentos, esses documentos são simples jsons, como o resultado das requisições também são simples jsons, podemos salvar a requisição diretamente no mongodb. Se você ainda não sabe como trabalhar com python e mongodb, leia meu post [anterior](http://hudsonbrendon.com/trabalhando-com-python-e-mongodb.html) e em seguida volte aqui. Porém não tem segredo nenhum, como em qualquer outro banco de dados precisamos de uma biblioteca que faz a comunicação entre o python e o mongodb, para o mongodb temos a pymongo, a instalação via pip fica.

```python
>>> pip install pymongo
```

Com a biblioteca devidamente instalada, criamos a conexão dessa forma.

```python
>>> from pyfutebits.futebits import Team
>>> import pymongo
>>> from pymongo import MongoClient

>>> cliente = MongoClient('localhost', 27017) # Conectando ao mongo
```

Com a conexão criada, selecionamos um banco, e uma collection para salvar os dados.

```python
>>> banco = cliente.test_database # Selecionando o banco
>>> times = banco.times # Selecionando a collection
```
Por fim, salvamos a requisição no banco, utilizarei o método *identifier_team* da pyfutebits, que me retorna as informações de todos os times.

```python
>>> team = Team() # Criando um objeto

>>> for i in team.identifier_team().keys(): # Iterando sobre os ids
...    times.insert_one(team.data_team(int(i))) # Inseriondo os times um a um
```

# Buscando informações no banco

Para fazer buscas no mongodb, contamos com método *find_one*, que nos retorna um ínico objeto.

```python
>>> times.find_one({'nome_popular': 'ABC'}) # Buscando os times com o nome 'ABC'
```

E se quiséssemos todos os times de uma cidade especifica?

```python
>>> for time in times.find({'cidade': 'Natal'}): # Bucando por times da cidade de Natal
...   print time
```
# Conclusão

Como visto aqui, a biblioteca requests é uma ótima opção quando precisamos consumir API's Rests com python. Na minha opinião, é a melhor biblioteca para tal, tendo em vista a complexidade existente na urlib e urlib2. Além disso o mongodb se mostra uma otima opção em relação aos padrões engessados adotados pelos bancos relacionais.