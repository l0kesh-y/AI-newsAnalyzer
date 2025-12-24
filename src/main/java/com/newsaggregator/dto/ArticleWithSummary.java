package com.newsaggregator.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ArticleWithSummary extends Article {
    private String aiSummary;

    public ArticleWithSummary(Article article) {
        this.setSource(article.getSource());
        this.setAuthor(article.getAuthor());
        this.setTitle(article.getTitle());
        this.setDescription(article.getDescription());
        this.setUrl(article.getUrl());
        this.setUrlToImage(article.getUrlToImage());
        this.setPublishedAt(article.getPublishedAt());
        this.setContent(article.getContent());
    }
}
