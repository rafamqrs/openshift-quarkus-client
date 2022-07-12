package com.redhat.model;

public class Manifest {

    private String url;
    private String fileName;

    public Manifest(){
    }

    /**
     * @param url
     * @param fileName
     */
    public Manifest(String url, String fileName) {
        this.url = url;
        this.fileName = fileName;
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
    /**
     * @return the fileName
     */
    public String getFileName() {
        return fileName;
    }
    /**
     * @param fileName the fileName to set
     */
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    
    
}
