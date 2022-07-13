# tiktok
# Enviroment
Nodejs >= 16.0.0<br/>
MongoDB >= 5.0<br/>
Docker<br/>
Elasticsearch<br/>
Redis<br/>
Bunny (using for store video )<br/>
# Set up 
* git clone git@github.com:ntd806/tiktokBackEnd.git<br/>
cd root folder<br/>
* To start our app, write the following command in your terminal<br/>
docker-compose up dev<br/>
* This will start it in development mode<br/>
docker-compose up prod<br/>
* This will start it in development mode<br/>
# docker ssh into node container
docker ps<br/>
docker exec -it mycontainer sh ##for alpine<br/>
# Feature modules
  * To create a module using the CLI, simply execute the $ nest g module cats command.<br/>
  * To create a controller using the CLI, simply execute the $ nest g controller cats command.<br/>
  * To create a service using the CLI, simply execute the $ nest g service cats command.<br/>
# Do a Clean Restart of a Docker Instance
Stop the container(s) using the following command:<br/>
docker-compose down<br/>
To delete all the images:<br/>
docker rmi -f $(docker images -aq)<br/>
Delete all containers using the following command:<br/>
docker rm -f $(docker ps -a -q)<br/>
Delete all volumes using the following command:<br/>
docker volume rm $(docker volume ls -q)<br/>
Restart the containers using the following command:<br/>
docker-compose up dev<br/>
Use this to delete everything:<br/>
docker system prune -a --volumes