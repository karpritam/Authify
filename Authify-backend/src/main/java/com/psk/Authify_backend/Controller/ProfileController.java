package com.psk.Authify_backend.Controller;

import com.psk.Authify_backend.Service.ProfileService;
import com.psk.Authify_backend.io.ProfileRequest;
import com.psk.Authify_backend.io.ProfileResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@Valid @RequestBody ProfileRequest request){
        ProfileResponse response=profileService.createProfile(request);
        //TODO: send welcome email
        return response;
    }
}
