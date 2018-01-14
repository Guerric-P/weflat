package fr.weflat.backend.configuration.mapping;

import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.Utilisateur;
import fr.weflat.backend.web.dto.UtilisateurDto;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.converter.BidirectionalConverter;
import ma.glasnost.orika.converter.ConverterFactory;
import ma.glasnost.orika.metadata.Type;

@Component
public class UtilisateurMapping implements OrikaMapperFactoryConfigurer  {

	@Override
	public void configure(MapperFactory orikaMapperFactory) {
		ConverterFactory converterFactory = orikaMapperFactory.getConverterFactory();
		converterFactory.registerConverter("nameConverter", new BidirectionalConverter<String, String>(){

			@Override
			public String convertFrom(String arg0, Type<String> arg1, MappingContext arg2) {
				// TODO Auto-generated method stub
				return arg0;
			}

			@Override
			public String convertTo(String arg0, Type<String> arg1, MappingContext arg2) {
				// TODO Auto-generated method stub
				return titleize(arg0);
			}
			
		});
		
		orikaMapperFactory.classMap(Utilisateur.class, UtilisateurDto.class)
        .fieldMap("firstName", "firstName").converter("nameConverter").add()
        .fieldMap("lastName", "lastName").converter("nameConverter").add()
        .byDefault()
        .register();
	}
	
	private final Pattern bound = Pattern.compile("\\b(?=\\w)", Pattern.UNICODE_CASE);

	private final String ucFirst(String input) {
	    return input.substring(0,  1).toUpperCase() + input.substring(1);
	};

	public String titleize(final String input) {
	    return bound.splitAsStream(input)
	          .map(x -> ucFirst(x))
	          .collect(Collectors.joining());
	}
}