package com.psk.Authify_backend.io;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileRequest {

    @NotBlank(message = "Name should be not empty")
    private String name;
    private String userId;
    @Email(message = "Enter valid email address")
    @NotNull(message = "Email should be not empty")
    private String email;
    @Size(min = 6, message = "Password must be atLeast 6 characters")
    private String password;
}
