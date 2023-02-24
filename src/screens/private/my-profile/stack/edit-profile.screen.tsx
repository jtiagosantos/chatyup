import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Box, Flex, Spinner, useToast } from 'native-base';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FindOneUserService } from '../../../../modules/user/services/find-one-user.service';
import { UpdateOneUserToAuthService } from '../../../../modules/user/services/update-one-user-to-auth.service';
import { UpdateOneUserToDatabaseService } from '../../../../modules/user/services/update-one-user-to-database..service';

import { Header, TextField, Button } from '../../../../common/components';

import { useUser } from '../../../../common/hooks/use-user.hook';
import { useLoading } from '../../../../common/hooks/use-loding.hook';

import type { SubmitHandler } from 'react-hook-form';

const editProfileFormSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/, { message: 'Nome inválido' })
    .trim(),
  username: z.string().min(1, { message: 'Campo obrigatório' }).trim(),
  email: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .email({ message: 'E-mail inválido' })
    .trim(),
});

type EditProfileFormData = z.infer<typeof editProfileFormSchema>;

export const EditProfileScreen = () => {
  const { user, signIn, updateUserFromState, saveUserToStorage } = useUser();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<EditProfileFormData>({
    defaultValues: {
      first_name: user!.firstName,
      username: user!.username,
      email: user!.email,
    },
    resolver: zodResolver(editProfileFormSchema),
  });
  const updateProfileLoadingState = useLoading();
  const signInLoadingState = useLoading();
  const toast = useToast();

  const firstNameFieldIsDirty = !!dirtyFields.first_name;
  const usernameFieldIsDirty = !!dirtyFields.username;
  const emailFieldIsDirty = !!dirtyFields.email;
  const hasDirtyField =
    !!firstNameFieldIsDirty || !!usernameFieldIsDirty || !!emailFieldIsDirty;

  const onSubmit: SubmitHandler<EditProfileFormData> = async ({
    first_name,
    username,
    email,
  }) => {
    clearErrors();
    updateProfileLoadingState.enableLoading();

    if (usernameFieldIsDirty && emailFieldIsDirty) {
      const userByUsernameExists = await FindOneUserService.execute({ username });
      if (userByUsernameExists) {
        setError('username', { message: 'Nome de usuário informado já em uso' });
        updateProfileLoadingState.disableLoading();
        return;
      }

      const userByEmailExists = await FindOneUserService.execute({ email });
      if (userByEmailExists) {
        setError('email', { message: 'E-mail informado já em uso' });
        updateProfileLoadingState.disableLoading();
        return;
      }

      await UpdateOneUserToAuthService.execute(email);
      await UpdateOneUserToDatabaseService.execute({
        id: user!.id,
        firstName: first_name,
        username,
        email,
      });
    } else if (usernameFieldIsDirty) {
      const userByUsernameExists = await FindOneUserService.execute({ username });
      if (userByUsernameExists) {
        setError('username', { message: 'Nome de usuário informado já em uso' });
        updateProfileLoadingState.disableLoading();
        return;
      }

      await UpdateOneUserToDatabaseService.execute({
        id: user!.id,
        firstName: first_name,
        username,
        email,
      });
    } else if (emailFieldIsDirty) {
      const userByEmailExists = await FindOneUserService.execute({ email });
      if (userByEmailExists) {
        setError('email', { message: 'E-mail informado já em uso' });
        updateProfileLoadingState.disableLoading();
        return;
      }

      await UpdateOneUserToAuthService.execute(email);
      await UpdateOneUserToDatabaseService.execute({
        id: user!.id,
        firstName: first_name,
        username,
        email,
      });
    } else {
      await UpdateOneUserToDatabaseService.execute({
        id: user!.id,
        firstName: first_name,
        username,
        email,
      });
    }

    await saveUserToStorage({
      firstName: first_name,
      username,
      email,
    });
    updateUserFromState({
      firstName: first_name,
      username,
      email,
    });

    updateProfileLoadingState.disableLoading();

    reset({}, { keepValues: true });

    toast.closeAll();
    toast.show({
      title: 'Perfil atualizado com sucesso',
      bgColor: 'success.900',
      duration: 2000,
      mb: -5,
    });
  };

  useEffect(() => {
    signInLoadingState.enableLoading();
    signIn({ email: user!.email, password: user!.password })
      .then(() => {
        signInLoadingState.disableLoading();
      })
      .finally(() => {
        signInLoadingState.disableLoading();
      });
  }, []);

  return (
    <>
      <Box flex={1} bgColor="gray.900">
        <Header title="Edição do perfil" />

        {signInLoadingState.isLoading && (
          <Flex flex={1} align="center" justify="center">
            <Spinner size="lg" color="violet.800" />
          </Flex>
        )}
        {!signInLoadingState.isLoading && (
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Flex flex={1} p="24px">
              <TextField.Root isInvalid={!!errors.first_name}>
                <TextField.Label>Nome</TextField.Label>
                <TextField.Input
                  control={control}
                  name="first_name"
                  placeholder="Digite seu primeiro nome"
                />
                {!!errors.first_name && (
                  <TextField.Error>{errors.first_name.message}</TextField.Error>
                )}
              </TextField.Root>
              <TextField.Root isInvalid={!!errors.username} mt="16px">
                <TextField.Label>Nome de usuário</TextField.Label>
                <TextField.Input
                  control={control}
                  name="username"
                  placeholder="Digite seu nome de usuário"
                />
                {!!errors.username && (
                  <TextField.Error>{errors.username.message}</TextField.Error>
                )}
              </TextField.Root>
              <TextField.Root isInvalid={!!errors.email} mt="16px">
                <TextField.Label>E-mail</TextField.Label>
                <TextField.Input
                  control={control}
                  name="email"
                  placeholder="Digite seu e-mail"
                />
                {!!errors.email && (
                  <TextField.Error>{errors.email.message}</TextField.Error>
                )}
              </TextField.Root>
              <Button
                mt="24px"
                onPress={handleSubmit(onSubmit)}
                isLoading={updateProfileLoadingState.isLoading}
                isDisabled={!hasDirtyField}>
                Salvar alterações
              </Button>
            </Flex>
          </ScrollView>
        )}
      </Box>
    </>
  );
};
