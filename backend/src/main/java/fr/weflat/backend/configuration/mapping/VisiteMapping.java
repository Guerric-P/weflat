package fr.weflat.backend.configuration.mapping;

import ma.glasnost.orika.MapperFactory;
import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.Visite;
import fr.weflat.backend.web.dto.VisiteDto;

/**
 * The configuration of mapping between {@link PersonSource} and {@link PersonDestination}.
 */
@Component
public class VisiteMapping implements OrikaMapperFactoryConfigurer {

    /** {@inheritDoc} */
    @Override
    public void configure(MapperFactory orikaMapperFactory) {
        orikaMapperFactory.classMap(Visite.class, VisiteDto.class)
                .byDefault()
                .register();
    }

}
