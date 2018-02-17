package fr.weflat.backend.web.dto;

public class AcheteurDto extends UtilisateurDto {

    public AcheteurDto() {

	}
    
    public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	private String project;
    
}
