interface Props {
  firstName: string;
  lastName: string;
  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
}

export default function UserInfo({
  firstName,
  lastName,
  setFirstName,
  setLastName,
}: Props) {
  return (
    <div className='user-info'>
      <label className='mr-2'>Meno a&nbsp;priezvisko:</label>
      <input
        id='firstName'
        className='mr-2'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder='krstné meno'
      />{' '}
      <input
        id='lastName'
        className='mr-2'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder='priezvisko'
      />
      <span id='printName'>
        {firstName} {lastName}
      </span>
    </div>
  );
}
