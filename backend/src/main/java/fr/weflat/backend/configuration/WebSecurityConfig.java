package fr.weflat.backend.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import fr.weflat.backend.security.JWTAuthenticationFilter;
import fr.weflat.backend.security.JWTLoginFilter;
import fr.weflat.backend.security.WeflatAuthenticationProvider;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired 
	private WeflatAuthenticationProvider weflatAuthenticationProvider;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
			.authorizeRequests()
				.antMatchers(HttpMethod.POST, "/architects", "/customers", "/visits").permitAll()// Signup and anonymous visit creation
				.antMatchers(HttpMethod.PATCH, "/visits").permitAll()// Anonymous visit creation
				.antMatchers(HttpMethod.GET, "/visits/count").hasAuthority("architect")
				.antMatchers("/users/{userId:\\d+}/**").access("@weflatSecurityService.hasAccessToUser(authentication,#userId)")
				.antMatchers("/architects/{architectId:\\d+}/**").access("@weflatSecurityService.hasAccessToArchitect(authentication,#architectId)")
				.antMatchers("/customers/{customerId:\\d+}/**").access("@weflatSecurityService.hasAccessToCustomer(authentication,#customerId)")
				.antMatchers("/visits/{visitId:\\d+}/**").access("@weflatSecurityService.hasAccessToVisit(authentication,#visitId)")
				.antMatchers("/architects/types").permitAll()
				.antMatchers("/architects/situations").permitAll()
				.antMatchers("/architects/payment-types").permitAll()
				.antMatchers("/users/forgotten-password").permitAll()
				.antMatchers("/users/reset-password").permitAll()
				.antMatchers("/zip-codes/check-status").permitAll()
				.antMatchers("/positions").permitAll()
				.anyRequest().hasAuthority("admin")
				.and()
			.logout()
				.logoutSuccessHandler(new WeflatLogoutSuccessHandler())
				.permitAll()
				.and()
			.addFilterBefore(new JWTLoginFilter("/login", authenticationManager()), UsernamePasswordAuthenticationFilter.class)
			// And filter other requests to check the presence of JWT in header
			.addFilterBefore(new JWTAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
		
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(weflatAuthenticationProvider);
	}
}
