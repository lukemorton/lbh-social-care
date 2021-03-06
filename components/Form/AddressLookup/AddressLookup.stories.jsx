import AddressLookup from './AddressLookup';

import { useForm } from 'react-hook-form';
import { Button } from 'components/Form';

export default {
  title: 'Form/AddressLookup',
  component: AddressLookup,
};

export const Default = () => {
  const { register, errors, handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AddressLookup
        name="address"
        label="address"
        control={control}
        error={errors.address}
        register={register}
      />
      <Button className="govuk-button" label="Next" type="submit" />
    </form>
  );
};
