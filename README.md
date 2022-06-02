# Todo app

Para rodar a aplicação, você precisa ter o Docker e o NPM instalado.

<br>
Tendo eles instalados, basta rodar em seu terminal Unix:

<br>

```
sh ./runAll.sh
```

<br>

O backend iniciou na porta 3000 e o frontend na porta 3001!

<br>
Para cancelar os processos rodando, basta colar em seu terminal:

<br>

```
pm2 delete all && \
docker stop -f $(docker ps -a -q) && docker rm -f $(docker ps -a -q)
```

<br>
