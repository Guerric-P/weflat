package fr.weflat.backend.configuration.mapping;

import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.Acheteur;
import fr.weflat.backend.web.dto.AcheteurDto;
import ma.glasnost.orika.MapperFactory;

@Component
public class AcheteurMapping implements OrikaMapperFactoryConfigurer  {

	@Override
	public void configure(MapperFactory orikaMapperFactory) {
		orikaMapperFactory.classMap(Acheteur.class, AcheteurDto.class)
        .byDefault()
        .register();
		
	}

}
