## Simple Chat System



## Setting up the backend

- install composer packages
> composer install

- make a copy of .env.example and change it to .env
- update the .env for the nesessary informations
> database informations of your preferences

> pusher information details, just make something up but take note the PUSHER_APP_KEY cause we will need it in the frontend


- run the following command to prepare the backend
> php artisan key:generate

> php artisan migrate



## Setting up the frontend

- install npm packages
> npm run install

- go to src/plugins/pusher.js
> the key should be the same with the PUSHER_APP_KEY you put in the backend




## Important to note
- before running the server, it must be noted that
> the setup is intented for local environment

> you can use this for production/live, but you will need to tweak this, especially since that it's running in localhost

> browsers won't save a cookie if the website is running in port other than 80, hence you will auto logoff almost immediately

> and lastly, the command below must keep on running to be able you access the website



## Running the Backend
- start the laravel with the below command
> php artisan serve

- start the websocket/pusher with the below command
> php artisan websocket:serve


## Running the Frontend
- to start the frontend, plase run the following command
> npm run serve

- please note that I specifically specified to use the port 80, so that the auto logoff will be lessen

