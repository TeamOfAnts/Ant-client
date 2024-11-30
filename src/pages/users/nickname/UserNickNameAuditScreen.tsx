import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from '@shared/ui';
import { z, TypeOf } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@libs/query';
import { userRepository } from '@repositories';
import { useToast } from '@hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTE_POLLS } from '@routes';

const validationSchema = z.object({
  name: z.string().min(1, '닉네임을 입력해주세요.'),
});

function UserNickNameAuditScreen(props: {}) {
  // prop destruction
  // lib hooks
  const { toast } = useToast();
  const navigate = useNavigate();
  // state, ref hooks
  // form hooks
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TypeOf<typeof validationSchema>>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: '',
    },
  });
  // query hooks
  const { mutateAsync: updateNickName, isLoading } = useMutation(userRepository.updateNickName, {
    onCompleted: () => {
      toast({
        title: '닉네임이 설정되었습니다.',
        duration: 1500,
      });

      // HACK: 아직 더 좋은 방법을 찾지 못했다.
      setTimeout(() => {
        navigate(ROUTE_POLLS);
      }, 1500);
    },
    onError: (error) => {
      toast({
        title: '닉네임 설정에 실패했습니다.',
        description: error.message,
        color: 'red',
        duration: 1500,
        variant: 'destructive',
      });
    },
  });
  // calculated values
  // effects
  // handlers
  return (
    <div className="flex w-full h-full justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>닉네임 설정</CardTitle>
          <CardDescription>스터디에서 활동할 때 사용될 닉네임을 설정 해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col juasync stify-between items-center space-y-5">
            <Controller
              control={control}
              name="name"
              render={({ field }) => <Input error={errors.name?.message} {...field} placeholder="일개미" />}
            />
            <div className="flex justify-end w-full">
              <Button
                disabled={!isValid}
                loading={isLoading}
                onClick={handleSubmit(async ({ name }) => {
                  await updateNickName({ name });
                })}
              >
                제출
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { UserNickNameAuditScreen };
