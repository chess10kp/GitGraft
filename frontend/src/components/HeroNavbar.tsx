import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Flex,
  Icon
} from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import { ReactNode } from 'react'
import { MdAttachMoney } from "react-icons/md";


const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function HeroFooter(props: any) {
  return (
    <Box
      color={useColorModeValue('black', 'black')}
      bg={useColorModeValue('black', 'whiteAlpha.100')}
    >
      <Container
        as={Stack}
        minW={'100%'}
        direction={{ base: 'row', md: 'row' }}
        spacing={4}
        justify={{ base: 'space-between', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Flex px="4" py="5" align="center">
          <Icon as={MdAttachMoney} h={5} w={5} color={useColorModeValue('gray.100', 'white')} />
          <Text
            fontSize="1xl"
            ml="2"
            mt="1"
            color={useColorModeValue('gray.100', 'white')}
            fontWeight="semibold"
            width={'100%'}
          >
            GitGraft
          </Text>
        </Flex>
        <Stack direction={'row'} spacing={6}>
          {props.children}
        </Stack>
      </Container>
    </Box>
  )
}
