package fr.weflat.backend.web.dto;

public class CustomerDto extends UserDto {

    public CustomerDto() {

	}
    
    public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	private String project;
    
}
