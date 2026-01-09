package com.psk.Authify_backend.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileRequest {

    private String name;
    private String userId;
    private String email;
    private String password;
}
