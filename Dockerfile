FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Copy Prisma schema (needed for postinstall script)
COPY prisma ./prisma

# Install dependencies (postinstall will run prisma generate)
RUN pnpm install

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Build the application
RUN pnpm run build

# Create directories for uploads and logs
RUN mkdir -p uploads logs

# Expose port
EXPOSE 3000

CMD ["node", "dist/src/main"]