package fr.weflat.backend.configuration.mapping;

import ma.glasnost.orika.MapperFactory;
import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.Visit;
import fr.weflat.backend.web.dto.VisiteDto;

/**
 * The configuration of mapping between {@link PersonSource} and {@link PersonDestination}.
 */
@Component
public class VisitMapping implements OrikaMapperFactoryConfigurer {

    /** {@inheritDoc} */
    @Override
    public void configure(MapperFactory orikaMapperFactory) {
        orikaMapperFactory.classMap(Visit.class, VisiteDto.class)
        .fieldAToB("status", "status")
                .byDefault()
                .register();
    }

}
