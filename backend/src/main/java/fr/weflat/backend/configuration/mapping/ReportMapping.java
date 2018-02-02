package fr.weflat.backend.configuration.mapping;

import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.Report;
import fr.weflat.backend.web.dto.ReportDto;
import ma.glasnost.orika.MapperFactory;

@Component
public class ReportMapping implements OrikaMapperFactoryConfigurer {

    /** {@inheritDoc} */
    @Override
    public void configure(MapperFactory orikaMapperFactory) {
        orikaMapperFactory.classMap(Report.class, ReportDto.class)
                .byDefault()
                .register();
    }

}