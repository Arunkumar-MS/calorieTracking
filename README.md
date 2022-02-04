# Calorie Tracking Web App & API

### Below are the stpes help you to run BE API,FE web app, E2E test and unit tests

#### How take code to local
- Goto terminal and paste below clone command 
    ```sh
    git@git.toptal.com:screening/Arunkumar.git
    ```

#### Backend API
- Now go inside server folder
- Install packges by running `yarn`
- Run Api by running `yarn start`
- Now you should see message `Server is Running @ 3001`


#### FE React APP
- Open new terminal Start with root folder of this project
- Install packges by running `yarn`
- Run Api by running `yarn start`
- Now you should see `started server on 0.0.0.0:3000, url: http://localhost:3000`
- Just vist `http://localhost:3000` you should be able to start using the app now.

#### Data for login(Please use below tokens for login)
- User token
    `yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MWY5NjM4NGMyZWEzNzlhNjBkODc5OWEiLCJuYW1lIjoiRGF2aWQiLCJpYXQiOjE2NDM3MzM4OTJ9.FRsShLhoFfOiEtxIt79VywdmWklRAzij5ojQQxarcY8`
- Admin token
   `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MWY5NjM4YWMyZWEzNzlhNjBkODc5OWUiLCJuYW1lIjoiQXJ1biIsImlhdCI6MTY0MzczMzg5OH0.NsK00e4tCIJDH1XZYdvsT6qF2zHdoM4gOcXuewaopfE`



#### Running E2E tests
- While running app
- Open new terminal
- Goto `e2eTesting` folder
- Install packges by running `yarn`
- Run E2E test by using `yarn e2e`
- If you what to see visually how its tesing on browser please use below command
- `yarn e2e:ui` 

#### Running FE Unit tests
- Goto root folder of web app
- Run `yarn test`
- Now you should be able to see tests running on terminal


#### Running BE Unit tests
- Go inside `server` folder
- Run `yarn test`
- Now you should be able to see tests running on terminal


#### Lighthouse report


##### Desktop with 50 food entry on home page
<img src="lighthouseReport/desktop_with_50_food_entry.jpeg" width="200" height="300"/>



##### Mobile with 50 food entry on home page
<img src="llighthouseReport/mobile_with_50_food_entry.png" width="200" height="300"/>

