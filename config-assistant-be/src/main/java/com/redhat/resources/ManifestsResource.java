package com.redhat.resources;

import java.io.InputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.PUT;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.redhat.client.OpenshiftClientProducer;
import com.redhat.model.Manifest;

import io.fabric8.kubernetes.api.model.IntOrString;
import io.fabric8.kubernetes.api.model.ObjectMeta;
import io.fabric8.kubernetes.api.model.Secret;
import io.fabric8.kubernetes.client.KubernetesClientException;
import io.fabric8.kubernetes.client.utils.Base64;
import io.fabric8.openshift.api.model.Route;
import io.fabric8.openshift.api.model.RoutePort;
import io.fabric8.openshift.api.model.RouteSpec;
import io.fabric8.openshift.api.model.RouteTargetReference;
import io.fabric8.openshift.api.model.TLSConfig;
import main.java.com.redhat.model.Message;

@Path("/manifest")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ManifestsResource {
    
    @Inject
    private OpenshiftClientProducer ocpClient;
    String gitSource;
    @ConfigProperty(name = "ROUTE_HTTP_PORT")
    String portNumber;
    @ConfigProperty(name = "ROUTE_DOMAIN")
    String domain;

    @GET
    @Path("/route/{namespace}")
    public Response routes(String namespace) {
        try {
            List<Route> routes = ocpClient.kubernetesClient().routes().inNamespace(namespace).list().getItems();
            return Response.status(200).entity(routes).build();
        } catch (KubernetesClientException e) {
            return Response.status(500).entity(new Message(500, "An error has occurred " + e.getMessage() )).build();

        } catch (Exception e) {
            return Response.status(500).entity(new Message(500, "An error has occurred " + e.getMessage() )).build();
        }
    }

    @POST
    @Path("/route/{namespace}")
    public Response createManifest(@PathParam("namespace") String namespace, Manifest manifest){
        try {
            InputStream is = new URL(manifest.getUrl()).openStream();
            Route route = ocpClient.kubernetesClient().routes().load(is).get();
            //Set Metadata
            ObjectMeta metadata = new ObjectMeta();
            metadata.setName(manifest.getAppName());
            metadata.setNamespace(namespace);
            route.setMetadata(metadata);
            //Set Spec
            RouteSpec spec = route.getSpec();
            spec.setHost(manifest.getAppName() + domain);
 
            spec.setTo(new RouteTargetReference("Service", manifest.getAppName(), 100));
            spec.setPort(new RoutePort(new IntOrString(portNumber)));
            spec.setWildcardPolicy("None");

            //Get the secret to create a https route
            Secret secret = ocpClient.kubernetesClient().secrets().inNamespace(namespace).withName("route-certificates").get();
            String tlsCrt = new String(Base64.decode(secret.getData().get("tls.crt")), StandardCharsets.UTF_8);
            String keyCrt = new String(Base64.decode(secret.getData().get("tls.key")), StandardCharsets.UTF_8);

            //Set TLS
            TLSConfig config = new TLSConfig(null, tlsCrt, null, "None", keyCrt, "edge");
            spec.setTls(config);
            route.setSpec(spec);

/*           List<HasMetadata> hasMetadata = ocpClient.kubernetesClient().load(is)
            .inNamespace(namespace)
            .createOrReplace();   
 */ 
             if(ocpClient.kubernetesClient().routes().createOrReplace(route) != null){
                return Response.status(201).build();
            }else{
                return Response.status(204).entity("File not found").build();
            }         
        } catch (IOException io) {
            return Response.status(500).entity(new Message(500, "An error has occurred " + io.getMessage() )).build();
        } catch(KubernetesClientException ke){ 
            return Response.status(422).entity(new Message(500, "An error has occurred " + ke.getMessage() )).build();
        } catch (Exception e) {
            return Response.status(500).entity(new Message(500, "An error has occurred " + e.getMessage() )).build();
        }
    }

    @Path("/route/{namespace}")
    @PUT
    public Response update(@PathParam("namespace") String namespace, Route route){
        try {

            if(ocpClient.kubernetesClient().routes().createOrReplace(route) != null){
                return Response.status(201).build();
            }else{
                return Response.status(204).entity("File not found").build();
            }         
        } catch(KubernetesClientException ke){ 
            return Response.status(422).entity(new Message(500, "An error has occurred " + ke.getMessage() )).build();
        }
    }

    @Path("/route/{namespace}/{name}")
    @DELETE
    public Response delete(@PathParam("namespace") String namespace, @PathParam("name") String name){
        try {
            ocpClient.kubernetesClient().routes().inNamespace(namespace).withName(name).delete();
            return Response.ok().build();
        } catch(KubernetesClientException ke){ 
            return Response.status(500).entity(new Message(500, "An has occurred and the route could not be deleted " + ke.getMessage() )).build();
        } catch (Exception e) {
            return Response.status(500).entity(new Message(500, "An has occurred and the route could not be deleted" + e.getMessage() )).build();
        }
    }
}
