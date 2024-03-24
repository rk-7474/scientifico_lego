
# Use the official Node.js image as the base
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the SvelteKit app
RUN npm run build

ENV ORIGIN=http://localhost:3000

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "build"]
