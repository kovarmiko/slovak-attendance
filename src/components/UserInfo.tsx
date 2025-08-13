import classes from './UserInfo.module.scss';

interface Props {
  firstName: string;
  lastName: string;
  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
  firstNameError: boolean;
  lastNameError: boolean;
}

export default function UserInfo({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  firstNameError,
  lastNameError,
}: Props) {
  return (
    <div className={classes.userInfo}>
      <label className={`mr-2 ${classes.printOnly}`}>Meno a&nbsp;priezvisko:</label>
      <div className='flex flex-col w-full md:w-auto md:mr-2'>
        <input
          id='firstName'
          className={`w-full md:w-auto shadow appearance-none border rounded py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${firstNameError ? 'border-red-500' : ''}`}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder='Krstné meno'
        />
        {firstNameError && (
          <p className='text-red-500 text-xs italic'>Povinné pole</p>
        )}
      </div>
      <div className='flex flex-col w-full md:w-auto md:mr-2'>
        <input
          id='lastName'
          className={`w-full md:w-auto shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${lastNameError ? 'border-red-500' : ''}`}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder='Priezvisko'
        />
        {lastNameError && (
          <p className='text-red-500 text-xs italic'>Povinné pole</p>
        )}
      </div>
      <span className={`${classes.printName} ${classes.printOnly}`}>
        {firstName} {lastName}
      </span>
    </div>
  );
}
