package com.psk.Authify_backend.Controller;

import com.psk.Authify_backend.Service.Implementation.AppUserDetailsService;
import com.psk.Authify_backend.Service.ProfileService;
import com.psk.Authify_backend.Util.JwtUtil;
import com.psk.Authify_backend.io.AuthRequest;
import com.psk.Authify_backend.io.AuthResponse;
import com.psk.Authify_backend.io.ResetPasswordRequest;
import io.jsonwebtoken.Jwt;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtil jwtUtil;
    private final ProfileService profileService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request){
        try{
            authenticate(request.getEmail(),request.getPassword());
            final UserDetails userDetails=appUserDetailsService.loadUserByUsername(request.getEmail());
            final String jwtToken=jwtUtil.generateToken(userDetails);
            ResponseCookie cookie=ResponseCookie.from("jwt",jwtToken)
                    .httpOnly(true)
                    .path("/")
                    .maxAge(Duration.ofDays(1))
                    .sameSite("Strict")
                    .build();
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString())
                    .body(new AuthResponse(request.getEmail(),jwtToken));
        }catch (BadCredentialsException ex){
            Map<String, Object> error=new HashMap<>();
            error.put("error",true);
            error.put("message","Email or password is incorrect");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }catch (DisabledException ex){
            Map<String, Object> error=new HashMap<>();
            error.put("error",true);
            error.put("message","Account is Disabled");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }catch (Exception ex){
            Map<String, Object> error=new HashMap<>();
            error.put("error",true);
            error.put("message","Authentication failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    private void authenticate(String email,String password){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
    }

    @GetMapping("/is-authenticated")
    public ResponseEntity<?> isAuthenticated(@CurrentSecurityContext(expression = "authentication?.name") String email){
        return ResponseEntity.ok(
                Map.of("authenticated", email != null, "email", email)
        );
    }

    @PostMapping("/send-reset-otp")
    public ResponseEntity<?> sendResetOtp(@RequestParam String email) {
        profileService.sendResetOtp(email);
        return ResponseEntity.ok(Map.of("success", true, "message", "OTP sent to email"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        profileService.resetPassword(request.getEmail(), request.getOtp(), request.getNewPassword());
        return ResponseEntity.ok(Map.of("success", true, "message", "Password reset successfully"));
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendVerifyOtp(
            @CurrentSecurityContext(expression = "authentication?.name") String email
    ) {
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "Unauthorized"));
        }

        profileService.sendOtp(email);
        return ResponseEntity.ok(Map.of("success", true, "message", "OTP sent successfully"));
    }

    @PostMapping("/verify-otp")
    public void verifyByEmail(@RequestBody Map<String, Object> request,
                              @CurrentSecurityContext(expression = "authentication?.name") String email) {

        if (!request.containsKey("otp") || request.get("otp") == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing OTP");
        }

        String otp = request.get("otp").toString().trim();

        profileService.verifyOtp(email, otp);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){
        ResponseCookie cookie=ResponseCookie.from("jwt","")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,cookie.toString())
                .body("Logged out successfully");
    }

}
