/* eslint-disable react/prop-types */
import React from 'react';
import { Lottie } from '@crello/react-lottie';
import { Button } from '../../commons/Button';
import TextField from '../../forms/TextField';
import { Box } from '../../layout/Box';
import { Grid } from '../../layout/Grid';
import Text from '../../foundations/Text';
import loadingAnimation from './animations/loading.json';
import errorAnimation from './animations/error.json';
import successAnimation from './animations/success.json';

const formStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

function FormContent() {
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState(formStates.DEFAULT);

  const [userInfo, setUserInfo] = React.useState({
    name: '',
    username: '',
  });

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    setUserInfo({
      ...userInfo,
      [fieldName]: event.target.value,
    });
  }

  const isFormInvalid = userInfo.username.length === 0 || userInfo.name.length === 0;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setIsFormSubmitted(true);
        setSubmissionStatus(formStates.LOADING);
        const userDTO = {
          name: userInfo.name,
          username: userInfo.usuario,
        };

        fetch('https://instalura-api.vercel.app/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDTO),
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Não foi possível cadastrar o usuário');
        }).then(() => {
          setSubmissionStatus(formStates.DONE);
        }).catch(() => {
          setSubmissionStatus(formStates.ERROR);
        });
      }}
    >
      <Text
        variant="title"
        tag="h1"
        color="tertiary.main"
      >
        Pronto para saber da vida dos outros?
      </Text>
      <Text
        variant="paragraph1"
        tag="p"
        color="tertiary.light"
        marginBottom="32px"
      >
        Você está a um passo de saber tudo que está
        rolando por aqui, complete seu cadastro agora!
      </Text>

      <div>
        <TextField
          placeholder="Nome"
          name="name"
          value={userInfo.name}
          onChange={handleChange} // capturadores, pegadores de ação
        />
      </div>

      <div>
        <TextField
          placeholder="Usuário"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
        />
      </div>

      <Button
        variant="primary.main"
        type="submit"
        disabled={isFormInvalid}
        fullWidth
      >
        Cadastrar
      </Button>

      {isFormSubmitted && submissionStatus === formStates.LOADING && (
        <Box
          display="flex"
          justifyContent="center"
        >
          <Lottie
            width="150px"
            height="150px"
            config={{ animationData: loadingAnimation, loop: false, autoplay: true }}
          />
        </Box>
      )}

      {isFormSubmitted && submissionStatus === formStates.DONE && (
        <Box
          display="flex"
          justifyContent="center"
        >
          <Lottie
            width="150px"
            height="150px"
            config={{ animationData: successAnimation, loop: false, autoplay: true }}
          />
        </Box>
      )}

      {isFormSubmitted && submissionStatus === formStates.ERROR && (
        <Box
          display="flex"
          justifyContent="center"
        >
          <Lottie
            width="150px"
            height="150px"
            config={{ animationData: errorAnimation, loop: false, autoplay: true }}
          />
        </Box>
      )}
    </form>
  );
}

const FormRegister = ({ propsDoModal }) => (
  <Grid.Row
    marginLeft={0}
    marginRight={0}
    flex={1}
    justifyContent="flex-end"
  >
    <Grid.Col
      display="flex"
      paddingRight={{ md: '0' }}
      flex={1}
      value={{ xs: 12, md: 5, lg: 4 }}
    >
      <Box
        boxShadow="-10px 0px 24px rgba(7, 12, 14, 0.1)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        flex={1}
        padding={{
          xs: '16px',
          md: '85px',
        }}
        backgroundColor="white"
          // eslint-disable-next-line react/jsx-props-no-spreading
        {...propsDoModal}
      >
        <FormContent />
      </Box>
    </Grid.Col>
  </Grid.Row>
);

export default FormRegister;