package com.example.noticeboard.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NoticeCreateDto {
    @NotBlank
    private String title;

    @NotBlank
    private String content;
}
