package fr.weflat.backend.configuration.mapping;

import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.PaymentType;
import fr.weflat.backend.web.dto.PaymentTypeDto;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.converter.BidirectionalConverter;
import ma.glasnost.orika.metadata.Type;

@Component
public class PaymentTypeMapping implements OrikaMapperFactoryConfigurer {

	@Override
	public void configure(MapperFactory orikaMapperFactory) {
		orikaMapperFactory.getConverterFactory().registerConverter(new BidirectionalConverter<PaymentType, PaymentTypeDto>() {

			@Override
			public PaymentTypeDto convertTo(PaymentType source, Type<PaymentTypeDto> destinationType,
					MappingContext mappingContext) {
				PaymentTypeDto dto = new PaymentTypeDto();
				dto.setId(source.getId());
				dto.setLabel(source.getLabel());
				return dto;
			}

			@Override
			public PaymentType convertFrom(PaymentTypeDto source, Type<PaymentType> destinationType,
					MappingContext mappingContext) {
				if(source.getId() == null) return null;
				PaymentType entity = new PaymentType();
				entity.setId(source.getId());
				entity.setLabel(source.getLabel());
				return entity;
			}
			
		});
		
	}

}
