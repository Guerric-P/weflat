package fr.weflat.backend.configuration.mapping;

import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.Architecte;
import fr.weflat.backend.web.dto.ArchitecteDto;
import ma.glasnost.orika.MapperFactory;

@Component
public class ArchitecteMapping implements OrikaMapperFactoryConfigurer  {

	@Override
	public void configure(MapperFactory orikaMapperFactory) {
		 orikaMapperFactory.classMap(Architecte.class, ArchitecteDto.class)
		 .fieldAToB("status", "status")
         .byDefault()
         .register();
	}

}
