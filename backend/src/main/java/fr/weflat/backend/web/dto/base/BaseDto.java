package fr.weflat.backend.web.dto.base;

public abstract class BaseDto<T> {

	public BaseDto() {
		
	}
	
	public abstract void From(T type);
}
