package fr.weflat.backend.configuration.mapping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaContext;
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
	
    @Autowired
    private JpaContext jpaContext;

	@Override
	public void configure(MapperFactory orikaMapperFactory) {
		orikaMapperFactory.getConverterFactory().registerConverter(new BidirectionalConverter<Position, PositionDto>() {

			@Override
			public PositionDto convertTo(Position source, Type<PositionDto> destinationType,
					MappingContext mappingContext) {
				PositionDto dto = new PositionDto();
				dto.setId(source.getId());
				dto.setLabel(source.getLabel());
				dto.setMandatory(source.isMandatory());
				return dto;
			}

			@Override
			public Position convertFrom(PositionDto source, Type<Position> destinationType,
					MappingContext mappingContext) {
				if(source.getId() == null) return null;
				
				//If another renovation has the same position, load the position from entity manager instead of creating a new instance
				//Otherwise, hibernate cannot merge the multiple instances
				Position entity = jpaContext.getEntityManagerByManagedType(Position.class).getReference(Position.class, source.getId());
				if(entity == null) {
					entity = new Position();
				}
				entity.setId(source.getId());
				entity.setLabel(source.getLabel());
				entity.setMandatory(source.isMandatory());
				return entity;
			}
		});
	}
}

