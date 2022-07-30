import { ToggleGroup, ToggleGroupItem, ToggleGroupItemProps } from '@patternfly/react-core';
import { TableComposable, Caption, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useEffect, useState } from 'react';
import httpCommons from '../http/httpCommons';
import Route from '../interfaces/Route';

  
export default function RouteList() {

    const [routes, setRoutes] = useState<Route[]>([])

    useEffect(() => {
        httpCommons.get<Array<Route>>("/config-assistant-dev").then((response) => {
            setRoutes(response.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }, [routes])

    
      const columnNames = {
        appName: 'App name',
        project: 'Project',
        routeUrl: 'Route',
        service: 'Service'
      };
    
    return (
        <React.Fragment>
            <TableComposable
            aria-label="Simple table"
            >
            <Caption>Route's Table</Caption>
            <Thead>
                <Tr>
                    <Th>{columnNames.appName}</Th>
                    <Th>{columnNames.project}</Th>
                    <Th>{columnNames.routeUrl}</Th>
                    <Th>{columnNames.service}</Th>
                </Tr>
            </Thead>
            <Tbody>
            {routes.map(repo => (
                <Tr key={repo.metadata.uid}>
                    <Td dataLabel={columnNames.appName}>{repo.metadata.name}</Td>
                    <Td dataLabel={columnNames.project}>{repo.metadata.namespace}</Td>
                    <Td dataLabel={columnNames.routeUrl}>{repo.spec.host}</Td>
                    <Td dataLabel={columnNames.service}>{repo.spec.to.name}</Td>
                </Tr>
            ))}
            </Tbody>
        </TableComposable>
        </React.Fragment>
    )
}