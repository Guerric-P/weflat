package fr.weflat.backend.configuration.mapping;

import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.ArchitectSituation;
import fr.weflat.backend.web.dto.ArchitectSituationDto;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.converter.BidirectionalConverter;
import ma.glasnost.orika.metadata.Type;

@Component
public class ArchitectSituationMapping implements OrikaMapperFactoryConfigurer {

	@Override
	public void configure(MapperFactory orikaMapperFactory) {
		orikaMapperFactory.getConverterFactory().registerConverter(new BidirectionalConverter<ArchitectSituation, ArchitectSituationDto>() {

			@Override
			public ArchitectSituationDto convertTo(ArchitectSituation source,
					Type<ArchitectSituationDto> destinationType, MappingContext mappingContext) {
				ArchitectSituationDto dto = new ArchitectSituationDto();
				dto.setId(source.getId());
				dto.setLabel(source.getLabel());
				return dto;
			}

			@Override
			public ArchitectSituation convertFrom(ArchitectSituationDto source,
					Type<ArchitectSituation> destinationType, MappingContext mappingContext) {
				if(source.getId() == null) return null;
				ArchitectSituation entity = new ArchitectSituation();
				mapperFacade.map(source, entity);
				entity.setId(source.getId());
				entity.setLabel(source.getLabel());
				return entity;
			}		
		});
	}
}
