import { Skeleton, Stack } from '@chakra-ui/react';
import React from 'react';

function Loader() {
    return (<>
        <Stack>
            <Skeleton height={5} />
            <Skeleton height={4} />
            <Skeleton height={5} />
            <Skeleton height={4} />
            <Skeleton height={3} />
            <Skeleton height={5} />
            <Skeleton height={4} />
            <Skeleton height={3} />
            <Skeleton height={2} />
            <Skeleton height={1} />
        </Stack>
    </>)
}

export default Loader;