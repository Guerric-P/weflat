package fr.weflat.backend.configuration.mapping;

import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.Position;
import fr.weflat.backend.web.dto.PositionDto;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.converter.BidirectionalConverter;
import ma.glasnost.orika.metadata.Type;

@Component
public class PositionMapping implements OrikaMapperFactoryConfigurer {

		@Override
		public void configure(MapperFactory orikaMapperFactory) {
			orikaMapperFactory.getConverterFactory().registerConverter(new BidirectionalConverter<Position, PositionDto>() {

				@Override
				public PositionDto convertTo(Position source, Type<PositionDto> destinationType,
						MappingContext mappingContext) {
					PositionDto dto = new PositionDto();
					dto.setId(source.getId());
					dto.setLabel(source.getLabel());
					return dto;
				}

				@Override
				public Position convertFrom(PositionDto source, Type<Position> destinationType,
						MappingContext mappingContext) {
					if(source.getId() == null) return null;
					Position entity = new Position();
					entity.setId(source.getId());
					entity.setLabel(source.getLabel());
					return entity;
				}
			});
		}
	}

