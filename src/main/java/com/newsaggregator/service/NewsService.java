package com.newsaggregator.service;

import com.newsaggregator.dto.Article;
import com.newsaggregator.dto.ArticleWithSummary;
import com.newsaggregator.dto.NewsApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NewsService {
    @Value("${newsapi.key}")
    private String apiKey;

    private static final String BASE_URL = "https://newsapi.org/v2";
    private final RestTemplate restTemplate;
    private final GroqService groqService;

    public NewsService(RestTemplate restTemplate, GroqService groqService) {
        this.restTemplate = restTemplate;
        this.groqService = groqService;
    }

    public List<Article> getTopHeadlines(String country, String category) {
        String url = String.format("%s/top-headlines?country=%s&category=%s&apiKey=%s",
                BASE_URL, country, category, apiKey);

        try {
            NewsApiResponse response = restTemplate.getForObject(url, NewsApiResponse.class);
            return response != null ? response.getArticles() : Collections.emptyList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    public List<Article> getTop10News(String country) {
        String url = String.format("%s/top-headlines?country=%s&pageSize=10&apiKey=%s",
                BASE_URL, country, apiKey);

        try {
            NewsApiResponse response = restTemplate.getForObject(url, NewsApiResponse.class);
            return response != null ? response.getArticles() : Collections.emptyList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    public List<ArticleWithSummary> getTop10NewsWithSummaries(String country) {
        List<Article> articles = getTop10News(country);
        return articles.stream()
                .map(article -> {
                    ArticleWithSummary articleWithSummary = new ArticleWithSummary(article);
                    String summary = groqService.generateSummary(
                            article.getTitle(),
                            article.getDescription(),
                            article.getContent()
                    );
                    articleWithSummary.setAiSummary(summary);
                    return articleWithSummary;
                })
                .collect(Collectors.toList());
    }

    public List<ArticleWithSummary> getCategoryNewsWithSummaries(String country, String category) {
        List<Article> articles = getTopHeadlines(country, category);
        return articles.stream()
                .limit(10)
                .map(article -> {
                    ArticleWithSummary articleWithSummary = new ArticleWithSummary(article);
                    String summary = groqService.generateSummary(
                            article.getTitle(),
                            article.getDescription(),
                            article.getContent()
                    );
                    articleWithSummary.setAiSummary(summary);
                    return articleWithSummary;
                })
                .collect(Collectors.toList());
    }

    public List<Article> searchNews(String query, String sortBy, int pageSize) {
        String url = String.format("%s/everything?q=%s&sortBy=%s&pageSize=%d&apiKey=%s",
                BASE_URL, query, sortBy, pageSize, apiKey);

        try {
            NewsApiResponse response = restTemplate.getForObject(url, NewsApiResponse.class);
            return response != null ? response.getArticles() : Collections.emptyList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}