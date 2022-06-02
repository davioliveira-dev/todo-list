# /bin/bash
echo "Iniciando backend e container do docker com o SQL Server ..."
cd backend
make dbstart
npm i -g yarn pm2
yarn
pm2 start "npm run dev" --name todo-list-backend
cd ..
echo "Iniciando frontend ..."
cd frontend
yarn
pm2 start "npm run dev" --name todo-list-frontend
cd ..
echo "Feito! Agora para desligar tudo só digitar: pm2 stop all"