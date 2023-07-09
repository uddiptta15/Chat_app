import React from 'react';
import { Box, Text } from '@chakra-ui/react'
function UserList({ user, handleUserListFunction }) {
    return (<>
        <Box
            onClick={handleUserListFunction}
            cursor="pointer"
            bg="grey"
            _hover={{
                background: "blue",
                color: "white",
            }}
            w="100%"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Box>
                <Text>{user.username}</Text>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {user.email}
                </Text>
            </Box>
        </Box>
    </>
    )
}

export default UserList;