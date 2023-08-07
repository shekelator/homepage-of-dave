# Use the official Amazon Linux image as the base image
FROM node:16.17.0-bullseye-slim

# Create a directory for the app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app to the container
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the app
CMD ["node", "server"]
