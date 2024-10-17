import express from 'express';
const router = express.Router();


router.get('/', (req, res, next) => {
  const characters = [
    {
      name: 'Harry',
      role: 'Student'
    },
    {
      name: 'Dumbledore',
      role: 'Headmaster'
    },
    {
      name: 'Snape',
      role: 'Professor'
    },
    {
      name: 'Hermione',
      role: 'Student'
    }
  ];
  const subheading = "I thought we should involve some magic";

  res.render('users', { characters, subheading });
});

export default router;
