package com.redhat.model;

public class Manifest {

    private String appName;
    private String projectName;
    private String url;


    public Manifest(){
        
    }
    /**
     * @param appName
     * @param projectName
     */
    public Manifest(String appName, String projectName) {
        this.appName = appName;
        this.projectName = projectName;
    }
    /**
     * @return the appName
     */
    public String getAppName() {
        return appName;
    }
    /**
     * @param appName the appName to set
     */
    public void setAppName(String appName) {
        this.appName = appName;
    }
    /**
     * @return the projectName
     */
    public String getProjectName() {
        return projectName;
    }
    /**
     * @param projectName the projectName to set
     */
    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
    /**
     * @return the url
     */
    public String getUrl() {
        return url;
    }
    /**
     * @param url the url to set
     */
    public void setUrl(String url) {
        this.url = url;
    }

}
