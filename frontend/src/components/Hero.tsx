import {
  Flex,
  Container,
  Code,
  Heading,
  Stack,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

import { MutableRefObject } from 'react'

import Footer from './Footer'
import HeroNavbar from './HeroNavbar'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import HeroIllustration from './HeroIllustration'

type Props = {
  loginUsernameRef: MutableRefObject<HTMLInputElement>
  loginPasswordRef: MutableRefObject<HTMLInputElement>
  onLoginHandler: () => Promise<boolean>
}


const Hero = (props: Props) => {
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure()
  const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure()

  const onLoginHandler = () => {
    props.onLoginHandler().then(
      (res) => {
        if (res) {
          onLoginClose()
        }
      }
    )
  }

  return (
    <Container maxW={'20xl'} mx={0} px={0}>
      <HeroNavbar>
        <Button
          onClick={onLoginOpen}
          size={'sm'}
          bg={'black'}
          color={'white'}
          _hover={{
            bg: 'white',
            color: 'black'
          }}>
          Login
        </Button>
        <Button
          onClick={onRegisterOpen}
          size={'sm'}
          bg={'black'}
          color={'white'}
          _hover={{
            bg: 'white',
            color: 'black'
          }}>
          Register
        </Button>
      </HeroNavbar>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        minHeight={'90vh'}
      >
        <Heading
          margin={'1rem'}
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'130%'}>
          Saving money shouldn't{' '}
          <Text as={'span'} color={'orange.400'}>
            cost you
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={{ base: '0.5xl', sm: '1xl', md: '2xl' }} fontSize={{ base: '1xl', sm: '1xl', md: '2xl' }}
          fontFamily={'roboto'}>
          GitGraft lets you keep track of your spending and sync your changes using Git
        </Text>
        <Flex w={'full'}>
          <HeroIllustration height={{ sm: '24rem', lg: '28rem' }} mt={{ base: 12, sm: 16 }} />
        </Flex>
      </Stack>
      <Stack spacing={6} direction={'row'}>
        <LoginForm
          username={props.loginUsernameRef} password={props.loginPasswordRef}
          clickHandler={onLoginHandler} isOpen={isLoginOpen}
          onClose={onLoginClose} />
        <RegisterForm isOpen={isRegisterOpen} onClose={onRegisterClose} />
      </Stack>
      <Stack
        textAlign={'center'}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'130%'}
        >Installation</Heading>
        <Heading as='h3' size={'1xl'}>Install the necessary dependencies</Heading>
        <Code display={'block'}
          whiteSpace={'pre'}
          mx={{ base: '10em', md: 'auto' }}
        >
          <div>python3 -m venv venv</div>
          <div>cd frontend && npm install </div>
          <div>venv/bin/pip install -r requirements.txt </div>
        </Code>
        <Heading as='h3' size={'1xl'}>Configure the application in .env</Heading>
        <Code display={'block'}
          whiteSpace={'pre'}
          mx={{ base: '10em', md: 'auto' }}
        >
          <div>JWT_SECRET_KEY="secretkey" </div>
          <div>JWT_REFRESH_SECRET_KEY="refreshkey"</div>
          <div>GITHUB_URL="enter a git url here"</div>
        </Code>
        <Heading as='h3' size={'1xl'}>Now start the application</Heading>
        <Code display={'block'}
          whiteSpace={'pre'}
          mx={{ base: '10em', md: 'auto' }}
        >
          <div>npm start</div>
        </Code>
      </Stack>
      <Footer />
    </Container>
  )
}

export default Hero
