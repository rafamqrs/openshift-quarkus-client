package com.redhat.client;

import javax.inject.Singleton;
import javax.ws.rs.Produces;

import io.fabric8.openshift.client.DefaultOpenShiftClient;
import io.fabric8.openshift.client.OpenShiftClient;

/**
 * KubernetesClientResource
 */
@Singleton
public class OpenshiftClientProducer {

    
    @Produces
    public OpenShiftClient kubernetesClient() {
        // here you would create a custom client
        return new DefaultOpenShiftClient();
    }
    
}