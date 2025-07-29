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
      <label className='mr-2 print-only'>Meno a&nbsp;priezvisko:</label>
      <input
        id='firstName'
        className='w-full md:w-auto mr-2 shadow appearance-none border rounded py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder='Krstné meno'
      />{' '}
      <input
        id='lastName'
        className='w-full md:w-auto mr-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder='Priezvisko'
      />
      <span id='printName' className="print-only">
        {firstName} {lastName}
      </span>
    </div>
  );
}
