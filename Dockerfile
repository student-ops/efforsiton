FROM node:18-alpine3.16

# Set the working directory to /app
RUN mkdir -p /app

WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in package.json
# RUN npm install -g npm@9.6.1 -y
RUN npm install
RUN npm run build

# Make port 80 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV production

# Run app.js when the container launches
CMD ["npm","run","start:migrate:prod"]
# CMD ["npm","run","start"]