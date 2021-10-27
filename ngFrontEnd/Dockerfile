### STAGE 1:BUILD ###
# Defining a node image to be used as an alias of "build"
# Used to build and compile the code 
FROM node:12.14-alpine AS build

# Create a Virtual directory inside the docker image
WORKDIR /dist/src/app

# Run command in Virtual directory
RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY . .
RUN npm install
RUN npm run build 


### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:latest AS ngi
# Copying compiled code and nginx config to different folder
COPY --from=build /dist/src/app/dist/ngFrontEnd /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# Expose a port inside the container 
EXPOSE 4200