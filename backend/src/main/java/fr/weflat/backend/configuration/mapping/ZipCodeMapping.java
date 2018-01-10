package fr.weflat.backend.configuration.mapping;

import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.ZipCode;
import fr.weflat.backend.web.dto.ZipCodeDto;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;

@Component
public class ZipCodeMapping implements OrikaMapperFactoryConfigurer {

    /** {@inheritDoc} */
    @Override
    public void configure(MapperFactory orikaMapperFactory) {
        orikaMapperFactory.classMap(ZipCode.class, ZipCodeDto.class)
                .byDefault()
                .register();
        
        orikaMapperFactory.classMap(ZipCode.class, String.class)
        .customize(new CustomMapper<ZipCode, String>() {
            @Override
            public void mapAtoB(ZipCode a, String b, MappingContext context) {
            	ZipCode zipCode = new ZipCode();
            	zipCode.setNumber(b);
            }
        })
        .register();
    }

}
