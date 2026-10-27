# Multi-stage Dockerfile for Spring Boot Backend
# Stage 1: Build the application with Maven
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build

WORKDIR /app

# Cache Maven dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and package application jar
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal Java 21 Runtime Environment
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create a non-root system user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy packaged jar from build stage
COPY --from=build /app/target/hostel-management-backend-*.jar app.jar

# Expose standard Spring Boot HTTP port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
