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
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        minW={'100%'}
        direction={{ base: 'row', md: 'row' }}
        spacing={4}
        justify={{ base: 'space-between', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
    <Flex px="4" py="5" align="center">
      <Icon as={MdAttachMoney} h={5} w={5}/>
      <Text
        fontSize="1xl"
        ml="2"
        mt="1"
        color={useColorModeValue('brand.500', 'white')}
        fontWeight="semibold"
        width={'100%'}
      >
            GitGraft
      </Text>
    </Flex>
        <Stack direction={'row'} spacing={6}>
          {props.children}
          <SocialButton label={'Github'} href={'https://github.com/chess10kp/GitGraft'}>
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}
