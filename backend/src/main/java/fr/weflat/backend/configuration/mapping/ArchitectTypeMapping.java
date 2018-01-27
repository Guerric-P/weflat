package fr.weflat.backend.configuration.mapping;

import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.ArchitectType;
import fr.weflat.backend.web.dto.ArchitectTypeDto;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.converter.BidirectionalConverter;
import ma.glasnost.orika.metadata.Type;

@Component
public class ArchitectTypeMapping implements OrikaMapperFactoryConfigurer {

	@Override
	public void configure(MapperFactory orikaMapperFactory) {
		orikaMapperFactory.getConverterFactory().registerConverter(new BidirectionalConverter<ArchitectType, ArchitectTypeDto>() {

			@Override
			public ArchitectTypeDto convertTo(ArchitectType source, Type<ArchitectTypeDto> destinationType,
					MappingContext mappingContext) {
				ArchitectTypeDto dto = new ArchitectTypeDto();
				dto.setId(source.getId());
				dto.setLabel(source.getLabel());
				return dto;
			}

			@Override
			public ArchitectType convertFrom(ArchitectTypeDto source, Type<ArchitectType> destinationType,
					MappingContext mappingContext) {
				if(source.getId() == null) return null;
				ArchitectType entity = new ArchitectType();
				entity.setId(source.getId());
				entity.setLabel(source.getLabel());
				return entity;
			}
		});
	}
}
