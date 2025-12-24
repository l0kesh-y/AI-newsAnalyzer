package com.newsaggregator.service;

import com.newsaggregator.dto.GroqRequest;
import com.newsaggregator.dto.GroqResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class GroqService {
    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.model}")
    private String model;

    private final RestTemplate restTemplate;

    public GroqService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String generateSummary(String title, String description, String content) {
        try {
            String prompt = buildSummaryPrompt(title, description, content);
            
            GroqRequest request = new GroqRequest();
            request.setModel(model);
            request.setMessages(Collections.singletonList(
                new GroqRequest.Message("user", prompt)
            ));
            request.setTemperature(0.7);
            request.setMax_tokens(150);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<GroqRequest> entity = new HttpEntity<>(request, headers);
            GroqResponse response = restTemplate.postForObject(apiUrl, entity, GroqResponse.class);

            if (response != null && !response.getChoices().isEmpty()) {
                return response.getChoices().get(0).getMessage().getContent();
            }
        } catch (Exception e) {
            System.err.println("Error generating summary: " + e.getMessage());
        }
        return null;
    }

    private String buildSummaryPrompt(String title, String description, String content) {
        StringBuilder prompt = new StringBuilder("Summarize this news article in 2-3 concise sentences:\n\n");
        prompt.append("Title: ").append(title).append("\n");
        if (description != null && !description.isEmpty()) {
            prompt.append("Description: ").append(description).append("\n");
        }
        if (content != null && !content.isEmpty()) {
            prompt.append("Content: ").append(content.substring(0, Math.min(content.length(), 500))).append("\n");
        }
        return prompt.toString();
    }
}
