Dave's Homepage 
===========

I spoke to myself one day and said, "I should have a homepage on the World Wide Web!"

This for me to play with code...
Especially with CSS and Node.

## Local running
```
docker build -t homepage-of-dave . 
docker run -d -p 5000:5000 --env NODE_ENV=LOCAL homepage-of-dave:latest
```

## Running in AWS
For now, just this:

```
sudo docker run -d -p 5000:5000 --env NODE_ENV=LOCAL --log-driver=awslogs --log-opt awslogs-region=us-east-1 --log-opt awslogs-group=/ruachreadings ghcr.io/shekelator/homepage-of-dave:master
```