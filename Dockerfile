FROM node:18-alpine AS build

# install dependencies
WORKDIR /app

# Copy all local files into the image.
COPY . .

RUN npm ci

RUN npm run build

EXPOSE 3000
    
CMD ["node", "./build"]