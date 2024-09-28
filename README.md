# prejeto_filmes_api
apis do projeto_filmes

variaveis de ambiente exemplo
PORT=3001

# Database create settings

\! md C:\BancoProjetoFilmes 
create tablespace SpaceProjetoFilmes location 'C:\BancoProjetoFilmes'; 
set default_tablespace = SpaceProjetoFilmes; 
create user AdmFilmesOnline encrypted password 'safeps123'; 
alter user AdmFilmesOnline with superuser; 
create database projeto_filmes with owner=AdmFilmesOnline;
