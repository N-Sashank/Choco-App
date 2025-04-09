# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Define build arguments
ARG DATABASE_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG NEXTAUTH_SECRET
ARG RAZORPAY_ID
ARG RAZORPAY_SECRET
ARG NEXT_PUBLIC_RAZORPAY_KEYID

# Set environment variables from build args
ENV DATABASE_URL=$DATABASE_URL
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV RAZORPAY_ID=$RAZORPAY_ID
ENV RAZORPAY_SECRET=$RAZORPAY_SECRET
ENV NEXT_PUBLIC_RAZORPAY_KEYID=$NEXT_PUBLIC_RAZORPAY_KEYID

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Copy environment variables from builder
COPY --from=builder /app/.env* ./

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
