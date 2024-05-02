package fr.weflat.backend.configuration.mapping;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.hibernate.collection.spi.PersistentSet;
import org.springframework.stereotype.Component;

import fr.weflat.backend.configuration.orika.OrikaMapperFactoryConfigurer;
import fr.weflat.backend.domaine.Renovation;
import fr.weflat.backend.web.dto.RenovationDto;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;

@Component
public class RenovationMapping implements OrikaMapperFactoryConfigurer {

    /** {@inheritDoc} */
    @Override
    public void configure(MapperFactory orikaMapperFactory) {
        orikaMapperFactory.classMap(Renovation.class, RenovationDto.class)
                .byDefault()
                .register();
        
        orikaMapperFactory.registerMapper(new CustomMapper<PersistentSet, Set<RenovationDto>>() {
        	@Override
        	public void mapAtoB(PersistentSet a, Set<RenovationDto> b, MappingContext context) {
        		for(Object renovation : a) {
        			b.add(mapperFacade.map(renovation, RenovationDto.class));
        		}
            }
        });
        
        orikaMapperFactory.registerMapper(new CustomMapper<Set<Renovation>, Set<RenovationDto>>() {
        	
        	@Override
            public void mapBtoA(Set<RenovationDto> renovationDtoSet, Set<Renovation> renovationSet, MappingContext context) {
        		Set<Renovation> temporaryRenovationSet = new HashSet<Renovation>();
        		
        		for(RenovationDto renovationDto : renovationDtoSet) {
        			Renovation renovation = renovationSet.stream()
        					.filter(x -> x.getId().equals(renovationDto.getId()))
        					.findFirst()
        					.orElse(null);
        			if(renovation == null) {
        				temporaryRenovationSet.add(this.mapperFacade.map(renovationDto, Renovation.class));
        			}
        			else {
        				this.mapperFacade.map(renovationDto, renovation);
        			}
        		}
        		
        		renovationSet.addAll(temporaryRenovationSet);
        		
        		Iterator<Renovation> it = renovationSet.iterator();  
    			while (it.hasNext()) {
    				Renovation renovation = it.next();

    				if(!renovationDtoSet.stream().anyMatch(x -> x.getId() == renovation.getId())) {
    					it.remove();
    				}
    			}
            }
        });
    }

}

