import { zodResolver } from '@hookform/resolvers/zod';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useStepControl } from 'src/hooks/useSteps';
import useStepForm from 'src/hooks/useStepForm';
import { useEffect, useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';

const MAX_FILE_SIZE = 512_000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const schema = z
  .object({
    company_avatar: z
      .any()
      .refine(
        file => file[0]?.size <= MAX_FILE_SIZE,
        `Max image size is 500KB.`,
      )
      .refine(
        file => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.',
      ),
  })
  .required({
    company_avatar: true,
  });

export type ValidationUploadImageSchemaType = z.infer<typeof schema>;

const Index = () => {
  const { goToStep } = useStepControl();
  const { updateFormData, formData } = useStepForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedImage, setSelectedImage] = useState<any>(null);
  useEffect(() => {
    if (formData[2]) {
      for (const key in formData[2]) {
        // @ts-expect-error type unknown
        setValue(key, formData[2][key]);
      }
      setSelectedImage(URL.createObjectURL(formData[2].company_avatar[0]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ValidationUploadImageSchemaType>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const subscription = watch(value => {
      const file = value.company_avatar[0];
      if (file.size <= MAX_FILE_SIZE)
        setSelectedImage(URL.createObjectURL(file));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const saveCompanyLogo = (data: ValidationUploadImageSchemaType) => {
    console.log(data);

    if (isValid) {
      updateFormData(2, data);
      goToStep(3);
    } else {
      console.error('not allow');
    }
  };

  return (
    <form onSubmit={handleSubmit(saveCompanyLogo)}>
      <div className='form'>
        <Grid container justifyContent='center' spacing={2}>
          <Grid item container justifyContent='center' xs={12}>
            <div className='relative flex h-40 w-40 items-center justify-center rounded-full border border-gray-300 p-2'>
              <label
                htmlFor='uploadImage'
                className='absolute right-2 top-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-500'
              >
                <AddIcon sx={{ fill: '#fff' }} />
              </label>
              {selectedImage ? (
                <img
                  src={selectedImage}
                  width={155}
                  height={155}
                  className='rounded-full'
                />
              ) : (
                <ImageIcon sx={{ fill: 'rgb(209 213 219)', fontSize: 100 }} />
              )}
              <input
                id='uploadImage'
                type='file'
                accept='image/*'
                className='hidden'
                {...register('company_avatar')}
              />
            </div>
            {errors?.company_avatar && (
              <p className='ml-2 text-xs  text-[#ff5f59]'>
                {errors?.company_avatar?.message as string}
              </p>
            )}
          </Grid>
          <Grid item xs={12}>
            <p className='text-center'>
              Only images with a size lower than 500KB are allowed
            </p>
          </Grid>
        </Grid>
      </div>
      <Grid
        container
        spacing={2}
        justifyContent='flex-end'
        alignItems={'center'}
        className='pt-5'
      >
        <Grid item xs={6} lg={2}>
          <button
            className='btn bg-gray-300'
            type='button'
            onClick={() => goToStep(1)}
          >
            back
          </button>
        </Grid>
        <Grid item xs={6} lg={4}>
          <button className='btn btn-primary' type='submit'>
            submit
          </button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Index;
