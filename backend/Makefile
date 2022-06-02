dbstart:
	docker-compose up -d
	docker exec -t sql-server-db sh /db/db-init.sh
	npx prisma migrate dev --name init
dbdown:
	docker stop sql-server-db
	docker rm sql-server-db