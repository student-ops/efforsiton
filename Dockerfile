FROM node:18-alpine3.16

# Set the working directory to /app

RUN mkdir /workspace
WORKDIR /workspace
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install


# Copy the current directory contents into the container at /app
COPY . .
RUN rm -r .env
RUN mv .docker.env .env
RUN rm -r prisma/migrations

# Install any needed packages specified in package.json
RUN npm run build

# Make port 80 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV production


# Run app.js when the container launches
CMD ["npm","run","start:migrate:prod"]