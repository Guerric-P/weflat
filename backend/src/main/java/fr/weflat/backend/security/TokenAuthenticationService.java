package fr.weflat.backend.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import fr.weflat.backend.domaine.Utilisateur;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

class TokenAuthenticationService {
	  static final long EXPIRATIONTIME = 864_000_000; // 10 days
	  static final String SECRET = "ThisIsASecret";
	  static final String TOKEN_PREFIX = "Bearer";
	  static final String HEADER_STRING = "Authorization";

	  static void addAuthentication(HttpServletResponse res, Authentication authentication) throws IOException {
		Map<String, Object> map = new HashMap<String, Object>();
		
		Utilisateur utilisateur = (Utilisateur) authentication.getDetails();
		map.put("displayName", utilisateur.getFirstName() + " " + utilisateur.getLastName());
		map.put("roles", authentication.getAuthorities());
		map.put("id", utilisateur.getId());


		String JWT = Jwts.builder()
	        .setSubject(authentication.getName())
	        .addClaims(map)
	        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
	        .signWith(SignatureAlgorithm.HS512, SECRET)
	        .compact();
	    res.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + JWT);
	    res.setContentType("application/json");
	    res.getWriter().write("{\"token\": \"" + JWT + "\"}");
	  }

	  static Authentication getAuthentication(HttpServletRequest request) {
	    String token = request.getHeader(HEADER_STRING);
	    if (token != null) {
	      // parse the token.
	      String user = Jwts.parser()
	          .setSigningKey(SECRET)
	          .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
	          .getBody()
	          .getSubject();
	      
	      Long id = Jwts.parser()
	          .setSigningKey(SECRET)
	          .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
	          .getBody()
	          .get("id", Long.class);
	      
	      @SuppressWarnings("unchecked")
	      List<Map<String, String>> roles = Jwts.parser()
		      .setSigningKey(SECRET)
		      .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
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