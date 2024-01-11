package com.main.realestate.entity.User;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionHandler extends ResponseEntityExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler({ UserNotFoundException.class})
    protected ResponseEntity<Object> handleNotFound (
            Exception ex, WebRequest request) {
        return handleExceptionInternal(ex, "User not found",
                new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }
}
