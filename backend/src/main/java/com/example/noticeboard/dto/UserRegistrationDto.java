package com.example.noticeboard.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRegistrationDto {
    @NotBlank
    private String username;

    @NotBlank
    @Size(min = 4)
    private String password;
}
