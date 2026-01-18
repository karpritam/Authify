package com.psk.Authify_backend.Controller;

import com.psk.Authify_backend.Service.Implementation.EmailService;
import com.psk.Authify_backend.Service.ProfileService;
import com.psk.Authify_backend.io.ProfileRequest;
import com.psk.Authify_backend.io.ProfileResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final EmailService emailService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@Valid @RequestBody ProfileRequest request){
        ProfileResponse response=profileService.createProfile(request);
        emailService.sendWelcomeEmail(response.getEmail(),response.getName());
        return response;
    }

    //for auth testing purpose (not needed)
//    @GetMapping("/test")
//    public String test(){
//        return "Auth is working";
//    }

    @GetMapping("/profile")
    public ProfileResponse getProfile(@CurrentSecurityContext(expression = "authentication?.name") String email){
        return profileService.getProfile(email);
    }
}
