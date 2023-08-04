FROM openjdk:17-jdk-alpine
RUN mkdir -p /app
COPY target/shoppinglist-0.0.1.jar /app
WORKDIR /app
EXPOSE 8080
CMD ["java", "-jar",  "shoppinglist-0.0.1.jar"]
