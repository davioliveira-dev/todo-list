echo "starting sql server, just wait..."
ls /db
sleep 45s
echo "running set up script"
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P '#@Teste2022' -d master -i /db/init.sql
