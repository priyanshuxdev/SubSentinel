FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

COPY package.json ./

RUN pnpm install

COPY . .

EXPOSE 5600

CMD ["pnpm", "dev"]
