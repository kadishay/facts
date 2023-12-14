# Fact Checker
## Initial setup
```
npm i
```

## Update prod
1. Remove node modules
2. Push change to machine
```
sudo scp -i fc.pem -r ./ ec2-user@ec2-54-166-206-77.compute-1.amazonaws.com:app
```
3. Connect to machine 
```
sudo ssh -i "fc.pem" ec2-user@ec2-54-166-206-77.compute-1.amazonaws.com
```
4. Re-run the application
```
cd app
nodemon server.js
```
5. Open browser - http://ec2-54-166-206-77.compute-1.amazonaws.com:3000/