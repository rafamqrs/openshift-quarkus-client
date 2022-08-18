import { ToggleGroup, ToggleGroupItem, ToggleGroupItemProps, SearchInput, Bullseye,EmptyState , EmptyStateIcon, EmptyStateVariant, EmptyStateBody, Title, OverflowMenu, OverflowMenuContent, OverflowMenuGroup, OverflowMenuItem, Button } from '@patternfly/react-core';
import { TableComposable, Caption, Thead, Tr, Th, Tbody, Td} from '@patternfly/react-table';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import httpCommons from '../http/httpCommons';
import Route from '../interfaces/Route';

  
export default function RouteList() {

    const [routes, setRoutes] = useState<Route[]>([])
    const [value, setValue] = React.useState('');
    const [hasData, setHasNoData] = React.useState(false);

/*     useEffect(() => {
        httpCommons.get<Array<Route>>("/" + value).then((response) => {
            setRoutes(response.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }, [routes])
 */

    const searchByName = () => {
        httpCommons.get<Array<Route>>("/" + value).then((response) => {
            if(response.data.length > 0){
                setValue('')
                setHasNoData(false)
                setRoutes(response.data)
            }else {
                setHasNoData(true)
            }
        })
        .catch((err) => {
            console.log(err);
            setValue('')
            setHasNoData(true)
        });
    }    

    const deleteRoute = (routeToBeRemoved: Route) => {
        httpCommons.delete(`/${routeToBeRemoved.metadata.namespace}/${routeToBeRemoved.metadata.name}`)
        .then(() => {
            const routesList = routes.filter(routes => routes.metadata.name !== routeToBeRemoved.metadata.name)
            setRoutes([...routesList])
        })
    }    


    const columnNames = {
    appName: 'App name',
    project: 'Project',
    routeUrl: 'Route',
    service: 'Service'
    };
    
    return (
        <React.Fragment>
            <SearchInput
            placeholder='Find  route by name'
            value={value}
            onChange={setValue}
            onSearch={searchByName}
            onClear={() => setValue('')}
            />
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
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
            { hasData &&
                <Tr>
                    <Td colSpan={8}>
                        <Bullseye>
                            <EmptyState variant={EmptyStateVariant.small}>
                            <EmptyStateIcon icon={SearchIcon} />
                            <Title headingLevel="h2" size="lg">
                                No results found
                            </Title>
                            </EmptyState>
                        </Bullseye>
                    </Td>
                </Tr>
            }
            {routes.map(repo => (
                <Tr key={repo.metadata.uid}>
                    <Td dataLabel={columnNames.appName}>{repo.metadata.name}</Td>
                    <Td dataLabel={columnNames.project}>{repo.metadata.namespace}</Td>
                    <Td dataLabel={columnNames.routeUrl}>{repo.spec.host}</Td>
                    <Td dataLabel={columnNames.service}>{repo.spec.to.name}</Td>
                    <Td isActionCell>
                        <OverflowMenu breakpoint="lg">
                            <OverflowMenuContent>
                                <OverflowMenuGroup groupType="button">
                                    <OverflowMenuItem>
                                        <Button variant="primary" onClick={() => deleteRoute(repo)}>Delete</Button>
                                    </OverflowMenuItem>
                                  </OverflowMenuGroup>
                                </OverflowMenuContent>
                            </OverflowMenu>

                    </Td>
                </Tr>
            ))}
            </Tbody>
        </TableComposable>
        </React.Fragment>
    )
}