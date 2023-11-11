import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/contacts/selector';
import { addContacts } from 'redux/contacts/contactsІnteraction';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const validationSchema = yup.object({
  name: yup
    .string()
    .required()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Please check that the name you have dialed is correct'
    ),
  number: yup
    .string()
    .required()
    .trim()
    .matches(
      /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/,
      'Please check that the number you have dialed is correct'
    ),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },

    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (
        contacts.some(
          contact => contact.name.toLowerCase() === values.name.toLowerCase()
        )
      ) {
        resetForm();
        return alert(`${values.name} is already in contacs.`);
      }
      if (contacts.some(contact => contact.number === values.number)) {
        resetForm();
        return alert(`This number "${values.number}" is already in contacs.`);
      }

      dispatch(addContacts(values));

      resetForm();
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextField
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ width: '350px' }}
          />
          <TextField
            id="number"
            name="number"
            label="Number"
            type="tel"
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.number && Boolean(formik.errors.number)}
            helperText={formik.touched.number && formik.errors.number}
            sx={{ width: '350px' }}
          />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            sx={{ width: '250px' }}
          >
            Add contact
          </Button>
        </Box>
      </form>
    </div>
  );
};
