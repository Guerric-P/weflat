package fr.weflat.backend.web.dto.base;

public abstract class BaseDto<T> {

	public BaseDto() {
		
	}
	
	public BaseDto(T type) {
		From(type);
	}
	
	public abstract void From(T type);
}
