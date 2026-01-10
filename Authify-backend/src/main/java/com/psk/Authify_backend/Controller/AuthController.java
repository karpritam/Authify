package com.psk.Authify_backend.Controller;

import com.psk.Authify_backend.io.AuthRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request){
        try{
            authenticate(request.getEmail(),request.getPassword());
            //TODO: JWT TOKEN
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

}
