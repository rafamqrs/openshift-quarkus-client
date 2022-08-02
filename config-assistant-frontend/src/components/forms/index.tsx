import React, { useState } from 'react';
import { Form, 
        FormGroup, 
        TextInput, 
        Button, 
        ActionGroup, 
        Alert,
        AlertProps,
        AlertActionLink,
        AlertGroup,
        AlertActionCloseButton,
        AlertVariant } from '@patternfly/react-core';
import Route from '../interfaces/Route';
import httpCommons from '../http/httpCommons';

export default function RouteForm() {

    const [isSuccess, setSuccess] = useState(false);
    const [isError, setError] = useState(false);

    const [routes, setRoutes] = useState<Route[]>([])

    function handleAlert() {
        setSuccess(current => !current);
    }

    function handleAlertError() {
        setError(current => !current)
    }

    const timeout = 5000
    
    const [appName, setAppName] = useState('')
    const [namespace, setNamespace] = useState('')


    
    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        httpCommons.post('/' + namespace, {
            "url": "https://raw.githubusercontent.com/rafamqrs/openshift-quarkus-client/main/src/main/resources/route.yaml",
            "fileName": "route.yaml",
            "appName": appName
        })
        .then(() => {
            setSuccess(false)
            handleAlert()
            setRoutes([])
        })
        .catch((err) => {
            setError(false)
            handleAlertError()
        });
    }

        return(
            <Form isWidthLimited onSubmit={onSubmitForm}>   

                  {isSuccess && (
                    <Alert timeout={timeout}  title="Route has successfully saved" />
                  )}
                   {isError && (
                    <Alert variant="danger" timeout={timeout}  title="An error has occurred!" />
                  )}
 
                <FormGroup label="Project Name" >
                    <TextInput isRequired
                        value={namespace}
                        onChange={event => setNamespace(event)}
                        type="text" 
                        aria-label="https://github.com/example/route.yaml"
                    />
                </FormGroup>
                <FormGroup label="App Name" >
                    <TextInput isRequired
                        type="text"
                        value={appName}
                        onChange={event => setAppName(event)}
                        aria-label="input text"
                    />
                </FormGroup>
                <ActionGroup>
                    <Button variant="primary" type='submit'>
                        Submit
                    </Button>
                    <Button variant="link">Cancel</Button>
              </ActionGroup>
            </Form>      
        )
}