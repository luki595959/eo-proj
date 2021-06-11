# Spustenie:
 1. rozbalit eo_app/db.zip (pre priglupavych v db.zip je subor db.sqlite a ten treba dat tam, kde je subor db.zip)
 2. eo_app/data/csv/ je zipko s csv datami aj to rozbalit (pre priglupavych v offer.zip su 2 csv subory, ktore treba dat tam, kde je subor offer.zip)
 3. nastavenie sa do adresara s apkou: ```cd eo_app```
 4. instalacia kniznic:  ```npm i```
 5. spustenie apky: ```npm start```
 6. apka bezi na *127.0.0.1:8080* alebo *localhost:8080* 
 ## Spustenie pomocou Docker:
  1. rozbalit eo_app/db.zip (pre priglupavych v db.zip je subor db.sqlite a ten treba dat tam, kde je subor db.zip)
  2. eo_app/data/csv/ je zipko s csv datami aj to rozbalit (pre priglupavych v offer.zip su 2 csv subory, ktore treba dat tam, kde je subor offer.zip)
  3. vytvorenie docker image-u: ```docker build -t eo-proj .```
  4. spustenie kontajnera: ```docker run -p 8080:8080 --name eo-proj-apka eo-proj```
  ---
  Tento image je dostupny aj na dockerhube: https://hub.docker.com/r/luki595959/eo-proj
  1. stahnutie image-u: ```docker pull luki595959/eo-proj:latest```
  2. sptustenie kontajnera: ```docker run -p 8080:8080 --name eo-proj-apka luki595959/eo-proj:latest```
 ## Apka je dostupna online - https://eo-proj.herokuapp.com/ 
