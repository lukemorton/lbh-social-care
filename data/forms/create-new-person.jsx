export default {
  title: 'Create New Person',
  path: '/form/create-new-person/',
  steps: [
    {
      id: 'client-details',
      title: 'Client Details',
      components: [
        {
          component: 'DateInput',
          name: 'timestamp',
          label: 'Date of contact',
          rules: { required: true },
          hint: 'For example, 31 03 1980',
        },
        {
          component: 'NumberInput',
          name: 'mosaic_id',
          width: '30',
          label: 'Mosaic ID Number',
          hint: 'For example 0123456789',
          rules: { required: true },
        },
        {
          component: 'NumberInput',
          name: 'nhs_number',
          width: '30',
          label: 'NHS Number',
          hint: 'For example 0123456789',
        },
        { component: 'TextInput', name: 'title', width: '30', label: 'Title' },
        {
          component: 'TextInput',
          name: 'last_name',
          width: '30',
          label: 'Surname',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'first_name',
          width: '30',
          label: 'First Name',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'other_names',
          width: '30',
          label: 'Other Names',
        },
        {
          component: 'DateInput',
          name: 'date_of_birth',
          label: 'Date of Birth',
          hint: 'For example, 31 03 1980',
          rules: { required: true },
        },
        {
          component: 'NationalityList',
          name: 'nationality',
          label: 'Nationality',
          rules: { required: true },
        },
        {
          component: 'Radios',
          name: 'gender',
          label: 'Gender',
          options: ['Female', 'Male', 'Unknown', 'Other'],
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'address',
          width: '30',
          label: 'Primary Address',
          rules: { required: true },
        },
        {
          component: 'TextInput',
          name: 'postcode',
          width: '30',
          label: 'Post Code',
          rules: { required: true },
        },
        {
          component: 'PhoneInput',
          name: 'contact_number',
          width: '30',
          label: 'Phone Number',
        },
      ],
    },
  ],
};
