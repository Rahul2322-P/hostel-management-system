package com.klef.soa.docker.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Standard error response envelope
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "Standardized error structure")
public class ErrorResponse {

    @Schema(description = "Timestamp when error occurred")
    private LocalDateTime timestamp;

    @Schema(description = "HTTP status code", example = "400")
    private int status;

    @Schema(description = "HTTP status description", example = "Bad Request")
    private String error;

    @Schema(description = "User-friendly error message", example = "Hostel not found with id: 99")
    private String message;

    @Schema(description = "Request URI path where error occurred", example = "/api/hostels/99")
    private String path;

    @Schema(description = "Field-specific validation failure details")
    private Map<String, String> fieldErrors;

    public ErrorResponse() {
        this.timestamp = LocalDateTime.now();
    }

    public ErrorResponse(int status, String error, String message, String path) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    public ErrorResponse(int status, String error, String message, String path, Map<String, String> fieldErrors) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
        this.fieldErrors = fieldErrors;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Map<String, String> getFieldErrors() {
        return fieldErrors;
    }

    public void setFieldErrors(Map<String, String> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }
}
