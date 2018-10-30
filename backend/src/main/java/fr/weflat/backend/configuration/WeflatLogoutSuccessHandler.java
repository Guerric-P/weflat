package fr.weflat.backend.configuration;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

public class WeflatLogoutSuccessHandler implements LogoutSuccessHandler {

    @Override
    public void onLogoutSuccess(HttpServletRequest request,
        HttpServletResponse response, Authentication authentication)
        throws IOException, ServletException {

          response.setStatus(HttpServletResponse.SC_OK);
          Cookie cookie = new Cookie("weflat_token", "");
          cookie.setMaxAge(0);
          cookie.setPath("/");
          response.addCookie(cookie);
    }
}
