package fr.weflat.backend.configuration.mapping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.dao.ZipCodeDao;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.web.dto.ZipCodeDto;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.converter.BidirectionalConverter;
import ma.glasnost.orika.metadata.Type;

@Component
public class ZipCodeMapping implements OrikaMapperFactoryConfigurer {

	@Autowired
	private ZipCodeDao zipCodeDao;

	/** {@inheritDoc} */
	@Override
	public void configure(MapperFactory orikaMapperFactory) {
		orikaMapperFactory.classMap(ZipCode.class, ZipCodeDto.class)
		.byDefault()
		.register();

		/*orikaMapperFactory.classMap(ZipCode.class, String.class)
        .customize(new CustomMapper<ZipCode, String>() {
            @Override
            public void mapAtoB(ZipCode a, String b, MappingContext context) {
            	ZipCode zipCode = new ZipCode();
            	zipCode.setNumber(b);
            }
        })
        .register();*/

		orikaMapperFactory.getConverterFactory().registerConverter(new BidirectionalConverter<ZipCode, ZipCodeDto>() {

			@Override
			public ZipCodeDto convertTo(ZipCode source, Type<ZipCodeDto> destinationType,
					MappingContext mappingContext) {
				ZipCodeDto dto = new ZipCodeDto();
				dto.setId(source.getId());
				dto.setActive(source.isActive());
				dto.setNumber(source.getNumber());
				return dto;
			}

			@Override
			public ZipCode convertFrom(ZipCodeDto source, Type<ZipCode> destinationType,
					MappingContext mappingContext) {
				if(source.getNumber() != null)
				{
					ZipCode zipCode = zipCodeDao.findByNumber(source.getNumber());

					if(zipCode == null) {
						zipCode = new ZipCode();
						zipCode.setNumber(source.getNumber());
					}
					zipCode.setActive(source.isActive());
					return zipCode;
				}
				else {
					return null;
				}
			}
		});
	}

}
