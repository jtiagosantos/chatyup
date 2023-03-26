import { useEffect } from 'react';
import { Modal, Text, useToast } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';

import { supabase } from '../../../../infra/supabase/client';
import { UpdateOneUserService } from '../../../../modules/user/services/update-one-user.service';

import { Button } from '../../../../common/components';
import { Avatar } from './avatar.component';

import { getFileInfo } from '../../../../common/utils/get-file-info.util';
import { validateFileSize } from '../../../../common/utils/validate-file-size.util';
import { getFileExtension } from '../../../../common/utils/get-file-extension.util';

import { useUser } from '../../../../common/hooks/use-user.hook';
import { useLoading } from '../../../../common/hooks/use-loding.hook';

import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

const MAX_FILE_SIZE = 2000000; //bytes

type EditAtavarData = {
  avatar_url: string;
  base64: string;
};

type EditAvatarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const EditAvatarModal: FC<EditAvatarProps> = ({ isOpen, onClose }) => {
  const { user, updateUserFromState, saveUserToStorage } = useUser();
  const { isLoading, enableLoading, disableLoading } = useLoading();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, defaultValues },
  } = useForm<EditAtavarData>({
    defaultValues: {
      avatar_url: user?.avatarURL,
      base64: '',
    },
  });
  const toast = useToast();

  const { avatar_url } = watch();
  const imagePickerIsDirty = avatar_url !== defaultValues?.avatar_url;

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setValue('avatar_url', result.assets[0].uri);
      setValue('base64', result.assets[0].base64!);
    }
  };

  const onSubmit: SubmitHandler<EditAtavarData> = async ({ avatar_url, base64 }) => {
    enableLoading();

    if (!avatar_url) {
      setError('avatar_url', { message: 'Arquivo é obrigatório' });
      disableLoading();
      return;
    }

    const fileInfo = await getFileInfo(avatar_url);

    if (fileInfo.size) {
      const { isValidFile } = validateFileSize(fileInfo.size, MAX_FILE_SIZE);

      if (!isValidFile) {
        setError('avatar_url', { message: 'Tamanho máximo de arquivo é 2MB' });
        disableLoading();
        return;
      }

      try {
        const fileExtension = getFileExtension(avatar_url);
        const timestamp = new Date().getTime();

        await supabase.storage
          .from('files')
          .upload(
            `/avatars/user-${user!.id}/avatar-${timestamp}.${fileExtension}`,
            decode(base64),
            {
              upsert: true,
              contentType: `image/${fileExtension}`,
            },
          );

        const { data } = supabase.storage
          .from('files')
          .getPublicUrl(`/avatars/user-${user!.id}/avatar-${timestamp}.${fileExtension}`);

        const fileURL = data.publicUrl;

        await UpdateOneUserService.execute({
          id: user!.id,
          avatarURL: fileURL,
        });

        await saveUserToStorage({
          avatarURL: fileURL,
        });
        updateUserFromState({
          avatarURL: fileURL,
        });

        disableLoading();

        toast.closeAll();
        toast.show({
          title: 'Foto de perfil atualizada com sucesso',
          bgColor: 'success.900',
          duration: 2000,
          mb: -5,
        });

        onClose();
      } catch {
        disableLoading();
      }
    }
  };

  useEffect(() => {
    return () => {
      setValue('avatar_url', defaultValues?.avatar_url ?? '');
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      _overlay={{
        animationPreset: 'slide',
      }}>
      <Modal.Content bgColor="gray.900">
        <Modal.Body>
          <Controller
            control={control}
            name="avatar_url"
            render={({ field: { value } }) => (
              <Avatar.Root w="110px" h="110px" mx="auto" mt="32px">
                <Avatar.Image uri={value} />
              </Avatar.Root>
            )}
          />
          {errors.avatar_url?.message && (
            <Text color="red.500" textAlign="center" mt="4px">
              {errors.avatar_url?.message}
            </Text>
          )}
          {imagePickerIsDirty ? (
            <Button mt="16px" onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
              Salvar alteração
            </Button>
          ) : (
            <Button mt="16px" onPress={handlePickImage}>
              Selecionar arquivo
            </Button>
          )}
          <Button variant="ghost" mt="16px" h="30px" onPress={onClose}>
            Cancelar
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
