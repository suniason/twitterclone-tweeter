Server has not been initialized for the app. However, this can be cloned and connected to localhost.

To run the application: 

1. Clone the application on your local device(computer/laptop)

2. Run 
```
npm i
```
or
```
npm install
```
in your terminal

3. Create a mongoDB database and connect it to the app by changing the database url in the .env file.

4. Initialize the schema to your database by running 
```
npm prisma db push
```

5. Run
```
npm run dev
```
