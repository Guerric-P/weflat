package fr.weflat.backend.configuration.mapping;

import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.User;
import fr.weflat.backend.web.dto.UserDto;
import fr.weflat.backend.web.dto.UserSignupDto;
import ma.glasnost.orika.CustomConverter;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.converter.BidirectionalConverter;
import ma.glasnost.orika.converter.ConverterFactory;
import ma.glasnost.orika.metadata.Type;
import org.jasypt.util.password.StrongPasswordEncryptor;

@Component
public class UserMapping implements OrikaMapperFactoryConfigurer  {

	@Override
	public void configure(MapperFactory orikaMapperFactory) {
		ConverterFactory converterFactory = orikaMapperFactory.getConverterFactory();
		converterFactory.registerConverter("nameConverter", new BidirectionalConverter<String, String>(){

			@Override
			public String convertFrom(String arg0, Type<String> arg1, MappingContext arg2) {
				return arg0;
			}

			@Override
			public String convertTo(String arg0, Type<String> arg1, MappingContext arg2) {
				return titleize(arg0);
			}
			
		});
		
		converterFactory.registerConverter("emailConverter", new BidirectionalConverter<String, String>(){

			@Override
			public String convertFrom(String arg0, Type<String> arg1, MappingContext arg2) {
				return arg0;
			}

			@Override
			public String convertTo(String arg0, Type<String> arg1, MappingContext arg2) {
				return arg0.toLowerCase();
			}
			
		});
		
		converterFactory.registerConverter("passwordEncryptor", new CustomConverter<String, String>(){

			@Override
			public String convert(String source, Type<? extends String> destinationType,
					MappingContext mappingContext) {
				return new StrongPasswordEncryptor().encryptPassword(source);
			}

		});
		
		orikaMapperFactory.classMap(User.class, UserDto.class)
        .fieldMap("firstName", "firstName").converter("nameConverter").add()
        .fieldMap("lastName", "lastName").converter("nameConverter").add()
        .fieldMap("email", "email").converter("emailConverter").add()
        .byDefault()
        .register();
		
		orikaMapperFactory.classMap(User.class, UserSignupDto.class)
        .fieldMap("firstName", "firstName").converter("nameConverter").add()
        .fieldMap("lastName", "lastName").converter("nameConverter").add()
        .fieldMap("email", "email").converter("emailConverter").add()
        .fieldMap("password", "password").converter("passwordEncryptor").add()
        .byDefault()
        .register();
	}
	
	private final Pattern bound = Pattern.compile("\\b(?=\\w)", Pattern.UNICODE_CASE);

	private final String ucFirst(String input) {
	    return input.substring(0,  1).toUpperCase() + input.substring(1).toLowerCase();
	};

	public String titleize(final String input) {
	    return bound.splitAsStream(input)
	          .map(x -> ucFirst(x))
	          .collect(Collectors.joining());
	}
}