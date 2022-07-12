package com.redhat.resources;

import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.redhat.client.OpenshiftClientProducer;
import com.redhat.model.Manifest;

import io.fabric8.kubernetes.api.model.HasMetadata;
import io.fabric8.openshift.api.model.Route;

@Path("/manifest")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ManifestsResource {
    
    @Inject

    private OpenshiftClientProducer ocpClient;


    @GET
    @Path("/{namespace}")
    public List<Route> routes(String namespace) {
        return ocpClient.kubernetesClient().routes().inNamespace(namespace).list().getItems();
    }

    @POST
    @Path("/{namespace}")
    public Response createManifest(@PathParam("namespace") String namespace, Manifest manifest){
        try {
            InputStream is = new URL(manifest.getUrl()).openStream();
            List<HasMetadata> hasMetadata = ocpClient.kubernetesClient().load(is)
            .inNamespace(namespace)
            .createOrReplace();   
            if(hasMetadata.size() > 0){
                System.out.println("Metada size: "+ hasMetadata.size());
                return Response.status(201).build();
            }else{
                return Response.status(204).entity("File not found").build();
            }         
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity("An error has occured: " + e.getMessage()).build();
        }
    }
}
