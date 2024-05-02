package fr.weflat.backend.configuration;

import com.stripe.model.Application;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.expression.SecurityExpressionHandler;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.expression.DefaultHttpSecurityExpressionHandler;
import org.springframework.security.web.access.expression.WebExpressionAuthorizationManager;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.*;

import fr.weflat.backend.security.JWTAuthenticationFilter;
import fr.weflat.backend.security.JWTLoginFilter;
import fr.weflat.backend.security.WeflatAuthenticationProvider;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.function.Supplier;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Autowired
    private WeflatAuthenticationProvider weflatAuthenticationProvider;

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean
    SecurityExpressionHandler<RequestAuthorizationContext> defaultHttpSecurityExpressionHandler() {
        return new DefaultHttpSecurityExpressionHandler();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, SecurityExpressionHandler<RequestAuthorizationContext> requestAuthorizationContextSecurityExpressionHandler) throws Exception {
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        WebExpressionAuthorizationManager userAuthorisationManager = new WebExpressionAuthorizationManager("@weflatSecurityService.hasAccessToUser(authentication,#userId)");
        WebExpressionAuthorizationManager architectAuthorisationManager = new WebExpressionAuthorizationManager("@weflatSecurityService.hasAccessToArchitect(authentication,#architectId)");
        WebExpressionAuthorizationManager customerAuthorisationManager = new WebExpressionAuthorizationManager("@weflatSecurityService.hasAccessToCustomer(authentication,#customerId)");
        WebExpressionAuthorizationManager visitAuthorisationManager = new WebExpressionAuthorizationManager("@weflatSecurityService.hasAccessToVisit(authentication,#visitId)");
        userAuthorisationManager.setExpressionHandler(requestAuthorizationContextSecurityExpressionHandler);
        architectAuthorisationManager.setExpressionHandler(requestAuthorizationContextSecurityExpressionHandler);
        customerAuthorisationManager.setExpressionHandler(requestAuthorizationContextSecurityExpressionHandler);
        visitAuthorisationManager.setExpressionHandler(requestAuthorizationContextSecurityExpressionHandler);

        http.csrf((csrf) -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .csrfTokenRequestHandler(new SpaCsrfTokenRequestHandler())
                ).authorizeHttpRequests(requests -> requests
                        .requestMatchers(HttpMethod.POST, "/architects", "/customers", "/visits").permitAll()// Signup and anonymous visit creation
                        .requestMatchers(HttpMethod.PATCH, "/visits").permitAll()// Anonymous visit creation
                        .requestMatchers(HttpMethod.GET, "/visits/count").hasAuthority("architect")
                        .requestMatchers("/users/{userId:\\d+}/**").access(userAuthorisationManager)
                        .requestMatchers("/architects/{architectId:\\d+}/**").access(architectAuthorisationManager)
                        .requestMatchers("/customers/{customerId:\\d+}/**").access(customerAuthorisationManager)
                        .requestMatchers("/visits/{visitId:\\d+}/**").access(visitAuthorisationManager)
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
                .addFilterBefore(new JWTLoginFilter("/login", authenticationConfiguration.getAuthenticationManager()), UsernamePasswordAuthenticationFilter.class)
                // And filter other requests to check the presence of JWT in header
                .addFilterBefore(new JWTAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class);
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

    final class SpaCsrfTokenRequestHandler extends CsrfTokenRequestAttributeHandler {
        private final CsrfTokenRequestHandler delegate = new XorCsrfTokenRequestAttributeHandler();

        @Override
        public void handle(HttpServletRequest request, HttpServletResponse response, Supplier<CsrfToken> csrfToken) {
            /*
             * Always use XorCsrfTokenRequestAttributeHandler to provide BREACH protection of
             * the CsrfToken when it is rendered in the response body.
             */
            this.delegate.handle(request, response, csrfToken);
        }

        @Override
        public String resolveCsrfTokenValue(HttpServletRequest request, CsrfToken csrfToken) {
            /*
             * If the request contains a request header, use CsrfTokenRequestAttributeHandler
             * to resolve the CsrfToken. This applies when a single-page application includes
             * the header value automatically, which was obtained via a cookie containing the
             * raw CsrfToken.
             */
            if (StringUtils.hasText(request.getHeader(csrfToken.getHeaderName()))) {
                return super.resolveCsrfTokenValue(request, csrfToken);
            }
            /*
             * In all other cases (e.g. if the request contains a request parameter), use
             * XorCsrfTokenRequestAttributeHandler to resolve the CsrfToken. This applies
             * when a server-side rendered form includes the _csrf request parameter as a
             * hidden input.
             */
            return this.delegate.resolveCsrfTokenValue(request, csrfToken);
        }
    }

    final class CsrfCookieFilter extends OncePerRequestFilter {

        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
                throws ServletException, IOException {
            CsrfToken csrfToken = (CsrfToken) request.getAttribute("_csrf");
            // Render the token value to a cookie by causing the deferred token to be loaded
            csrfToken.getToken();

            filterChain.doFilter(request, response);
        }
    }
}
