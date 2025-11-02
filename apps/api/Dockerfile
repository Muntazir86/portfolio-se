# Use Debian-based Node.js image instead of Alpine
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /work

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Copy package.json and package-lock.json of root
COPY package*.json ./
COPY turbo.json ./

# Copy package.json and package-lock.json of the api app
COPY apps/api/package*.json ./apps/api/

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY apps/api ./apps/api/

# Build the api project
RUN npm run build --filter=api

# Use a lightweight Debian-based Node.js image for the final stage
FROM node:20-slim AS final

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /work/apps/api/dist ./dist
COPY --from=build /work/apps/api/package*.json ./
COPY --from=build /work/node_modules ./node_modules

# Install Chromium dependencies BEFORE copying package files
RUN apt-get update && apt-get install -y \
    gconf-service \
    libgbm-dev \
    libasound2 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    libappindicator1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    wget \
    && rm -rf /var/lib/apt/lists/*



# Create a non-root user and give ownership
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /usr/src/app

# Switch to non-root user
USER pptruser

# Expose the port the app runs on
EXPOSE 3100

# Command to run the application
CMD ["node", "dist/main.js"]