Building the Docker image: 

`docker image build -t lpp-parser:1.0.0 .`

Running the Docker image:

`docker container run --publish 8082:8082 --detach --name lpp-parser lpp-parser:1.0.0`

Removing the Docker image:

`docker container remove --force lpp-parser`