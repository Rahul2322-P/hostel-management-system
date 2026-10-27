package com.klef.soa.docker.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * OpenAPI 3.0 / Swagger UI Configuration
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Hostel Management System REST API")
                        .version("1.0.0")
                        .description("RESTful API documentation for the Hostel Management System college examination project.\n\n" +
                                "**Student Name:** P Rahul\n" +
                                "**Student ID:** P2400032050\n" +
                                "**Section:** S05\n" +
                                "**Technology Stack:** Java 21, Spring Boot 3, Spring Data JPA, MySQL, Docker")
                        .contact(new Contact()
                                .name("P Rahul (P2400032050)")
                                .email("rahulshetty2322@gmail.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://springdoc.org")))
                .servers(List.of(
                        new Server().url("http://localhost:8081").description("Local Development Server (Port 8081)"),
                        new Server().url("http://localhost:8080").description("Default Container Port (Port 8080)"),
                        new Server().url("/").description("Docker / Reverse Proxy Server")
                ));
    }
}
