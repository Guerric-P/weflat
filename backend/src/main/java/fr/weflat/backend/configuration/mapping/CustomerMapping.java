package fr.weflat.backend.configuration.mapping;

import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.Customer;
import fr.weflat.backend.web.dto.CustomerDto;
import ma.glasnost.orika.MapperFactory;

@Component
public class CustomerMapping implements OrikaMapperFactoryConfigurer  {

	@Override
	public void configure(MapperFactory orikaMapperFactory) {
		orikaMapperFactory.classMap(Customer.class, CustomerDto.class)
        .byDefault()
        .register();
		
	}

}
