package com.draeb.shoppinglist;

import org.springframework.http.HttpStatus;

public class APIResponse<T> {

    private int statusCode;
    private String status;
    private String message;
    private T data;

    public APIResponse(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
        this.status = HttpStatus.valueOf(statusCode).getReasonPhrase();
    }

    public APIResponse(int statusCode, String message, T data) {
        this.statusCode = statusCode;
        this.message = message;
        this.status = HttpStatus.valueOf(statusCode).getReasonPhrase();
        this.data = data;
    }

    public APIResponse() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
