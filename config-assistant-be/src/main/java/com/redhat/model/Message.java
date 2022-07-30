package main.java.com.redhat.model;

/**
 * Message
 */
public class Message {
    public int code;
    public String message;

    public Message(int code, String message){
        this.code = code;
        this.message = message;
    }
}