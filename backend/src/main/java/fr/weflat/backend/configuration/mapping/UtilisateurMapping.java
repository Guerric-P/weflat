package fr.weflat.backend.configuration.mapping;

import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.Utilisateur;
import fr.weflat.backend.web.dto.UtilisateurDto;
import ma.glasnost.orika.MapperFactory;

@Component
public class UtilisateurMapping implements OrikaMapperFactoryConfigurer  {

	@Override
	public void configure(MapperFactory orikaMapperFactory) {
		orikaMapperFactory.classMap(Utilisateur.class, UtilisateurDto.class)
        .byDefault()
        .register();
	}
}