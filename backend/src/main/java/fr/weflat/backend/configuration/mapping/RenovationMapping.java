package fr.weflat.backend.configuration.mapping;

import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.Renovation;
import fr.weflat.backend.web.dto.RenovationDto;
import ma.glasnost.orika.MapperFactory;

@Component
public class RenovationMapping implements OrikaMapperFactoryConfigurer {

    /** {@inheritDoc} */
    @Override
    public void configure(MapperFactory orikaMapperFactory) {
        orikaMapperFactory.classMap(Renovation.class, RenovationDto.class)
                .byDefault()
                .register();
    }

}

