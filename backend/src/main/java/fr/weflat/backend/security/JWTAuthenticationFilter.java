package fr.weflat.backend.security;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

public class JWTAuthenticationFilter extends GenericFilterBean {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
			throws IOException, ServletException {
		
		HttpServletResponse res = (HttpServletResponse) response;
		
		Authentication authentication = null;
		try {
			authentication = TokenAuthenticationService.getAuthentication((HttpServletRequest) request);
		}
		catch (Exception e) {
			res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token.");
            return;
        }

		SecurityContextHolder.getContext().setAuthentication(authentication);
		filterChain.doFilter(request, response);

	}
}
