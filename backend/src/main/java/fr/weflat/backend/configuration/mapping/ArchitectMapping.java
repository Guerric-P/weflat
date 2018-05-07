package fr.weflat.backend.configuration.mapping;

import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.Architect;
import fr.weflat.backend.web.dto.ArchitectDto;
import ma.glasnost.orika.MapperFactory;

@Component
public class ArchitectMapping implements OrikaMapperFactoryConfigurer  {

	@Override
	public void configure(MapperFactory orikaMapperFactory) {
		 orikaMapperFactory.classMap(Architect.class, ArchitectDto.class)
		 .fieldAToB("status", "status")
         .byDefault()
         .register();
	}

}
