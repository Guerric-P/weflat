package fr.weflat.backend.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import fr.weflat.backend.domaine.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

class TokenAuthenticationService {
	  static final int EXPIRATIONTIME = 864_000; // 10 days
	  static final String SECRET = "ThisIsASecret";

	  static void addAuthentication(HttpServletResponse res, Authentication authentication) throws IOException {
		Map<String, Object> map = new HashMap<String, Object>();
		
		User user = (User) authentication.getDetails();
		map.put("displayName", user.getFirstName() + " " + user.getLastName());
		map.put("roles", authentication.getAuthorities());
		map.put("id", user.getId());


		String JWT = Jwts.builder()
	        .setSubject(authentication.getName())
	        .addClaims(map)
	        .setExpiration(new Date(System.currentTimeMillis() + (EXPIRATIONTIME * 1000)))
	        .signWith(SignatureAlgorithm.HS512, SECRET)
	        .compact();
	    res.setContentType("application/json");
	    Cookie cookie = new Cookie("weflat_token", JWT);
	    //cookie.setSecure(true);
	    cookie.setMaxAge(EXPIRATIONTIME);
	    //cookie.setHttpOnly(true);
	    cookie.setPath("/");
	    res.addCookie(cookie);
	  }

	  static Authentication getAuthentication(HttpServletRequest request) {
	    Cookie[] cookies = request.getCookies();
	    String token = null;
	    for(Cookie cookie: cookies) {
	    	if(cookie.getName().equals("weflat_token")) {
	    		token = cookie.getValue();
	    	}
	    }
	    if (token != null) {
	      // parse the token.
	      String user = Jwts.parser()
	          .setSigningKey(SECRET)
	          .parseClaimsJws(token)
	          .getBody()
	          .getSubject();
	      
	      Long id = Jwts.parser()
	          .setSigningKey(SECRET)
	          .parseClaimsJws(token)
	          .getBody()
	          .get("id", Long.class);
	      
	      @SuppressWarnings("unchecked")
	      List<Map<String, String>> roles = Jwts.parser()
		      .setSigningKey(SECRET)
		      .parseClaimsJws(token)
		      .getBody()
		      .get("roles", List.class);
	      
	      List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
	      
	      for(Map<String, String> role : roles) {
	    	  String authority = role.get("authority");
	    	  authorities.add(new SimpleGrantedAuthority(authority));
	      }
	      
	      Map<String, Object> details = new HashMap<String, Object>();
	      details.put("id", id);
	      
	      if(user != null) {
	    	  UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null, authorities);
	    	  auth.setDetails(details);
	    	  return auth;
	      }
	    }
	    return null;
	  }
	}