package com.example.noticeboard.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
@Component
public class HttpLoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        ContentCachingRequestWrapper requestWrapper = new ContentCachingRequestWrapper(request);
        ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(response);

        long startTime = System.currentTimeMillis();
        filterChain.doFilter(requestWrapper, responseWrapper);
        long timeTaken = System.currentTimeMillis() - startTime;

        logRequest(requestWrapper);
        logResponse(responseWrapper, timeTaken);

        responseWrapper.copyBodyToResponse();
    }

    private void logRequest(ContentCachingRequestWrapper request) {
        String content = new String(request.getContentAsByteArray(), StandardCharsets.UTF_8);
        log.info("\n--- HTTP REQUEST ---\nMethod: {}\nURI: {}\nPayload: {}\n--------------------",
                request.getMethod(), request.getRequestURI(), content.isEmpty() ? "[empty]" : content);
    }

    private void logResponse(ContentCachingResponseWrapper response, long timeTaken) {
        String content = new String(response.getContentAsByteArray(), StandardCharsets.UTF_8);
        log.info("\n--- HTTP RESPONSE ---\nStatus: {}\nTime: {}ms\nPayload: {}\n---------------------",
                response.getStatus(), timeTaken, content.isEmpty() ? "[empty]" : content);
    }
}
