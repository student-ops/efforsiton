FROM node:18.14

# Set the working directory to /app
RUN mkdir -p /app/prisma
RUN mkdir -p /app/src
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./src /app/src
COPY ./*.json /app
COPY ./prisma/schema.prisma /app/prisma
COPY ./*.js /app
COPY .env /app

# Install any needed packages specified in package.json
RUN npm install -g npm@9.5.1 -y
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV production

# Run app.js when the container launches
CMD ["npm","run","start:migrate:prod"]