package fr.weflat.backend.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.expression.WebExpressionAuthorizationManager;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;

import fr.weflat.backend.security.JWTAuthenticationFilter;
import fr.weflat.backend.security.JWTLoginFilter;
import fr.weflat.backend.security.WeflatAuthenticationProvider;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Autowired
    private WeflatAuthenticationProvider weflatAuthenticationProvider;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(requests -> requests
                        .requestMatchers(HttpMethod.POST, "/architects", "/customers", "/visits").permitAll()// Signup and anonymous visit creation
                        .requestMatchers(HttpMethod.PATCH, "/visits").permitAll()// Anonymous visit creation
                        .requestMatchers(HttpMethod.GET, "/visits/count").hasAuthority("architect")
                        .requestMatchers("/users/{userId:\\d+}/**").access(new WebExpressionAuthorizationManager("@weflatSecurityService.hasAccessToUser(authentication,#userId)"))
                        .requestMatchers("/architects/{architectId:\\d+}/**").access(new WebExpressionAuthorizationManager("@weflatSecurityService.hasAccessToArchitect(authentication,#architectId)"))
                        .requestMatchers("/customers/{customerId:\\d+}/**").access(new WebExpressionAuthorizationManager("@weflatSecurityService.hasAccessToCustomer(authentication,#customerId)"))
                        .requestMatchers("/visits/{visitId:\\d+}/**").access(new WebExpressionAuthorizationManager("@weflatSecurityService.hasAccessToVisit(authentication,#visitId)"))
                        .requestMatchers("/architects/types").permitAll()
                        .requestMatchers("/architects/situations").permitAll()
                        .requestMatchers("/architects/payment-types").permitAll()
                        .requestMatchers("/users/forgotten-password").permitAll()
                        .requestMatchers("/users/reset-password").permitAll()
                        .requestMatchers("/zip-codes/details").permitAll()
                        .requestMatchers("/zip-codes/search").permitAll()
                        .requestMatchers("/visits/price").permitAll()
                        .requestMatchers("/visits/partial-refund-amount").permitAll()
                        .requestMatchers("/positions").permitAll()
                        .anyRequest().hasAuthority("admin"))
                .logout(logout -> logout
                        .logoutSuccessHandler(new WeflatLogoutSuccessHandler())
                        .permitAll())
                .addFilterBefore(new JWTLoginFilter("/login", http.getSharedObject(AuthenticationManager.class)), UsernamePasswordAuthenticationFilter.class)
                // And filter other requests to check the presence of JWT in header
                .addFilterBefore(new JWTAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();

    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(weflatAuthenticationProvider);
    }

    private CsrfTokenRepository getCsrfTokenRepository() {
        CookieCsrfTokenRepository tokenRepository = CookieCsrfTokenRepository.withHttpOnlyFalse();
        tokenRepository.setCookiePath("/");
        return tokenRepository;
    }
}
